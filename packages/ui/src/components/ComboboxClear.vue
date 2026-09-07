<script setup lang="ts">
import { computed } from 'vue';

import { useComboboxContext } from './comboboxContext.ts';

defineSlots<{ default?: () => unknown }>();
const combobox = useComboboxContext();
const visible = computed(
  () => combobox.selected.value.length > 0 || combobox.query.value.length > 0,
);
function clear(): void {
  for (const value of combobox.selected.value) combobox.remove(value);
  combobox.setQuery('');
}
</script>

<template>
  <button
    v-if="visible"
    class="cladd-combobox-clear text-cladd-xs text-cladd-fg-soft"
    data-slot="combobox-clear"
    type="button"
    @click="clear"
  >
    <slot>Clear</slot>
  </button>
</template>
