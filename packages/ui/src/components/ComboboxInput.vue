<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import type { ComboboxInputProps } from './combobox.contracts.ts';
import {
  comboboxItems,
  ensureComboboxActive,
  useComboboxContext,
} from './comboboxContext.ts';
import { useFieldContext } from './fieldContext.ts';

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<ComboboxInputProps>(), {
  placeholder: undefined,
});
const attrs = useAttrs();
const d = useComponentDefaults('ComboboxInput', props, {
  placeholder: 'Search',
});
const combobox = useComboboxContext();
const field = useFieldContext();
const composing = ref(false);
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() => [
  'cladd-combobox-input w-full bg-transparent px-3 py-2 text-cladd-sm outline-none placeholder:text-cladd-fg-softer',
  attrs.class,
]);
function setAnchor(value: unknown): void {
  combobox.anchor.value = value instanceof HTMLElement ? value : undefined;
}
function move(offset: 1 | -1): void {
  const items = comboboxItems(combobox.list.value);
  if (items.length === 0) return;
  const index = items.findIndex((item) => item.id === combobox.activeId.value);
  combobox.activeId.value =
    items[(index + offset + items.length) % items.length]?.id;
}
function updateQuery(event: Event): void {
  combobox.setQuery((event.target as HTMLInputElement).value);
  combobox.setOpen(true);
  queueMicrotask(() => ensureComboboxActive(combobox));
}
function onInput(event: Event): void {
  if (!composing.value) updateQuery(event);
}
function onCompositionStart(): void {
  composing.value = true;
}
function onCompositionEnd(event: CompositionEvent): void {
  composing.value = false;
  updateQuery(event);
}
function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    combobox.setOpen(true);
    move(1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    move(-1);
  } else if (event.key === 'Home') {
    event.preventDefault();
    combobox.activeId.value = comboboxItems(combobox.list.value)[0]?.id;
  } else if (event.key === 'End') {
    event.preventDefault();
    combobox.activeId.value = comboboxItems(combobox.list.value).at(-1)?.id;
  } else if (event.key === 'Escape') {
    combobox.setOpen(false);
  } else if (event.key === 'Enter') {
    const active = combobox.activeId.value
      ? combobox.list.value?.querySelector<HTMLElement>(
          `#${CSS.escape(combobox.activeId.value)}`,
        )
      : undefined;
    if (active) {
      event.preventDefault();
      active.click();
    }
  } else if (
    event.key === 'Backspace' &&
    !combobox.query.value &&
    combobox.multiple.value
  ) {
    const last = combobox.selected.value.at(-1);
    if (last !== undefined) combobox.remove(last);
  }
}
</script>

<template>
  <input
    :id="field?.controlId.value"
    :ref="setAnchor"
    v-bind="rootAttrs"
    :aria-activedescendant="combobox.activeId.value"
    aria-autocomplete="list"
    :aria-busy="combobox.busy.value || undefined"
    :aria-controls="combobox.list.value?.id"
    :aria-describedby="field?.describedBy.value"
    :aria-expanded="combobox.open.value"
    :aria-invalid="combobox.invalid.value || field?.invalid.value || undefined"
    :class="rootClass"
    :disabled="combobox.disabled.value || field?.disabled.value"
    :placeholder="d.placeholder"
    :required="field?.required.value"
    role="combobox"
    :value="combobox.query.value"
    @compositionend="onCompositionEnd"
    @compositionstart="onCompositionStart"
    @focus="combobox.setOpen(true)"
    @input="onInput"
    @keydown="onKeydown"
  />
</template>
