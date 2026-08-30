import { readFileSync, readdirSync } from 'node:fs';

import { expect, test } from 'vite-plus/test';

import {
  stylesPath,
  upstreamHydrated,
  upstreamStylesPath,
} from '../support/paths.ts';

/**
 * Lines that differ from upstream on purpose, keyed by file name.
 *
 * Every entry needs a reason. An empty allowance means the file must match
 * upstream byte for byte after line-ending normalization.
 */
const allowedDeviations: Record<string, string[]> = {
  'colors.css': [
    // Upstream ships this selector unformatted (`neutral){`). Oxfmt rewrites it
    // to `neutral) {` on every save, so the port cannot hold upstream's spelling.
    '.dark[class*="cladd-color-"]:not(.cladd-color-neutral) {',
  ],
};

function normalize(contents: string): string[] {
  return contents.replace(/\r\n/gu, '\n').split('\n');
}

function upstreamStylesheets(): string[] {
  return readdirSync(upstreamStylesPath()).filter((name) =>
    name.endsWith('.css'),
  );
}

test.skipIf(!upstreamHydrated)(
  'ports every upstream stylesheet without dropping a file',
  () => {
    const ported = new Set(
      readdirSync(stylesPath()).filter((name) => name.endsWith('.css')),
    );

    for (const name of upstreamStylesheets()) {
      expect(ported.has(name), `${name} is missing from src/styles`).toBe(true);
    }
  },
);

test.skipIf(!upstreamHydrated)(
  'matches upstream stylesheets line for line',
  () => {
    for (const name of upstreamStylesheets()) {
      const upstream = normalize(
        readFileSync(upstreamStylesPath(name), 'utf8'),
      );
      const ported = normalize(readFileSync(stylesPath(name), 'utf8'));
      const allowed = allowedDeviations[name] ?? [];

      const drift = ported
        .map((line, index) => ({ index, line, upstream: upstream[index] }))
        .filter((entry) => entry.line !== entry.upstream)
        .filter((entry) => !allowed.includes(entry.line.trim()));

      expect(
        drift.map((entry) => `${name}:${entry.index + 1} ${entry.line.trim()}`),
        `${name} drifted from reference/cladd`,
      ).toEqual([]);

      expect(ported.length, `${name} has a different line count`).toBe(
        upstream.length,
      );
    }
  },
);

test.skipIf(!upstreamHydrated)(
  'keeps the cladd namespace on every token',
  () => {
    for (const name of upstreamStylesheets()) {
      const ported = readFileSync(stylesPath(name), 'utf8');
      expect(ported, `${name} still carries a renamed token`).not.toMatch(
        /(?:--)?cui-/u,
      );
    }
  },
);
