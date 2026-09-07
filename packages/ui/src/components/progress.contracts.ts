import type { Color } from '../types.ts';

export interface ProgressProps {
  /** Accent color for the fill. Default: theme accent, matching `Slider`. */
  color?: Color;
  /** Current value. Omitted, non-finite, or paired with `indeterminate` renders the indeterminate
   * sweep instead of a determinate fill. */
  value?: number;
  /** Minimum value. Default `0`. */
  min?: number;
  /** Maximum value. Default `100`. */
  max?: number;
  /** Forces the indeterminate visual regardless of `value`. Default `false`. */
  indeterminate?: boolean;
  /** Accessible name for the progressbar when no visible `ProgressLabel` is rendered. */
  ariaLabel?: string;
}
export type ProgressDefaultProps = Partial<ProgressProps>;
