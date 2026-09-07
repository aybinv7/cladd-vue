<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { DropdownMenuShortcutProps } from './menu.contracts.ts';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();

const props = withDefaults(defineProps<DropdownMenuShortcutProps>(), {
  as: undefined,
});
const attrs = useAttrs();
const d = useComponentDefaults('DropdownMenuShortcut', props, {});
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn('ml-auto text-cladd-2xs text-cladd-fg-softer', attrs.class),
);
</script>

<template>
  <component
    :is="d.as ?? 'span'"
    v-bind="rootAttrs"
    :class="rootClass"
    data-slot="menu-shortcut"
    ><slot
  /></component>
</template>
