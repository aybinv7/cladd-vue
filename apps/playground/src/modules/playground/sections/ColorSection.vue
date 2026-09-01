<script setup lang="ts">
import { ColorEditor, ColorPicker } from 'cladd-vue';
import type {
  Color,
  ColorEditorControlSize,
  ColorEditorFormat,
} from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const formats = ['rgb', 'hsl', 'hsb'] as const;
const controlSizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

const format = ref<ColorEditorFormat>('rgb');
const controlSize = ref<ColorEditorControlSize>('md');
const alpha = ref(true);
const gradient = ref(false);

const editorValue = ref<string>('#4f46e5');
const editorEmitted = ref('#4F46E5');

const pickerValue = ref<string>('#22d3ee');
const gradientPickerValue = ref<string>(
  'linear-gradient(90deg, #f97316 0%, #a855f7 100%)',
);
const emptyPickerValue = ref<string | undefined>(undefined);

const swatches = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#6366f1',
  '#a855f7',
  '#ec4899',
];

const code = computed(
  () => `<ColorEditor
  v-model="value"
  :alpha="${alpha.value}"
  control-size="${controlSize.value}"
  format="${format.value}"
  :gradient="${gradient.value}"
  :swatches="swatches"
  @change="emitted = $event.css"
/>`,
);
</script>

<template>
  <CatalogSection
    description="The full colour surface: a saturation area, hue and alpha tracks, channel scrubbers, a hex field, presets, and a two-stop linear gradient mode."
    eyebrow="04 · Forms"
    id="color"
    title="Color editor and picker"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <div class="color-editor-frame">
          <ColorEditor
            v-model="editorValue"
            :alpha="alpha"
            :control-size="controlSize"
            :disabled="!props.interactionsEnabled"
            :format="format"
            :gradient="gradient"
            :swatches="swatches"
            @change="editorEmitted = $event.css"
          />
          <span class="playground-hint">emitted css · {{ editorEmitted }}</span>
        </div>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="format"
            :items="formats"
            label="Channels"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="controlSize"
            :items="controlSizes"
            label="Control size"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="alpha" label="Alpha" />
          <PlaygroundSwitchControl v-model="gradient" label="Gradient mode" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Picker trigger</span>
        <code>swatch · hex · popover</code>
      </div>
      <div class="specimen-row">
        <div class="color-picker-slot">
          <ColorPicker
            v-model="pickerValue"
            :disabled="!props.interactionsEnabled"
            :swatches="swatches"
          />
        </div>
        <div class="color-picker-slot">
          <ColorPicker
            v-model="emptyPickerValue"
            :disabled="!props.interactionsEnabled"
            placeholder="No colour"
            :swatches="swatches"
          />
        </div>
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Gradient picker</span>
        <code>gradient · two stops</code>
      </div>
      <div class="specimen-row">
        <div class="color-picker-slot">
          <ColorPicker
            v-model="gradientPickerValue"
            :disabled="!props.interactionsEnabled"
            gradient
            :swatches="swatches"
          />
        </div>
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Trigger sizes</span>
        <code>swatch scales with size</code>
      </div>
      <div class="specimen-row">
        <div
          v-for="size in ['xs', 'sm', 'md', 'lg']"
          :key="size"
          class="color-picker-slot"
        >
          <ColorPicker
            :disabled="!props.interactionsEnabled"
            :model-value="pickerValue"
            :size="size as 'lg' | 'md' | 'sm' | 'xs'"
          />
        </div>
      </div>
    </div>
  </CatalogSection>
</template>
