<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { ScrollAreaProps } from './scrollArea.contracts.ts';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<ScrollAreaProps>(), {
  orientation: undefined,
});
const attrs = useAttrs();
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const d = useComponentDefaults('ScrollArea', props, {
  orientation: 'vertical' as const,
});
const rootClass = computed(() =>
  cn(
    'cladd-scroll-area [scrollbar-color:var(--color-cladd-outline)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:size-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cladd-outline [&::-webkit-scrollbar-track]:bg-transparent',
    d.value.orientation === 'horizontal' && 'overflow-x-auto overflow-y-hidden',
    d.value.orientation === 'vertical' && 'overflow-x-hidden overflow-y-auto',
    d.value.orientation === 'both' && 'overflow-auto',
    attrs.class,
  ),
);
</script>
<template>
  <div v-bind="rootAttrs" :class="rootClass" data-slot="scroll-area">
    <slot />
  </div>
</template>
