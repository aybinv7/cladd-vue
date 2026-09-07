import type { Component } from 'vue';

export interface CommandRootProps {
  /** Controlled search query. */
  query?: string;
  /** Initial query when uncontrolled. */
  defaultQuery?: string;
  /** Custom item visibility predicate for small local lists. */
  filter?: (value: string, query: string) => boolean;
}
export type CommandRootDefaultProps = Partial<Omit<CommandRootProps, 'filter'>>;
export interface CommandInputProps {
  /** Placeholder text for the command search input. */
  placeholder?: string;
  /** Prevents editing and command navigation. */
  disabled?: boolean;
}
export type CommandInputDefaultProps = Partial<CommandInputProps>;
export interface CommandItemProps {
  /** Stable text value used for filtering and typeahead. */
  value: string;
  /** Prevents activation. */
  disabled?: boolean;
}
export type CommandItemDefaultProps = Partial<Omit<CommandItemProps, 'value'>>;
export interface CommandGroupProps {
  /** Optional visible group label. */
  heading?: string;
}
export type CommandGroupDefaultProps = Partial<CommandGroupProps>;
export interface CommandEmptyProps {
  /** Whether the empty state is rendered. */
  forceMount?: boolean;
}
export type CommandEmptyDefaultProps = Partial<CommandEmptyProps>;
export interface CommandSeparatorProps {
  /** Element rendered as the separator. */
  as?: string | Component;
}
export type CommandSeparatorDefaultProps = Partial<
  Omit<CommandSeparatorProps, 'as'>
>;
