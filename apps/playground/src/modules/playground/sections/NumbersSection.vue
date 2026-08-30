<script setup lang="ts">
import { NumberField, NumberScrubber } from '@cladd-vue/ui';
import type { Color, NumberFieldSize } from '@cladd-vue/ui';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundColorControl from '../components/PlaygroundColorControl.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
const color = ref<Color>('neutral');
const size = ref<NumberFieldSize>('md');
const editable = ref(true);
const rounded = ref(true);

const fieldValue = ref(4);
const scrubberValue = ref(24);
const scrubberPreview = ref(24);

const code = computed(
  () => `<NumberField
  v-model="value"
  color="${color.value}"
  :input="${editable.value}"
  :max="10"
  :min="0"
  :rounded="${rounded.value}"
  size="${size.value}"
/>`,
);
</script>

<template>
  <CatalogSection
    description="Two ways to move a number: a stepper with typed entry, and a drag-to-scrub trigger that turns into an input when you click it."
    eyebrow="04 · Forms"
    id="numbers"
    title="Number field and scrubber"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <NumberField
          v-model="fieldValue"
          :color="color"
          :disabled="!props.interactionsEnabled"
          :input="editable"
          :max="10"
          :min="0"
          :rounded="rounded"
          :size="size"
        />
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented v-model="size" :items="sizes" label="Size" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="editable" label="Typed entry" />
          <PlaygroundSwitchControl v-model="rounded" label="Pill" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="color" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Drag to scrub</span>
        <code>5px per step · shift for 1px</code>
      </div>
      <div class="specimen-row">
        <NumberScrubber
          v-model="scrubberValue"
          :disabled="!props.interactionsEnabled"
          :display-value="(value: number) => `${value} px`"
          :max="200"
          :min="0"
          @temporary-change="scrubberPreview = $event"
        />
        <span class="playground-hint">
          committed {{ scrubberValue }} · live {{ scrubberPreview }}
        </span>
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Bounds</span>
        <code>disabled at min and max</code>
      </div>
      <div class="specimen-row">
        <NumberField :max="5" :min="0" :model-value="0" size="sm" />
        <NumberField :max="5" :min="0" :model-value="5" size="sm" />
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Read-only value</span>
        <code>input={{ false }}</code>
      </div>
      <div class="specimen-row">
        <NumberField :input="false" :model-value="7" />
      </div>
    </div>
  </CatalogSection>
</template>
