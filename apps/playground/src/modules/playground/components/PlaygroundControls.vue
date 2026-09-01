<script setup lang="ts">
import { Button, Select } from 'cladd-vue';
import type { Color, SelectValue } from 'cladd-vue';

import type { PlaygroundTheme } from '../playground.types.ts';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
  theme: PlaygroundTheme;
}>();

const emit = defineEmits<{
  updateAccent: [accent: Color];
  updateInteractions: [enabled: boolean];
  updateTheme: [theme: PlaygroundTheme];
}>();

const accents: Color[] = [
  'neutral',
  'brand',
  'red',
  'pink',
  'purple',
  'blue',
  'cyan',
  'lime',
  'green',
  'yellow',
  'orange',
];

const accentOptions = accents.map((accent) => ({
  label: accent,
  value: accent,
}));

function changeAccent(value: SelectValue | SelectValue[]): void {
  if (Array.isArray(value)) return;
  emit('updateAccent', String(value) as Color);
}
</script>

<template>
  <div class="playground-controls">
    <div class="playground-controls__copy">
      <span>Global controls</span>
      <p>Change provider context and inspect every state together.</p>
    </div>
    <label class="native-control">
      <span>Accent</span>
      <Select
        :model-value="props.accent"
        :options="accentOptions"
        size="sm"
        @change="changeAccent"
      />
    </label>
    <div class="segmented-control" aria-label="Theme">
      <Button
        :pressed="props.theme === 'dark'"
        size="sm"
        variant="transparent"
        @click="emit('updateTheme', 'dark')"
      >
        Dark
      </Button>
      <Button
        :pressed="props.theme === 'light'"
        size="sm"
        variant="transparent"
        @click="emit('updateTheme', 'light')"
      >
        Light
      </Button>
    </div>
    <Button
      :color="props.interactionsEnabled ? 'green' : 'neutral'"
      :pressed="props.interactionsEnabled"
      size="sm"
      @click="emit('updateInteractions', !props.interactionsEnabled)"
    >
      Interactions {{ props.interactionsEnabled ? 'on' : 'off' }}
    </Button>
  </div>
</template>
