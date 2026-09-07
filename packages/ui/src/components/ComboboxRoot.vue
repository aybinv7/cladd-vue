<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import type { ComboboxRootProps, ComboboxValue } from './combobox.contracts.ts';
import {
  defaultComboboxFilter,
  provideComboboxContext,
} from './comboboxContext.ts';

defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<ComboboxRootProps>(), {
  busy: undefined,
  defaultQuery: undefined,
  defaultValue: undefined,
  disabled: undefined,
  filter: undefined,
  invalid: undefined,
  multiple: undefined,
  open: undefined,
  query: undefined,
  value: undefined,
});
const value = defineModel<ComboboxValue | ComboboxValue[] | undefined>(
  'value',
  { default: undefined },
);
const queryModel = defineModel<string | undefined>('query', {
  default: undefined,
});
const open = defineModel<boolean | undefined>('open', { default: undefined });
const d = useComponentDefaults('ComboboxRoot', props, {
  busy: false,
  defaultQuery: '',
  defaultValue: [],
  disabled: false,
  invalid: false,
  multiple: false,
});
const uncontrolledValue = shallowRef<ComboboxValue[]>(
  Array.isArray(d.value.defaultValue)
    ? [...d.value.defaultValue]
    : d.value.defaultValue === undefined
      ? []
      : [d.value.defaultValue],
);
const uncontrolledQuery = shallowRef(d.value.defaultQuery);
const uncontrolledOpen = shallowRef(false);
const selected = computed<readonly ComboboxValue[]>(() => {
  const source = value.value ?? props.value;
  if (source === undefined) return uncontrolledValue.value;
  return Array.isArray(source) ? source : [source];
});
const query = computed(
  () => queryModel.value ?? props.query ?? uncontrolledQuery.value,
);
const isOpen = computed(
  () => open.value ?? props.open ?? uncontrolledOpen.value,
);
function setQuery(next: string): void {
  if (queryModel.value !== undefined || props.query === undefined)
    queryModel.value = next;
  uncontrolledQuery.value = next;
}
function setOpen(next: boolean): void {
  if (open.value !== undefined || props.open === undefined) open.value = next;
  uncontrolledOpen.value = next;
}
function setValue(next: ComboboxValue[]): void {
  const resolved: ComboboxValue | ComboboxValue[] = d.value.multiple
    ? next
    : (next[0] ?? '');
  if (value.value !== undefined || props.value === undefined)
    value.value = resolved;
  uncontrolledValue.value = next;
}
function select(next: ComboboxValue): void {
  if (d.value.disabled) return;
  const current = [...selected.value];
  const found = current.includes(next);
  const result = d.value.multiple
    ? found
      ? current.filter((item) => item !== next)
      : [...current, next]
    : [next];
  setValue(result);
  if (!d.value.multiple) setOpen(false);
}
function remove(next: ComboboxValue): void {
  setValue(selected.value.filter((item) => item !== next));
}
provideComboboxContext({
  activeId: shallowRef(),
  anchor: shallowRef(),
  busy: computed(() => d.value.busy),
  disabled: computed(() => d.value.disabled),
  filter: computed(() => props.filter ?? defaultComboboxFilter),
  invalid: computed(() => d.value.invalid),
  list: shallowRef(),
  multiple: computed(() => d.value.multiple),
  open: isOpen,
  query,
  remove,
  select,
  selected,
  setOpen,
  setQuery,
});
</script>

<template>
  <div class="cladd-combobox relative" data-slot="combobox"><slot /></div>
</template>
