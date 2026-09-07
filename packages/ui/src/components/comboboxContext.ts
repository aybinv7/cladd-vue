import {
  inject,
  provide,
  type ComputedRef,
  type InjectionKey,
  type ShallowRef,
} from 'vue';

import type { ComboboxValue } from './combobox.contracts.ts';

export interface ComboboxContextValue {
  activeId: ShallowRef<string | undefined>;
  anchor: ShallowRef<HTMLElement | undefined>;
  busy: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  filter: ComputedRef<(value: string, query: string) => boolean>;
  invalid: ComputedRef<boolean>;
  list: ShallowRef<HTMLElement | undefined>;
  multiple: ComputedRef<boolean>;
  open: ComputedRef<boolean>;
  query: ComputedRef<string>;
  remove: (value: ComboboxValue) => void;
  select: (value: ComboboxValue) => void;
  selected: ComputedRef<readonly ComboboxValue[]>;
  setOpen: (value: boolean) => void;
  setQuery: (value: string) => void;
}

const comboboxContextKey: InjectionKey<ComboboxContextValue> =
  Symbol('cladd-combobox');

export function provideComboboxContext(
  value: ComboboxContextValue,
): ComboboxContextValue {
  provide(comboboxContextKey, value);
  return value;
}
export function useComboboxContext(): ComboboxContextValue {
  const context = inject(comboboxContextKey, null);
  if (!context)
    throw new Error(
      'cladd-vue: Combobox components must be inside ComboboxRoot.',
    );
  return context;
}
export const defaultComboboxFilter = (value: string, query: string): boolean =>
  value.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
export function comboboxItems(list: HTMLElement | undefined): HTMLElement[] {
  return list
    ? [
        ...list.querySelectorAll<HTMLElement>(
          '[data-combobox-item]:not([data-disabled])',
        ),
      ]
    : [];
}
export function ensureComboboxActive(context: ComboboxContextValue): void {
  const items = comboboxItems(context.list.value);
  if (!items.some((item) => item.id === context.activeId.value))
    context.activeId.value = items[0]?.id;
}
