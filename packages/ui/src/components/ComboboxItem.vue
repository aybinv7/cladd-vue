<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { ComboboxItemProps } from './combobox.contracts.ts';
import { useComboboxContext } from './comboboxContext.ts';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<ComboboxItemProps>(), {
  disabled: undefined,
  label: undefined,
});
const attrs = useAttrs();
const d = useComponentDefaults('ComboboxItem', props, { disabled: false });
const combobox = useComboboxContext();
const id = `cladd-combobox-item-${useId()}`;
const label = computed(() => props.label ?? String(props.value));
const visible = computed(() =>
  combobox.filter.value(label.value, combobox.query.value),
);
const selected = computed(() => combobox.selected.value.includes(props.value));
const active = computed(() => combobox.activeId.value === id);
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn(
    'cladd-combobox-item flex w-full items-center rounded-cladd-xs px-2 py-1.5 text-left text-cladd-xs outline-none',
    active.value && 'bg-cladd-surface-hover',
    selected.value && 'font-medium',
    d.value.disabled && 'opacity-50',
    attrs.class,
  ),
);
</script>

<template>
  <button
    v-if="visible"
    :id="id"
    v-bind="rootAttrs"
    :aria-selected="selected"
    :class="rootClass"
    :data-disabled="d.disabled || undefined"
    data-combobox-item="true"
    data-slot="combobox-item"
    :disabled="d.disabled"
    role="option"
    type="button"
    @click="combobox.select(props.value)"
  >
    <slot />
  </button>
</template>
