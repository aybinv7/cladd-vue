<script setup lang="ts">
import { computed } from 'vue';

import { useProgressContext } from './progressContext.ts';

defineSlots<{ default?: () => unknown }>();
const progress = useProgressContext();
const formatted = computed(() =>
  progress.percent.value === undefined
    ? undefined
    : `${Math.round(progress.percent.value)}%`,
);
</script>
<template>
  <span
    class="cladd-progress-value ms-auto text-cladd-fg-soft"
    data-slot="progress-value"
  >
    <slot>{{ formatted }}</slot>
  </span>
</template>
