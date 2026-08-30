import type { Color } from '../types.ts';
import type { FieldSize } from './form.contracts.ts';

export const searchFieldClasses = 'cladd-search-field w-full';

export const searchFieldIconClasses = 'text-cladd-fg-softer';

export interface SearchFieldProps {
  /** Default `true`. */
  clearButton?: boolean;
  /** Accent color token. Sets the button's `cladd-color-{name}` class - drives text and ring colors. */
  color?: Color;
  /** Default `'Search'`. */
  placeholder?: string;
  /** Default `true`. */
  rounded?: boolean;
  /** Default `'lg'`. */
  size?: FieldSize;
}

export type SearchFieldDefaultProps = Partial<SearchFieldProps>;
