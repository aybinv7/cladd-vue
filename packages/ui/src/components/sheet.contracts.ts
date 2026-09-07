import type { OverlayRootProps } from './overlayRoot.ts';

export const sheetSides = [
  'inline-start',
  'inline-end',
  'top',
  'bottom',
] as const;

export type SheetSide = (typeof sheetSides)[number];

export interface SheetProps {
  /** Accessible description id for the panel. */
  ariaDescribedby?: string;
  /** Accessible label for a panel without a visible title. */
  ariaLabel?: string;
  /** Accessible title id for the panel. */
  ariaLabelledby?: string;
  /** Allows clicking the backdrop to close the panel. */
  closeOnBackdropClick?: boolean;
  /** Allows Escape to close the panel. */
  closeOnEscape?: boolean;
  /** Extra classes for the panel surface. */
  contentClassName?: string;
  /** Enables downward touch dragging to dismiss a bottom panel. */
  dragToClose?: boolean;
  /** Selector for the app region made inert while open. */
  inertContainer?: string;
  /** Defers content activation until the panel is opened. */
  lazy?: boolean;
  /** Portal target for the panel. */
  root?: string | HTMLElement | false;
  /** Edge from which the panel enters. */
  side?: SheetSide;
}

export type SheetDefaultProps = Partial<SheetProps>;
export type SheetRootProps = OverlayRootProps;
export type SheetTriggerProps = Record<string, never>;
export type SheetCloseProps = Record<string, never>;
