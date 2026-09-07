<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import type { ComboboxEmptyProps } from './combobox.contracts.ts';
import { comboboxItems, useComboboxContext } from './comboboxContext.ts';

defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<ComboboxEmptyProps>(), {
  forceMount: undefined,
});
const d = useComponentDefaults('ComboboxEmpty', props, { forceMount: false });
const combobox = useComboboxContext();
const empty = ref(false);
async function update(): Promise<void> {
  await nextTick();
  empty.value = comboboxItems(combobox.list.value).length === 0;
}
watch(combobox.query, update, { immediate: true });
</script>

<template>
  <div
    v-if="d.forceMount || empty"
    class="cladd-combobox-empty px-3 py-6 text-center text-cladd-xs text-cladd-fg-softer"
    data-slot="combobox-empty"
  >
    <slot>No results found.</slot>
  </div>
</template>
