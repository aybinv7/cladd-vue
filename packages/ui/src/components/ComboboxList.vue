<script setup lang="ts">
import { onUpdated, useId } from 'vue';

import { ensureComboboxActive, useComboboxContext } from './comboboxContext.ts';

defineSlots<{ default?: () => unknown }>();
const combobox = useComboboxContext();
const id = `cladd-combobox-list-${useId()}`;
function setList(value: unknown): void {
  combobox.list.value = value instanceof HTMLElement ? value : undefined;
}
onUpdated(() => ensureComboboxActive(combobox));
</script>

<template>
  <div
    :id="id"
    :ref="setList"
    class="cladd-combobox-list max-h-60 overflow-auto"
    data-slot="combobox-list"
    role="listbox"
  >
    <slot />
  </div>
</template>
