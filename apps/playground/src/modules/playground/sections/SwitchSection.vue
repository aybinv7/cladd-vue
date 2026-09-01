<script setup lang="ts">
import { Switch } from 'cladd-vue';
import type { Color, SwitchSize } from 'cladd-vue';
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

const sizes = ['sm', 'md'] as const;
const size = ref<SwitchSize>('md');
const color = ref<Color>('brand');
const checked = ref(true);
const disabled = ref(false);
const readOnly = ref(false);

const code = computed(
  () => `<Switch
  v-model="checked"
  color="${color.value}"
  size="${size.value}"
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
    description="A two-state thumb track with the shared check, accent, and interaction contracts — including the decorative inner glyph."
    eyebrow="04 · Forms"
    id="switch"
    title="Switch"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <Switch
          v-model="checked"
          :color="color"
          :disabled="disabled || !props.interactionsEnabled"
          :read-only="readOnly"
          :size="size"
        />
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="size"
            :items="sizes"
            label="Switch size"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="checked" label="checked" />
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
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="color" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Sizes</span>
        <code>sm · md</code>
      </div>
      <div class="specimen-row">
        <label v-for="entry in sizes" :key="entry" class="switch-item">
          <Switch :checked="true" :color="color" :size="entry as SwitchSize" />
          <span class="switch-label">{{ entry }}</span>
        </label>
        <label class="switch-item">
          <Switch :checked="false" :color="color" size="md" />
          <span class="switch-label">off</span>
        </label>
        <label class="switch-item">
          <Switch :checked="true" :color="color" disabled size="md" />
          <span class="switch-label">disabled</span>
        </label>
      </div>
    </div>
  </CatalogSection>
</template>

<style scoped>
.switch-item {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  color: var(--cladd-fg);
}

.switch-label {
  color: var(--cladd-fg-soft);
}
</style>
