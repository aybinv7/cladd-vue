<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import type { DropdownMenuRadioGroupProps } from './menu.contracts.ts';
import { provideMenuRadioGroup } from './menuContext.ts';

defineSlots<{
  default?: () => unknown;
}>();

const props = withDefaults(defineProps<DropdownMenuRadioGroupProps>(), {
  defaultValue: undefined,
  value: undefined,
});

const emit = defineEmits<{
  'update:value': [value: string];
}>();

const modelValue = defineModel<string | undefined>('value', {
  default: undefined,
});

const d = useComponentDefaults('DropdownMenuRadioGroup', props, {
  defaultValue: '',
});

const uncontrolled = shallowRef(d.value.defaultValue);
const value = computed(
  () => modelValue.value ?? props.value ?? uncontrolled.value,
);

function onSelect(next: string): void {
  if (modelValue.value !== undefined || props.value === undefined) {
    modelValue.value = next;
  }
  uncontrolled.value = next;
  emit('update:value', next);
}

provideMenuRadioGroup({ onSelect, value });
</script>

<template>
  <div data-slot="menu-radio-group" role="group">
    <slot />
  </div>
</template>
