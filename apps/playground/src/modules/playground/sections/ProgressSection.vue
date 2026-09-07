<script setup lang="ts">
import { NumberField, Progress, ProgressLabel, ProgressValue } from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundColorControl from '../components/PlaygroundColorControl.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const value = ref(65);
const indeterminate = ref(false);
const color = ref<Color>('neutral');

const code = computed(
  () => `<Progress
  :value="${value.value}"
  :indeterminate="${indeterminate.value}"
  color="${color.value}"
>
  <ProgressLabel>Uploading</ProgressLabel>
  <ProgressValue />
</Progress>`,
);

const syncingCode = `<Progress indeterminate>
  <ProgressLabel>Syncing</ProgressLabel>
</Progress>`;
</script>

<template>
  <CatalogSection
    description="Determinate and indeterminate progress with min/max/value and a formatted percentage display."
    eyebrow="Extension · Feedback"
    id="progress"
    title="Progress"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <Progress
          class="w-64"
          :color="color"
          :indeterminate="indeterminate"
          :value="value"
        >
          <ProgressLabel>Uploading</ProgressLabel>
          <ProgressValue />
        </Progress>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <NumberField
            v-model="value"
            aria-label="Progress value"
            :max="100"
            :min="0"
            :step="1"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl
            v-model="indeterminate"
            label="indeterminate"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="color" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <ComponentPlayground :code="syncingCode" preview-surface>
      <template #preview>
        <Progress class="w-64" indeterminate>
          <ProgressLabel>Syncing</ProgressLabel>
        </Progress>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
