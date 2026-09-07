import type { UiSize } from '../foundations/contracts.ts';

export interface NativeSelectProps {
  /** Prevents interaction and form submission of this control. Default `false`. */
  disabled?: boolean;
  /** Marks the control invalid for styling; does not affect native constraint validation. Default
   * `false`. */
  invalid?: boolean;
  /** Renders a native multi-select listbox instead of a dropdown. Default `false`. */
  multiple?: boolean;
  /** Participates in native required-field validation. Default `false`. */
  required?: boolean;
  /** Control height. Default `'lg'`. */
  size?: UiSize;
}
export type NativeSelectDefaultProps = Partial<NativeSelectProps>;
