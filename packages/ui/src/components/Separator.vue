<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { SeparatorProps } from './separator.contracts.ts';

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<SeparatorProps>(), {
  decorative: undefined,
  orientation: undefined,
});
const attrs = useAttrs();
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const d = useComponentDefaults('Separator', props, {
  decorative: true,
  orientation: 'horizontal' as const,
});
const rootClass = computed(() =>
  cn(
    'cladd-separator shrink-0 bg-cladd-outline',
    d.value.orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full',
    attrs.class,
  ),
);
</script>
<template>
  <div
    v-bind="rootAttrs"
    :aria-orientation="!d.decorative ? d.orientation : undefined"
    :class="rootClass"
    data-slot="separator"
    :role="d.decorative ? 'none' : 'separator'"
  />
</template>
