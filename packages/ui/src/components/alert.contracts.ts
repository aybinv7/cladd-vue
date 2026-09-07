import type { Component } from 'vue';

export type AlertVariant =
  | 'neutral'
  | 'information'
  | 'success'
  | 'warning'
  | 'destructive';
export type AlertLive = 'off' | 'polite' | 'assertive';

export interface AlertProps {
  /** Visual and semantic status. Default `'neutral'`. */
  variant?: AlertVariant;
  /** Live-region behavior. Static alerts do not force announcement; opt a freshly inserted alert
   * into `'polite'` (`role="status"`) or `'assertive'` (`role="alert"`). Default `'off'`. */
  live?: AlertLive;
  /** Icon component rendered before the title/description column. Receives `iconProps`. Matches
   * `ToastProps.icon`. */
  icon?: Component;
  /** Props forwarded to the `icon` component. Matches `ToastProps.iconProps`. */
  iconProps?: Record<string, unknown>;
}
export type AlertDefaultProps = Partial<Omit<AlertProps, 'icon' | 'iconProps'>>;

export const alertColors: Record<AlertVariant, string | undefined> = {
  destructive: 'red',
  information: 'blue',
  neutral: undefined,
  success: 'green',
  warning: 'orange',
};

export const alertStatusWords: Record<AlertVariant, string | undefined> = {
  destructive: 'Error',
  information: 'Info',
  neutral: undefined,
  success: 'Success',
  warning: 'Warning',
};
