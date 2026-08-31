import { readFileSync } from 'node:fs';

import { expect, test } from 'vite-plus/test';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

test('publishes correct exports and tree-shakeable entry', () => {
  expect(pkg.exports['.'].import).toBe('./dist/index.mjs');
  expect(pkg.exports['./css']).toBe('./src/cladd.css');
  expect(pkg.exports['./calendar'].import).toBe('./dist/calendar/index.mjs');
  expect(pkg.sideEffects).toContain('./src/cladd.css');
  expect(pkg.peerDependencies.vue).toBeTruthy();
  expect(pkg.dependencies.vue).toBeUndefined();
});

test('exposes only public subpaths', () => {
  const allowed = new Set(['.', './calendar', './css', './package.json']);
  Object.keys(pkg.exports).forEach((key) => {
    expect(allowed.has(key)).toBe(true);
  });
});
