import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vite-plus/test';

import {
  packageRoot,
  upstreamHydrated,
  upstreamRoot,
} from '../support/paths.ts';

/**
 * Subpaths upstream publishes that the port does not. A queue, not a decision.
 *
 * `./calendar` wraps `react-day-picker`: upstream owns the styling and the DOM,
 * the library owns the month grid, selection modes and keyboard navigation.
 * There is no verbatim Vue port of that, so this needs a call on what to depend
 * on before any code is written. See plans/upstream-parity-realignment.md.
 */
const subpathsNotYetPorted = new Set(['./calendar']);

function exportKeys(packageJsonPath: string): Set<string> {
  const manifest = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
    exports?: Record<string, unknown>;
  };
  return new Set(Object.keys(manifest.exports ?? {}));
}

test.skipIf(!upstreamHydrated)('publishes every upstream subpath', () => {
  const upstream = exportKeys(join(upstreamRoot, 'src', 'package.json'));
  const port = exportKeys(join(packageRoot, 'package.json'));

  const missing = [...upstream]
    .filter((key) => !port.has(key))
    .filter((key) => !subpathsNotYetPorted.has(key))
    .sort();

  expect(missing, 'upstream export subpaths with no counterpart').toEqual([]);
});

test.skipIf(!upstreamHydrated)('keeps the subpath queue honest', () => {
  const upstream = exportKeys(join(upstreamRoot, 'src', 'package.json'));
  const port = exportKeys(join(packageRoot, 'package.json'));

  const done = [...subpathsNotYetPorted].filter((key) => port.has(key)).sort();
  expect(done, 'these ship now and should leave the queue').toEqual([]);

  const stale = [...subpathsNotYetPorted]
    .filter((key) => !upstream.has(key))
    .sort();
  expect(stale, 'these are not upstream subpaths at all').toEqual([]);
});
