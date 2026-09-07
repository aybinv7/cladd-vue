<script setup lang="ts">
import { ScrollArea } from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const orientation = ref<'horizontal' | 'vertical' | 'both'>('vertical');
const orientations = ['vertical', 'horizontal', 'both'] as const;

const code = computed(
  () => `<ScrollArea orientation="${orientation.value}" class="h-32 w-64">
  <!-- content -->
</ScrollArea>`,
);
</script>

<template>
  <CatalogSection
    description="Enhances native overflow scrolling with a themed thin scrollbar — CSS only, no ResizeObserver-driven custom thumb, so keyboard/touch/zoom/forced-colors scrolling all stay native."
    eyebrow="Extension · Data display"
    id="scroll-area"
    title="ScrollArea"
  >
    <ComponentPlayground :code="code">
      <template #preview>
        <ScrollArea
          class="h-32 w-64 rounded-cladd-xs border border-cladd-outline"
          :orientation="orientation"
        >
          <div
            v-if="orientation === 'vertical'"
            class="flex flex-col gap-2 p-3 text-cladd-xs"
          >
            <p v-for="line in 15" :key="line">Scrollable line {{ line }}</p>
          </div>
          <div
            v-else
            class="flex gap-2 p-3"
            :class="orientation === 'both' ? 'w-[640px]' : ''"
          >
            <span
              v-for="chip in 10"
              :key="chip"
              class="shrink-0 rounded-cladd-xs bg-cladd-surface-highlight px-3 py-2 text-cladd-xs"
            >
              Item {{ chip }}
            </span>
          </div>
        </ScrollArea>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="orientation"
            :items="orientations"
            label="ScrollArea orientation"
          />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
