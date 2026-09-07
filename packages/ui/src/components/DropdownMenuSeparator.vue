<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { DropdownMenuSeparatorProps } from './menu.contracts.ts';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<DropdownMenuSeparatorProps>(), {
  as: undefined,
});
const attrs = useAttrs();
const d = useComponentDefaults('DropdownMenuSeparator', props, {});
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() => cn('my-1 h-px bg-cladd-outline', attrs.class));
</script>

<template>
  <component
    :is="d.as ?? 'div'"
    v-bind="rootAttrs"
    :class="rootClass"
    data-slot="menu-separator"
    role="separator"
  />
</template>
