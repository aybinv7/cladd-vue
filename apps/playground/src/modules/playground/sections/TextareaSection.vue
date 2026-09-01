<script setup lang="ts">
import { Textarea } from 'cladd-vue';
import type { Color, TextareaSize } from 'cladd-vue';
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
const size = ref<TextareaSize>('lg');
const color = ref<Color>('neutral');
const disabled = ref(false);
const readOnly = ref(false);
const rounded = ref(false);
const value = ref('Review the attached inspection state before detaching.');

const code = computed(
  () => `<Textarea
  v-model="value"
  color="${color.value}"
  placeholder="Enter details"
  size="${size.value}"
  ${rounded.value ? 'rounded' : ':rounded="false"'}
  ${disabled.value ? 'disabled' : ':disabled="false"'}
  ${readOnly.value ? 'read-only' : ':read-only="false"'}
/>`,
);

function setDisabled(next: boolean): void {
  disabled.value = next;
  if (next) readOnly.value = false;
}

function setReadOnly(next: boolean): void {
  readOnly.value = next;
  if (next) disabled.value = false;
}
</script>

<template>
  <CatalogSection
    description="A contenteditable SurfaceCut field for multi-line text — same color, density and validation contracts as Input."
    eyebrow="04 · Forms"
    id="textarea"
    title="Textarea"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <Textarea
          v-model="value"
          class="textarea-preview"
          :color="color"
          :disabled="disabled || !props.interactionsEnabled"
          placeholder="Enter details"
          :read-only="readOnly"
          :rounded="rounded"
          :size="size"
        />
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="size"
            :items="sizes"
            label="Textarea size"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl
            label="disabled"
            :model-value="disabled"
            @update:model-value="setDisabled"
          />
          <PlaygroundSwitchControl
            label="readOnly"
            :model-value="readOnly"
            @update:model-value="setReadOnly"
          />
          <PlaygroundSwitchControl v-model="rounded" label="rounded" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="color" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Sizes</span>
        <code>sm · md · lg · xl · 2xl</code>
      </div>
      <div class="specimen-row textarea-sizes">
        <Textarea
          v-for="entry in sizes"
          :key="entry"
          :disabled="!props.interactionsEnabled"
          :model-value="entry"
          :size="entry as TextareaSize"
          class="textarea-specimen"
        />
      </div>
    </div>
  </CatalogSection>
</template>

<style scoped>
.textarea-preview {
  width: 360px;
}

.textarea-specimen {
  width: 110px;
}

.textarea-sizes {
  align-items: flex-start;
}
</style>
