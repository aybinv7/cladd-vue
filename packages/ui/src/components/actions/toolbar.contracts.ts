import type { Component } from 'vue';

import type {
  SurfaceLevelInput,
  SurfaceVariant,
  UiSize,
} from '../../foundations/contracts.ts';
import type { Color } from '../../types.ts';
import type { ButtonProps } from './button.contracts.ts';

export interface ToolbarProps {
  /** Polymorphic root element. Defaults to `'div'`. */
  as?: string | Component;
  /** Outline ring on child `ToolbarButton`s. Default `false`. */
  buttonOutline?: boolean;
  /** Surface variant applied to child `ToolbarButton`s through context. Default `'transparent'`. */
  buttonVariant?: SurfaceVariant;
  /** Accent color token. Sets the toolbar's `cladd-color-{name}` class. */
  color?: Color;
  /** Extra classes for the inner content wrapper. */
  contentClassName?: string;
  /** Outline ring on the toolbar container. Default `true`. */
  outline?: boolean;
  /** Pill-shape the toolbar container. Default `true`. Forwarded via context. */
  rounded?: boolean;
  /** Toolbar button size. Default `'md'`. Forwarded via context. */
  size?: UiSize;
  /** Forwarded to the underlying `Surface` as `level`. */
  surfaceLevel?: SurfaceLevelInput;
  /** Surface variant for the toolbar container. Default `'gradient'`. */
  variant?: SurfaceVariant;
}

export type ToolbarDefaultProps = Partial<Omit<ToolbarProps, 'as'>>;

export type ToolbarButtonDefaultProps = Partial<Omit<ButtonProps, 'as'>>;
