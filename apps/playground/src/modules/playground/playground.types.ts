import type { Color } from 'cladd-vue';

/** The library takes `'dark' | 'light'`; upstream declares no theme union to import. */
export type PlaygroundTheme = 'dark' | 'light';

export interface PlaygroundPreferences {
  accent: Color;
  interactionsEnabled: boolean;
  theme: PlaygroundTheme;
}

/**
 * `'port'` is a strict, faithful reproduction of pinned Cladd (upstream React); `'extension'` is a
 * new family built from Cladd foundations that does not exist upstream. See
 * `packages/ui/CLAUDE.md` "Port vs extension boundary".
 */
export type CatalogOrigin = 'extension' | 'port';

export interface CatalogEntry {
  component?: string;
  count: number;
  description: string;
  id: string;
  label: string;
  /** Default `'port'`. */
  origin?: CatalogOrigin;
  path: string;
  title?: string;
}

export interface ComponentApiEntry {
  defaultValue?: string;
  description: string;
  name: string;
  type: string;
}
