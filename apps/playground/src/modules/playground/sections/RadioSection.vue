<script setup lang="ts">
import { Radio } from '@cladd-vue/ui';
import type { Color, RadioSize } from '@cladd-vue/ui';
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

const sizes = ['xs', 'sm', 'md'] as const;
const size = ref<RadioSize>('sm');
const color = ref<Color>('brand');
const disabled = ref(false);
const readOnly = ref(false);
const required = ref(false);
const selected = ref('apple');

const fruits = ['apple', 'banana', 'cherry'] as const;

const code = computed(
  () => `<Radio
  v-for="fruit in fruits"
  :key="fruit"
  v-model="selected"
  name="fruit"
  :value="fruit"
  color="${color.value}"
  size="${size.value}"
  ${disabled.value ? 'disabled' : ':disabled="false"'}
  ${readOnly.value ? 'read-only' : ':read-only="false"'}
/>`,
);

function isChecked(value: string): boolean {
  return selected.value === value;
}

function select(value: string): void {
  selected.value = value;
}
</script>

<template>
  <CatalogSection
    description="Single-choice control with native name grouping, three sizes and the shared accent and interaction contracts."
    eyebrow="04 · Forms"
    id="radio"
    title="Radio"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <div class="radio-group">
          <label v-for="fruit in fruits" :key="fruit" class="radio-item">
            <Radio
              :checked="isChecked(fruit)"
              :color="color"
              :disabled="disabled || !props.interactionsEnabled"
              name="fruit"
              :read-only="readOnly"
              :required="required"
              :size="size"
              :value="fruit"
              @change="select(fruit)"
              @update:checked="select(fruit)"
            />
            <span class="radio-label">{{ fruit }}</span>
          </label>
        </div>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="size"
            :items="sizes"
            label="Radio size"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="disabled" label="disabled" />
          <PlaygroundSwitchControl v-model="readOnly" label="readOnly" />
          <PlaygroundSwitchControl v-model="required" label="required" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="color" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Sizes</span>
        <code>xs · sm · md</code>
      </div>
      <div class="specimen-row">
        <label v-for="entry in sizes" :key="entry" class="radio-item">
          <Radio :checked="true" :color="color" :size="entry" />
          <span class="radio-label">{{ entry }}</span>
        </label>
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Name grouping</span>
        <code>name="flavor"</code>
      </div>
      <div class="specimen-row">
        <label
          v-for="option in ['vanilla', 'chocolate', 'matcha']"
          :key="option"
          class="radio-item"
        >
          <Radio
            :checked="option === 'vanilla'"
            name="flavor"
            :value="option"
          />
          <span class="radio-label">{{ option }}</span>
        </label>
      </div>
    </div>
  </CatalogSection>
</template>

<style scoped>
.radio-group {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.radio-item {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  color: var(--cladd-fg);
  cursor: pointer;
}

.radio-label {
  text-transform: capitalize;
  color: var(--cladd-fg-soft);
}
</style>
