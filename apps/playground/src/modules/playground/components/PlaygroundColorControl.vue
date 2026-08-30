<script setup lang="ts">
import { Button, type Color } from '@cladd-vue/ui';

const colors: readonly Color[] = [
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

const model = defineModel<Color>({ required: true });
</script>

<template>
  <div aria-label="Color" class="example-segmented" role="group">
    <Button
      v-for="color in colors"
      :key="color"
      :color="color"
      :aria-label="color"
      :aria-pressed="model === color"
      :outline="model === color"
      :read-only="model === color"
      rounded
      size="md"
      :surface-level="model === color ? '+2' : undefined"
      :title="color"
      :variant="model === color ? 'gradient' : 'transparent'"
      @click="model = color"
    >
      <span class="example-color-dot" />
    </Button>
  </div>
</template>
