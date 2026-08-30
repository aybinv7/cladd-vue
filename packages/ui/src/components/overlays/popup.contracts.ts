import type {
  SurfaceLevelInput,
  SurfaceVariant,
} from '../../foundations/contracts.ts';
import type { Color } from '../../types.ts';

export interface PopupProps {
  ariaDescribedby?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  /** Default `true`. */
  backdrop?: boolean;
  backdropClassName?: string;
  /** Default `true`. */
  closeButton?: boolean;
  closeButtonColor?: Color;
  /** Default `true`. */
  closeOnBackdropClick?: boolean;
  /** Default `true`. */
  closeOnEscape?: boolean;
  contentClassName?: string;
  /** Default `true`. */
  header?: boolean;
  headerClassName?: string;
  /** Selector for the element to mark `inert` while the popup is open. Default `'.app-container'`. */
  inertContainer?: string;
  lazy?: boolean;
  root?: string | HTMLElement;
  wrapClassName?: string;
}

export type PopupDefaultProps = Partial<
  Omit<PopupProps, 'ariaDescribedby' | 'ariaLabel' | 'ariaLabelledby'>
>;

export interface PopupContentProps {
  contentClassName?: string;
  /** Default `true`. */
  outline?: boolean;
  /** Default `1`. */
  surfaceLevel?: SurfaceLevelInput;
  /** Default `'solid'`. */
  variant?: SurfaceVariant;
}

export type PopupContentDefaultProps = Partial<PopupContentProps>;

export const popupContainerClasses =
  'cladd-popup fixed inset-0 z-50 flex flex-col justify-center overflow-hidden';

export const popupOpenedMarkerClasses = 'popup-opened';

export const popupBackdropClasses = 'pointer-events-none duration-200';

export const popupBackdropOpenedClasses = 'opacity-100 duration-500';

export const popupBackdropClosedClasses = 'opacity-0';

export const popupWrapperClasses =
  'cladd-popup-wrapper absolute inset-0 z-50 h-fit max-h-full self-center overflow-auto pt-safe-12 pb-safe-12';

export const popupWrapperOpenedClasses =
  'duration-500 ease-[cubic-bezier(0,1,0.2,1)]';

export const popupWrapperClosedClasses =
  'translate-y-[100vh] scale-x-65 duration-200 ease-[ease-in]';

export const popupContentClasses =
  'cladd-popup-content pointer-events-auto relative mx-auto flex min-h-full w-full max-w-162 flex-col justify-center gap-2';

export const popupHeaderClasses = 'flex items-end justify-between px-4';

export const popupHeaderLeftClasses = 'flex min-w-0 shrink items-end gap-4';

export const popupHeaderRightClasses = 'flex items-center gap-2';

export const popupCloseWrapperClasses = 'rounded-full';

export const popupCloseWrapperContentClasses = 'flex items-center p-1';

export const popupCloseButtonContentClasses = 'text-cladd-fg-soft';

export const popupCardClasses = 'rounded-cladd-popup';

export const popupCardContentClasses = '!h-auto w-full p-4';

/** Selector for the sibling overlays that suppress a Popup's Escape handling. */
export const popupChildOverlaySelector =
  '.cladd-popover, .cladd-dialog, .cladd-popup';

export const popupContainerSelector = '.cladd-popup';

export const popupContentSelector = '.cladd-popup-content';

/**
 * Backdrop-click guard: a click that lands inside the card, a nested popover/dialog, or a
 * detached node must not dismiss the popup.
 */
export const popupInsideClickSelector =
  '.cladd-popup-content, .cladd-popover, .cladd-dialog';

/** Stacked-popup transform: each popup behind the top one is pushed up and scaled down. */
export function popupStackTransform(step: number): string {
  return `translateY(-${16 * step}px) scale(${1 - 0.1 * step})`;
}

export const popupStackTransitionDuration = '400ms';

export const popupStackTransformOrigin = 'top';
