import type { Color } from '@cladd-vue/ui';

/** The library takes `'dark' | 'light'`; upstream declares no theme union to import. */
export type PlaygroundTheme = 'dark' | 'light';

export interface PlaygroundPreferences {
  accent: Color;
  interactionsEnabled: boolean;
  theme: PlaygroundTheme;
}

export interface CatalogEntry {
  component?: string;
  count: number;
  description: string;
  id: string;
  label: string;
  path: string;
  title?: string;
}

export interface ComponentApiEntry {
  defaultValue?: string;
  description: string;
  name: string;
  type: string;
}
