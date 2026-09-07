<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import type { DropdownMenuSubProps } from './menu.contracts.ts';
import {
  provideDropdownMenuSub,
  provideMenuChain,
  useMenuChain,
} from './menuContext.ts';

defineSlots<{ default?: () => unknown }>();

const props = withDefaults(defineProps<DropdownMenuSubProps>(), {
  defaultOpen: undefined,
  open: undefined,
});
const modelOpen = defineModel<boolean | undefined>('open', {
  default: undefined,
});
const d = useComponentDefaults('DropdownMenuSub', props, {
  defaultOpen: false,
});
const parent = useMenuChain();
if (!parent)
  throw new Error(
    'cladd-vue: `DropdownMenuSub` must be used inside a menu root.',
  );
const uncontrolled = shallowRef(d.value.defaultOpen);
const open = computed(
  () => modelOpen.value ?? props.open ?? uncontrolled.value,
);
function setOpen(next: boolean): void {
  if (modelOpen.value !== undefined || props.open === undefined)
    modelOpen.value = next;
  uncontrolled.value = next;
}
const anchor = shallowRef<HTMLElement>();
provideDropdownMenuSub({ anchor, open, setOpen });
provideMenuChain({ closeChain: parent.closeChain, open, setOpen });
</script>

<template><slot /></template>
