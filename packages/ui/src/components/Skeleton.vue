<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '../shared/cn.ts';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn(
    'cladd-skeleton animate-pulse rounded-cladd-xs bg-cladd-surface-highlight motion-reduce:animate-none',
    attrs.class,
  ),
);
</script>
<template>
  <div
    v-bind="rootAttrs"
    aria-hidden="true"
    :class="rootClass"
    data-slot="skeleton"
  />
</template>
