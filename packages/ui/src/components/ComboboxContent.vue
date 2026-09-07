<script setup lang="ts">
import { computed } from 'vue';

import { useComboboxContext } from './comboboxContext.ts';
import Popover from './Popover.vue';

defineSlots<{ default?: () => unknown }>();
const combobox = useComboboxContext();
const open = computed({
  get: () => combobox.open.value,
  set: (value: boolean) => combobox.setOpen(value),
});
</script>

<template>
  <Popover
    v-model:open="open"
    :anchor-element="combobox.anchor.value"
    class="cladd-combobox-content w-72 p-1"
    content-class-name="p-1"
    position="bottom-start"
    ><slot
  /></Popover>
</template>
