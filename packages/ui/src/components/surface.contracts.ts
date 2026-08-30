import type { Component } from 'vue';

import type {
  SurfaceLevelInput,
  SurfaceVariant,
} from '../foundations/contracts.ts';
import type { Color } from '../types.ts';

export interface SurfaceProps {
  /** Polymorphic root element. Defaults to `'div'`. */
  as?: string | Component;
  bgClassName?: string;
  clickable?: boolean;
  /** Accent color token. Sets the surface's `cladd-color-{name}` class. */
  color?: Color;
  contentClassName?: string;
  hoverable?: boolean;
  /** Absolute (1–5) or relative (`'+1'`/`'-1'`) depth. Defaults to parent + 1. */
  level?: SurfaceLevelInput;
  /** Render the outline ring. Default `false`. */
  outline?: boolean;
  overlayClassName?: string;
  /** Default `'above'`. */
  overlayPosition?: 'above' | 'below';
  pressed?: boolean;
  /** Default `'solid'`. */
  variant?: SurfaceVariant;
  /** Wrap children in the content layer. Default `true`. */
  wrapContent?: boolean;
}

export type SurfaceDefaultProps = Partial<Omit<SurfaceProps, 'as' | 'level'>>;

export interface SurfaceCutProps {
  as?: string | Component;
  bgClassName?: string;
  clickable?: boolean;
  color?: Color;
  contentClassName?: string;
  hoverable?: boolean;
  outline?: boolean;
  overlayClassName?: string;
  overlayPosition?: 'above' | 'below';
  pressed?: boolean;
  wrapContent?: boolean;
}

export type SurfaceCutDefaultProps = Partial<Omit<SurfaceCutProps, 'as'>>;
