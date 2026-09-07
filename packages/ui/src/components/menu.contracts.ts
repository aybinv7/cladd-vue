import type { Component } from 'vue';

import type { PopoverPosition } from './overlay.contracts.ts';

export interface DropdownMenuRootProps {
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
}
export type DropdownMenuRootDefaultProps = Partial<DropdownMenuRootProps>;
export interface DropdownMenuTriggerProps {
  /** Element or component rendered as the trigger. */
  as?: string | Component;
  /** Prevents opening the menu. */
  disabled?: boolean;
}
export type DropdownMenuTriggerDefaultProps = Partial<
  Omit<DropdownMenuTriggerProps, 'as'>
>;
export interface DropdownMenuContentProps {
  /** Extra classes for the menu surface. */
  className?: string;
  /** Popover placement relative to the trigger. */
  position?: PopoverPosition;
  /** Overlay root receiving the content. */
  root?: string | HTMLElement | false;
}
export type DropdownMenuContentDefaultProps = Partial<DropdownMenuContentProps>;
export interface DropdownMenuGroupProps {
  /** Accessible label rendered for the group. */
  label?: string;
}
export type DropdownMenuGroupDefaultProps = Partial<DropdownMenuGroupProps>;
export interface DropdownMenuLabelProps {
  /** Element or component rendered as the label. */
  as?: string | Component;
}
export type DropdownMenuLabelDefaultProps = Partial<
  Omit<DropdownMenuLabelProps, 'as'>
>;
export interface DropdownMenuItemProps {
  /** Closes the containing menu after selection. */
  closeOnSelect?: boolean;
  /** Prevents selection and keyboard navigation. */
  disabled?: boolean;
}
export type DropdownMenuItemDefaultProps = Partial<DropdownMenuItemProps>;
export interface DropdownMenuCheckboxItemProps {
  /** Controlled checked state. */
  checked?: boolean;
  /** Closes the containing menu after selection. */
  closeOnSelect?: boolean;
  /** Initial checked state when uncontrolled. */
  defaultChecked?: boolean;
  /** Prevents selection and keyboard navigation. */
  disabled?: boolean;
}
export type DropdownMenuCheckboxItemDefaultProps = Partial<
  Omit<DropdownMenuCheckboxItemProps, 'checked'>
>;
export interface DropdownMenuRadioGroupProps {
  /** Initial selected value when uncontrolled. */
  defaultValue?: string;
  /** Controlled selected value. */
  value?: string;
}
export type DropdownMenuRadioGroupDefaultProps = Partial<
  Omit<DropdownMenuRadioGroupProps, 'value'>
>;
export interface DropdownMenuRadioItemProps {
  /** Closes the containing menu after selection. */
  closeOnSelect?: boolean;
  /** Prevents selection and keyboard navigation. */
  disabled?: boolean;
  /** Value selected through the containing radio group. */
  value?: string;
}
export type DropdownMenuRadioItemDefaultProps = Partial<
  Omit<DropdownMenuRadioItemProps, 'value'>
>;
export interface DropdownMenuSeparatorProps {
  /** Element or component rendered as the separator. */
  as?: string | Component;
}
export type DropdownMenuSeparatorDefaultProps = Partial<
  Omit<DropdownMenuSeparatorProps, 'as'>
>;
export interface DropdownMenuShortcutProps {
  /** Element or component rendered as the shortcut. */
  as?: string | Component;
}
export type DropdownMenuShortcutDefaultProps = Partial<
  Omit<DropdownMenuShortcutProps, 'as'>
>;
export interface DropdownMenuSubProps {
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
}
export type DropdownMenuSubDefaultProps = Partial<DropdownMenuSubProps>;
export interface DropdownMenuSubTriggerProps {
  /** Prevents opening the submenu. */
  disabled?: boolean;
}
export type DropdownMenuSubTriggerDefaultProps =
  Partial<DropdownMenuSubTriggerProps>;
export interface DropdownMenuSubContentProps {
  /** Extra classes for the submenu surface. */
  className?: string;
  /** Popover placement relative to the submenu trigger. */
  position?: PopoverPosition;
}
export type DropdownMenuSubContentDefaultProps =
  Partial<DropdownMenuSubContentProps>;
export interface ContextMenuRootProps {
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
}
export type ContextMenuRootDefaultProps = Partial<ContextMenuRootProps>;
export interface ContextMenuTriggerProps {
  /** Element or component rendered as the trigger. */
  as?: string | Component;
  /** Prevents opening the context menu. */
  disabled?: boolean;
}
export type ContextMenuTriggerDefaultProps = Partial<
  Omit<ContextMenuTriggerProps, 'as'>
>;
export interface ContextMenuContentProps {
  /** Extra classes for the menu surface. */
  className?: string;
  /** Popover placement relative to the pointer anchor. */
  position?: PopoverPosition;
  /** Overlay root receiving the content. */
  root?: string | HTMLElement | false;
}
export type ContextMenuContentDefaultProps = Partial<ContextMenuContentProps>;
export type ContextMenuCheckboxItemProps = DropdownMenuCheckboxItemProps;
export type ContextMenuCheckboxItemDefaultProps =
  DropdownMenuCheckboxItemDefaultProps;
export type ContextMenuGroupProps = DropdownMenuGroupProps;
export type ContextMenuGroupDefaultProps = DropdownMenuGroupDefaultProps;
export type ContextMenuItemProps = DropdownMenuItemProps;
export type ContextMenuItemDefaultProps = DropdownMenuItemDefaultProps;
export type ContextMenuLabelProps = DropdownMenuLabelProps;
export type ContextMenuLabelDefaultProps = DropdownMenuLabelDefaultProps;
export type ContextMenuRadioGroupProps = DropdownMenuRadioGroupProps;
export type ContextMenuRadioGroupDefaultProps =
  DropdownMenuRadioGroupDefaultProps;
export type ContextMenuRadioItemProps = DropdownMenuRadioItemProps;
export type ContextMenuRadioItemDefaultProps =
  DropdownMenuRadioItemDefaultProps;
export type ContextMenuSeparatorProps = DropdownMenuSeparatorProps;
export type ContextMenuSeparatorDefaultProps =
  DropdownMenuSeparatorDefaultProps;
export type ContextMenuShortcutProps = DropdownMenuShortcutProps;
export type ContextMenuShortcutDefaultProps = DropdownMenuShortcutDefaultProps;
