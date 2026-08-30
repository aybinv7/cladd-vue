import type { UiSize } from '../foundations/contracts.ts';

export interface RoundedClasses {
  focusRoundedClasses: string;
  itemRoundedClasses: string;
  wrapRoundedClasses: string;
}

const itemClasses: Record<UiSize, string> = {
  '2xs': 'rounded-cladd-2xs',
  xs: 'rounded-cladd-xs',
  sm: 'rounded-cladd-sm',
  md: 'rounded-cladd-md',
  lg: 'rounded-cladd-lg',
  xl: 'rounded-cladd-xl',
  '2xl': 'rounded-cladd-2xl',
};

const itemFullClasses: Record<UiSize, string> = {
  '2xs': 'rounded-cladd-full-2xs',
  xs: 'rounded-cladd-full-xs',
  sm: 'rounded-cladd-full-sm',
  md: 'rounded-cladd-full-md',
  lg: 'rounded-cladd-full-lg',
  xl: 'rounded-cladd-full-xl',
  '2xl': 'rounded-cladd-full-2xl',
};

const focusClasses: Record<UiSize, string> = {
  '2xs': 'rounded-cladd-focus-2xs',
  xs: 'rounded-cladd-focus-xs',
  sm: 'rounded-cladd-focus-sm',
  md: 'rounded-cladd-focus-md',
  lg: 'rounded-cladd-focus-lg',
  xl: 'rounded-cladd-focus-xl',
  '2xl': 'rounded-cladd-focus-2xl',
};

const focusFullClasses: Record<UiSize, string> = {
  '2xs': 'rounded-cladd-focus-full-2xs',
  xs: 'rounded-cladd-focus-full-xs',
  sm: 'rounded-cladd-focus-full-sm',
  md: 'rounded-cladd-focus-full-md',
  lg: 'rounded-cladd-focus-full-lg',
  xl: 'rounded-cladd-focus-full-xl',
  '2xl': 'rounded-cladd-focus-full-2xl',
};

const wrapClasses: Record<UiSize, string> = {
  '2xs': 'rounded-cladd-wrap-2xs',
  xs: 'rounded-cladd-wrap-xs',
  sm: 'rounded-cladd-wrap-sm',
  md: 'rounded-cladd-wrap-md',
  lg: 'rounded-cladd-wrap-lg',
  xl: 'rounded-cladd-wrap-xl',
  '2xl': 'rounded-cladd-wrap-2xl',
};

const wrapFullClasses: Record<UiSize, string> = {
  '2xs': 'rounded-cladd-wrap-full-2xs',
  xs: 'rounded-cladd-wrap-full-xs',
  sm: 'rounded-cladd-wrap-full-sm',
  md: 'rounded-cladd-wrap-full-md',
  lg: 'rounded-cladd-wrap-full-lg',
  xl: 'rounded-cladd-wrap-full-xl',
  '2xl': 'rounded-cladd-wrap-full-2xl',
};

function resolve(
  size: UiSize,
  sized: Record<UiSize, string>,
  full: Record<UiSize, string>,
  rounded?: boolean,
  multiline?: boolean,
): string {
  if (rounded && multiline) return full[size];
  if (rounded) return 'rounded-full';
  return sized[size];
}

export function roundedClasses(
  size: UiSize,
  rounded?: boolean,
  multiline?: boolean,
): RoundedClasses {
  return {
    itemRoundedClasses: resolve(
      size,
      itemClasses,
      itemFullClasses,
      rounded,
      multiline,
    ),
    focusRoundedClasses: resolve(
      size,
      focusClasses,
      focusFullClasses,
      rounded,
      multiline,
    ),
    wrapRoundedClasses: resolve(
      size,
      wrapClasses,
      wrapFullClasses,
      rounded,
      multiline,
    ),
  };
}
