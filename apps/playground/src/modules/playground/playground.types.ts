import type { Color, UiTheme } from '@cladd-vue/ui';

export interface PlaygroundPreferences {
  accent: Color;
  interactionsEnabled: boolean;
  theme: UiTheme;
}

export interface CatalogEntry {
  count: number;
  description: string;
  id: string;
  label: string;
  path: string;
}

export interface ComponentApiEntry {
  defaultValue?: string;
  description: string;
  name: string;
  type: string;
}
