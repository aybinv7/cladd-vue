<script setup lang="ts">
import {
  List,
  ListButton,
  ListItem,
  SearchField,
  Surface,
} from '@cladd-vue/ui';
import type { Color } from '@cladd-vue/ui';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundColorControl from '../components/PlaygroundColorControl.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const PROJECTS = [
  'acme-marketing',
  'acme-docs',
  'acme-api',
  'panel-prototype',
  'panel-shipping',
  'kanban-sketch',
  'inbox-rewrite',
  'studio-onboarding',
  'studio-billing',
  'studio-search-index',
  'editor-scrollbars',
  'editor-quick-open',
] as const;

const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
const size = ref<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg');
const color = ref<Color>('neutral');
const rounded = ref(true);
const clearButton = ref(true);
const query = ref('orders');
const heroQuery = ref('');

const heroFiltered = computed(() => {
  const q = heroQuery.value.trim().toLowerCase();
  return q ? PROJECTS.filter((p) => p.includes(q)) : [...PROJECTS];
});

const code = computed(
  () => `<SearchField
  v-model="query"
  color="${color.value}"
  placeholder="Search projects"
  :rounded="${rounded.value}"
  :clear-button="${clearButton.value}"
  size="${size.value}"
/>`,
);
</script>

<template>
  <CatalogSection
    description="An Input specialized for searching — icon, clear-button, and escape-to-clear behavior built in."
    eyebrow="04 · Forms"
    id="search-field"
    title="Search field"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <SearchField
          v-model="query"
          class="search-preview"
          :clear-button="clearButton"
          :color="color"
          placeholder="Search projects"
          :rounded="rounded"
          :size="size"
        />
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented v-model="size" :items="sizes" label="Size" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="rounded" label="rounded" />
          <PlaygroundSwitchControl v-model="clearButton" label="clearButton" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="color" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Sticky header composition</span>
        <code>Surface · SearchField · List · ListButton</code>
      </div>
      <Surface outline class="search-surface">
        <div class="max-h-72 overflow-auto">
          <Surface
            class="sticky top-0 z-20 rounded-t-cladd-popover"
            content-class-name="p-1.5"
            outline
          >
            <SearchField v-model="heroQuery" placeholder="Search projects" />
          </Surface>
          <List>
            <template v-if="heroFiltered.length === 0">
              <ListItem class="text-cladd-fg-softer">No matches</ListItem>
            </template>
            <template v-else>
              <ListButton v-for="p in heroFiltered.slice(0, 6)" :key="p">
                {{ p }}
              </ListButton>
            </template>
          </List>
        </div>
      </Surface>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Sizes</span>
        <code>sm · md · lg · xl · 2xl</code>
      </div>
      <div class="specimen-row">
        <SearchField
          v-for="entry in sizes"
          :key="entry"
          class="search-specimen"
          :model-value="entry"
          placeholder="Search projects"
          :size="entry"
        />
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Composition with SectionTitle</span>
        <code>List · SectionTitle · ListSeparator</code>
      </div>
      <Surface outline class="search-surface">
        <div class="px-4 pt-4">
          <span
            class="cladd-section-title flex items-end gap-4 text-cladd-xs font-medium text-cladd-fg-soft uppercase select-none"
            >Commands</span
          >
        </div>
        <SearchField
          model-value=""
          class="mx-2 mt-2 w-auto"
          placeholder="Filter commands"
        />
        <List>
          <ListButton>Run command</ListButton>
          <ListButton>Clear cache</ListButton>
          <ListSeparator />
          <ListButton color="red">Delete project</ListButton>
        </List>
      </Surface>
    </div>
  </CatalogSection>
</template>

<style scoped>
.search-preview {
  width: 320px;
}

.search-specimen {
  width: 120px;
}

.search-surface {
  width: 288px;
  border-radius: 24px;
  overflow: hidden;
}
</style>
