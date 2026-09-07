<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { DropdownMenuLabelProps } from './menu.contracts.ts';

defineOptions({ inheritAttrs: false });

defineSlots<{
  default?: () => unknown;
}>();

const props = withDefaults(defineProps<DropdownMenuLabelProps>(), {
  as: undefined,
});

const attrs = useAttrs();
const d = useComponentDefaults('DropdownMenuLabel', props, {});

const rootAttrs = computed(() => {
  const { class: _consumerClass, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn(
    'cladd-menu-label px-2 py-1 text-cladd-2xs font-semibold text-cladd-fg-softer',
    attrs.class,
  ),
);
</script>

<template>
  <component
    :is="d.as ?? 'div'"
    v-bind="rootAttrs"
    :class="rootClass"
    data-slot="menu-label"
    aria-hidden="true"
  >
    <slot />
  </component>
</template>
