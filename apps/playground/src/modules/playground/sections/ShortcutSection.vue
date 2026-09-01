<script setup lang="ts">
import { Shortcut } from '@cladd-vue/ui';
import type { Color, ShortcutSize } from '@cladd-vue/ui';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundColorControl from '../components/PlaygroundColorControl.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const size = ref<ShortcutSize>('md');
const color = ref<Color>('neutral');

const code = computed(
  () =>
    `<Shortcut color="${color.value}" size="${size.value}">cmd K</Shortcut>`,
);
</script>

<template>
  <CatalogSection
    description="Keycaps for keyboard shortcuts — each token becomes a Surface-backed kbd, with icon glyphs for modifiers and navigation keys."
    eyebrow="03 · Data display"
    id="shortcut"
    title="Shortcut"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <div class="shortcut-preview">
          <Shortcut :color="color" :size="size">cmd K</Shortcut>
          <Shortcut :color="color" :size="size">shift enter</Shortcut>
          <Shortcut :color="color" :size="size">alt tab</Shortcut>
        </div>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="size"
            :items="sizes"
            label="Shortcut size"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="color" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Sizes</span>
        <code>2xs · xs · sm · md · lg · xl · 2xl</code>
      </div>
      <div class="specimen-row shortcut-sizes">
        <Shortcut
          v-for="entry in sizes"
          :key="entry"
          :color="color"
          :size="entry as ShortcutSize"
        >
          cmd K
        </Shortcut>
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Key variants</span>
        <code>modifiers · navigation · text</code>
      </div>
      <div class="specimen-row shortcut-keys">
        <Shortcut size="sm">cmd shift P</Shortcut>
        <Shortcut size="sm">ctrl alt delete</Shortcut>
        <Shortcut size="sm">enter</Shortcut>
        <Shortcut size="sm">space</Shortcut>
        <Shortcut size="sm">up down left right</Shortcut>
        <Shortcut size="sm">A</Shortcut>
      </div>
    </div>
  </CatalogSection>
</template>

<style scoped>
.shortcut-preview {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.shortcut-sizes {
  align-items: center;
  gap: 8px;
}

.shortcut-keys {
  flex-wrap: wrap;
  gap: 8px;
}
</style>
