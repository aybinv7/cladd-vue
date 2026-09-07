<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '../shared/cn.ts';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn(
    'cladd-avatar-fallback flex size-full items-center justify-center text-cladd-xs font-medium text-cladd-fg-soft',
    attrs.class,
  ),
);
</script>
<template>
  <span v-bind="rootAttrs" :class="rootClass" data-slot="avatar-fallback">
    <slot />
  </span>
</template>
