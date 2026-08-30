import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from 'vite-plus/test';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(packageRoot, '..', '..');
const upstreamStyles = join(repoRoot, 'reference', 'cladd', 'src', 'styles');
const portedStyles = join(packageRoot, 'src', 'styles');

const hydrated = existsSync(upstreamStyles);

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
  return readdirSync(upstreamStyles).filter((name) => name.endsWith('.css'));
}

test.skipIf(!hydrated)(
  'ports every upstream stylesheet without dropping a file',
  () => {
    const ported = new Set(
      readdirSync(portedStyles).filter((name) => name.endsWith('.css')),
    );

    for (const name of upstreamStylesheets()) {
      expect(ported.has(name), `${name} is missing from src/styles`).toBe(true);
    }
  },
);

test.skipIf(!hydrated)('matches upstream stylesheets line for line', () => {
  for (const name of upstreamStylesheets()) {
    const upstream = normalize(
      readFileSync(join(upstreamStyles, name), 'utf8'),
    );
    const ported = normalize(readFileSync(join(portedStyles, name), 'utf8'));
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
});

test.skipIf(!hydrated)('keeps the cladd namespace on every token', () => {
  for (const name of upstreamStylesheets()) {
    const ported = readFileSync(join(portedStyles, name), 'utf8');
    expect(ported, `${name} still carries a renamed token`).not.toMatch(
      /(?:--)?cui-/u,
    );
  }
});
