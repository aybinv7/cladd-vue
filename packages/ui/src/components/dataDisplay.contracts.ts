import type { Component } from 'vue';

import type {
  SurfaceLevelInput,
  SurfaceVariant,
  UiSize,
} from '../foundations/contracts.ts';
import type { Color } from '../types.ts';

/** Shortcut size token, spelled out as upstream declares it. */
export type ShortcutSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Chip size token, spelled out as upstream declares it. */
export type ChipSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ChipProps {
  /** Polymorphic root element. Defaults to `'span'`. */
  as?: string | Component;
  clickable?: boolean;
  color?: Color;
  contentClassName?: string;
  disabled?: boolean;
  hoverable?: boolean;
  icon?: Component;
  iconProps?: Record<string, unknown>;
  /** Render the outline ring. Default `true`. */
  outline?: boolean;
  rounded?: boolean;
  /** Default `'md'`. */
  size?: UiSize;
  surfaceLevel?: SurfaceLevelInput;
  /** Default `'gradient'`. */
  variant?: SurfaceVariant;
}

export type ChipDefaultProps = Partial<
  Omit<ChipProps, 'as' | 'icon' | 'iconProps'>
>;

export interface ShortcutProps {
  as?: string | Component;
  color?: Color;
  iconClassName?: string;
  keyClassName?: string;
  keyContentClassName?: string;
  outline?: boolean;
  size?: UiSize;
  surfaceLevel?: SurfaceLevelInput;
  variant?: SurfaceVariant;
}

export type ShortcutDefaultProps = Partial<Omit<ShortcutProps, 'as'>>;

export interface ListButtonProps {
  /** Polymorphic root element. Defaults to `'button'`. Pass `'a'` for navigation rows. */
  as?: string | Component;
  color?: Color;
  contentClassName?: string;
  disabled?: boolean;
  /** Small text rendered below the title. */
  footer?: string;
  footerClassName?: string;
  /** Small text rendered above the title. */
  header?: string;
  headerClassName?: string;
  iconClassName?: string;
  innerContentClassName?: string;
  /** Effective value is `outline || selected`. Default `false`. */
  outline?: boolean;
  readOnly?: boolean;
  /** Default `true`. */
  rounded?: boolean;
  /** Forces `variant: 'gradient'` and `outline: true`. */
  selected?: boolean;
  /** Default `'lg'` (vs Button's `'md'`) — list rows want more vertical space. */
  size?: UiSize;
  titleClassName?: string;
  /** Default `'transparent'` so rows blend into the list surface. */
  variant?: SurfaceVariant;
}

export type ListButtonDefaultProps = Partial<
  Omit<ListButtonProps, 'as' | 'footer' | 'header' | 'selected'>
>;

/** `List`, `ListItem`, `ListTitle`, `ListSeparator` and `SectionTitle` take no props of their own
 * upstream beyond `className`/`children`, which Vue carries as attrs and the default slot. Their
 * registry entries exist so `defaults` can still target them once they gain props. */
export type ListDefaultProps = Record<string, never>;

export type ListItemDefaultProps = Record<string, never>;

export type ListTitleDefaultProps = Record<string, never>;

export type ListSeparatorDefaultProps = Record<string, never>;

export type SectionTitleDefaultProps = Record<string, never>;
