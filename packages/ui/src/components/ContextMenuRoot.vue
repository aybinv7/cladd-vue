<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import type { ContextMenuRootProps } from './menu.contracts.ts';
import { provideContextMenuRoot, provideMenuChain } from './menuContext.ts';

defineSlots<{ default?: () => unknown }>();

const props = withDefaults(defineProps<ContextMenuRootProps>(), {
  defaultOpen: undefined,
  open: undefined,
});
const modelOpen = defineModel<boolean | undefined>('open', {
  default: undefined,
});
const d = useComponentDefaults('ContextMenuRoot', props, {
  defaultOpen: false,
});
const uncontrolled = shallowRef(d.value.defaultOpen);
const open = computed(
  () => modelOpen.value ?? props.open ?? uncontrolled.value,
);
function setOpen(value: boolean): void {
  if (modelOpen.value !== undefined || props.open === undefined)
    modelOpen.value = value;
  uncontrolled.value = value;
}
const anchorRect = shallowRef<DOMRectReadOnly>();
const trigger = shallowRef<HTMLElement>();
function setAnchorRect(value: DOMRectReadOnly | undefined): void {
  anchorRect.value = value;
}
provideContextMenuRoot({ anchorRect, open, setAnchorRect, setOpen, trigger });
provideMenuChain({ closeChain: () => setOpen(false), open, setOpen });
</script>

<template><slot /></template>
