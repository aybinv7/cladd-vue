export interface ScrollAreaProps {
  /** Axis that scrolls. `'both'` leaves native overflow on both axes. Default `'vertical'`. */
  orientation?: 'horizontal' | 'vertical' | 'both';
}
export type ScrollAreaDefaultProps = Partial<ScrollAreaProps>;
