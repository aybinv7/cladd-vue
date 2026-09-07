<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import type { CommandEmptyProps } from './command.contracts.ts';
import { commandItems, useCommandContext } from './commandContext.ts';

defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<CommandEmptyProps>(), {
  forceMount: undefined,
});
const d = useComponentDefaults('CommandEmpty', props, { forceMount: false });
const command = useCommandContext();
const empty = ref(false);
async function update(): Promise<void> {
  await nextTick();
  empty.value = commandItems(command.list.value).length === 0;
}
watch(command.query, update, { immediate: true });
</script>

<template>
  <div
    v-if="d.forceMount || empty"
    class="cladd-command-empty px-3 py-6 text-center text-cladd-xs text-cladd-fg-softer"
    data-slot="command-empty"
  >
    <slot>No results found.</slot>
  </div>
</template>
