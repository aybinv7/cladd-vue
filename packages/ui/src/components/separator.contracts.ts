export interface SeparatorProps {
  /** Axis of the rule. Default `'horizontal'`. */
  orientation?: 'horizontal' | 'vertical';
  /** Presentation-only when `true` (default): removed from the accessibility tree since it does
   * not separate distinct sections of content. Set `false` for a semantic `role="separator"`. */
  decorative?: boolean;
}
export type SeparatorDefaultProps = Partial<SeparatorProps>;
