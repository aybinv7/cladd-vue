import type { Component } from 'vue';

export type ComboboxValue = string | number;

export interface ComboboxRootProps {
  /** Controlled selected value or values. */
  value?: ComboboxValue | readonly ComboboxValue[];
  /** Initial selection when uncontrolled. */
  defaultValue?: ComboboxValue | readonly ComboboxValue[];
  /** Enables multiple selection. */
  multiple?: boolean;
  /** Controlled input query. */
  query?: string;
  /** Controlled listbox visibility. */
  open?: boolean;
  /** Initial input query when uncontrolled. */
  defaultQuery?: string;
  /** Consumer-owned predicate for small local lists. */
  filter?: (value: string, query: string) => boolean;
  /** Prevents selection and editing. */
  disabled?: boolean;
  /** Marks the input invalid. */
  invalid?: boolean;
  /** Exposes busy state to assistive technology. */
  busy?: boolean;
}
export type ComboboxRootDefaultProps = Partial<
  Omit<ComboboxRootProps, 'filter' | 'value' | 'query' | 'open'>
>;
export interface ComboboxInputProps {
  /** Placeholder text. */
  placeholder?: string;
}
export type ComboboxInputDefaultProps = Partial<ComboboxInputProps>;
export interface ComboboxItemProps {
  /** Stable value selected by this option. */
  value: ComboboxValue;
  /** Text used by the filter. */
  label?: string;
  /** Prevents this option from selection. */
  disabled?: boolean;
}
export type ComboboxItemDefaultProps = Partial<
  Omit<ComboboxItemProps, 'value'>
>;
export interface ComboboxGroupProps {
  /** Optional visible group label. */ heading?: string;
}
export type ComboboxGroupDefaultProps = Partial<ComboboxGroupProps>;
export interface ComboboxEmptyProps {
  /** Always renders the empty state. */ forceMount?: boolean;
}
export type ComboboxEmptyDefaultProps = Partial<ComboboxEmptyProps>;
export interface ComboboxSeparatorProps {
  /** Element rendered as separator. */ as?: string | Component;
}
export type ComboboxSeparatorDefaultProps = Partial<
  Omit<ComboboxSeparatorProps, 'as'>
>;
export interface ComboboxChipProps {
  /** Value represented by the chip. */ value: ComboboxValue;
}
export type ComboboxChipDefaultProps = Record<string, never>;
