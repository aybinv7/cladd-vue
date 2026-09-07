<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import type { DropdownMenuRootProps } from './menu.contracts.ts';
import { provideDropdownMenuRoot, provideMenuChain } from './menuContext.ts';

defineSlots<{
  default?: () => unknown;
}>();

const props = withDefaults(defineProps<DropdownMenuRootProps>(), {
  defaultOpen: undefined,
  open: undefined,
});

const modelOpen = defineModel<boolean | undefined>('open', {
  default: undefined,
});

const d = useComponentDefaults('DropdownMenuRoot', props, {
  defaultOpen: false,
});

const uncontrolled = shallowRef(d.value.defaultOpen);
const open = computed(
  () => modelOpen.value ?? props.open ?? uncontrolled.value,
);
function setOpen(next: boolean): void {
  if (modelOpen.value !== undefined || props.open === undefined) {
    modelOpen.value = next;
  }
  uncontrolled.value = next;
}

const anchor = shallowRef<HTMLElement | undefined>();
provideDropdownMenuRoot({ anchor, open, setOpen });
provideMenuChain({
  closeChain: () => setOpen(false),
  open,
  setOpen,
});
</script>

<template>
  <slot />
</template>
