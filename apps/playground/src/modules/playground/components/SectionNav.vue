<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import type { CatalogEntry } from '../playground.types';

const props = defineProps<{
  entries: CatalogEntry[];
}>();

const extensions = computed(() =>
  props.entries.filter((entry) => entry.origin === 'extension'),
);
const ports = computed(() =>
  props.entries.filter((entry) => entry.origin !== 'extension'),
);
</script>

<template>
  <aside class="section-nav" aria-label="Component catalog">
    <div class="section-nav__heading">
      <span class="section-nav__label">Components</span>
      <span>{{ entries.length }}</span>
    </div>

    <div class="section-nav__group">
      <div class="section-nav__group-heading">
        <span>Extensions</span>
        <span class="section-nav__group-count">{{ extensions.length }}</span>
      </div>
      <nav>
        <RouterLink
          v-for="entry in extensions"
          :key="entry.id"
          :to="entry.path"
        >
          <span
            aria-hidden="true"
            class="section-nav__dot section-nav__dot--extension"
            title="Cladd extension — not an upstream port"
          />
          <span class="section-nav__index">{{
            String(extensions.indexOf(entry) + 1).padStart(2, '0')
          }}</span>
          <span class="section-nav__copy">
            <strong>{{ entry.label }}</strong>
            <small>{{ entry.description }}</small>
          </span>
          <span class="section-nav__count">{{ entry.count }}</span>
        </RouterLink>
      </nav>
    </div>

    <div class="section-nav__group">
      <div class="section-nav__group-heading">
        <span>Cladd</span>
        <span class="section-nav__group-count">{{ ports.length }}</span>
      </div>
      <nav>
        <RouterLink v-for="entry in ports" :key="entry.id" :to="entry.path">
          <span
            aria-hidden="true"
            class="section-nav__dot section-nav__dot--port"
            title="Faithful port of pinned Cladd"
          />
          <span class="section-nav__index">{{
            String(ports.indexOf(entry) + 1).padStart(2, '0')
          }}</span>
          <span class="section-nav__copy">
            <strong>{{ entry.label }}</strong>
            <small>{{ entry.description }}</small>
          </span>
          <span class="section-nav__count">{{ entry.count }}</span>
        </RouterLink>
      </nav>
    </div>
  </aside>
</template>
