<script setup lang="ts">
import { Separator } from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const orientation = ref<'horizontal' | 'vertical'>('horizontal');
const decorative = ref(true);
const orientations = ['horizontal', 'vertical'] as const;

const code = computed(
  () => `<Separator
  orientation="${orientation.value}"
  ${decorative.value ? ':decorative="true"' : ':decorative="false"'}
/>`,
);
</script>

<template>
  <CatalogSection
    description='A horizontal or vertical rule; decorative (default) renders role="none", set false for a semantic role="separator".'
    eyebrow="Extension · Data display"
    id="separator"
    title="Separator"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <div
          v-if="orientation === 'horizontal'"
          class="flex w-56 flex-col gap-2"
        >
          <p class="text-cladd-sm font-medium">Account settings</p>
          <Separator :decorative="decorative" orientation="horizontal" />
          <p class="text-cladd-xs text-cladd-fg-soft">
            Manage your profile and preferences.
          </p>
        </div>
        <div v-else class="flex h-5 items-center gap-2 text-cladd-xs">
          <span>Docs</span>
          <Separator :decorative="decorative" orientation="vertical" />
          <span>Source</span>
        </div>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="orientation"
            :items="orientations"
            label="Separator orientation"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="decorative" label="decorative" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
