<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import type { CommandInputProps } from './command.contracts.ts';
import {
  commandActiveItem,
  commandItems,
  ensureCommandActive,
  useCommandContext,
} from './commandContext.ts';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<CommandInputProps>(), {
  disabled: undefined,
  placeholder: undefined,
});
const attrs = useAttrs();
const d = useComponentDefaults('CommandInput', props, {
  disabled: false,
  placeholder: 'Search commands',
});
const command = useCommandContext();
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() => [
  'cladd-command-input w-full bg-transparent px-3 py-2 text-cladd-sm outline-none placeholder:text-cladd-fg-softer',
  attrs.class,
]);

function move(offset: 1 | -1): void {
  const items = commandItems(command.list.value);
  if (items.length === 0) return;
  const current = items.findIndex((item) => item.id === command.activeId.value);
  command.activeId.value =
    items[(current + offset + items.length) % items.length]?.id;
}

function onInput(event: Event): void {
  command.setQuery((event.target as HTMLInputElement).value);
  queueMicrotask(() => ensureCommandActive(command));
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    move(1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    move(-1);
  } else if (event.key === 'Home') {
    event.preventDefault();
    command.activeId.value = commandItems(command.list.value)[0]?.id;
  } else if (event.key === 'End') {
    event.preventDefault();
    const items = commandItems(command.list.value);
    command.activeId.value = items.at(-1)?.id;
  } else if (event.key === 'Enter') {
    const item = commandActiveItem(command);
    if (item) {
      event.preventDefault();
      item.click();
    }
  }
}
</script>

<template>
  <input
    v-bind="rootAttrs"
    :aria-activedescendant="command.activeId.value"
    aria-autocomplete="list"
    :aria-controls="command.list.value?.id"
    :class="rootClass"
    :disabled="d.disabled"
    :placeholder="d.placeholder"
    role="combobox"
    :value="command.query.value"
    @input="onInput"
    @keydown="onKeydown"
  />
</template>
