<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { CommandItemProps } from './command.contracts.ts';
import { useCommandContext } from './commandContext.ts';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown; shortcut?: () => unknown }>();
const props = withDefaults(defineProps<CommandItemProps>(), {
  disabled: undefined,
});
const emit = defineEmits<{ select: [value: string] }>();
const attrs = useAttrs();
const d = useComponentDefaults('CommandItem', props, { disabled: false });
const command = useCommandContext();
const id = `cladd-command-item-${useId()}`;
const visible = computed(() =>
  command.filter.value(props.value, command.query.value),
);
const active = computed(() => command.activeId.value === id);
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn(
    'cladd-command-item flex w-full items-center gap-2 rounded-cladd-xs px-2 py-1.5 text-left text-cladd-xs outline-none',
    active.value && 'bg-cladd-surface-hover',
    d.value.disabled && 'opacity-50',
    attrs.class,
  ),
);
function select(): void {
  if (!d.value.disabled) emit('select', props.value);
}
</script>

<template>
  <button
    v-if="visible"
    :id="id"
    v-bind="rootAttrs"
    :aria-selected="active"
    :class="rootClass"
    :data-disabled="d.disabled || undefined"
    data-command-item="true"
    data-slot="command-item"
    :disabled="d.disabled"
    role="option"
    type="button"
    @click="select"
  >
    <slot /><span class="ml-auto"><slot name="shortcut" /></span>
  </button>
</template>
