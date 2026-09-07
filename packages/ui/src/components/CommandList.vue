<script setup lang="ts">
import { onUpdated, useId } from 'vue';

import { ensureCommandActive, useCommandContext } from './commandContext.ts';

defineSlots<{ default?: () => unknown }>();

const command = useCommandContext();
const id = `cladd-command-list-${useId()}`;
function setList(value: unknown): void {
  command.list.value = value instanceof HTMLElement ? value : undefined;
}
onUpdated(() => ensureCommandActive(command));
</script>

<template>
  <div
    :id="id"
    :ref="setList"
    class="cladd-command-list min-h-0 overflow-auto p-1"
    data-slot="command-list"
    role="listbox"
  >
    <slot />
  </div>
</template>
