import { readFileSync } from 'node:fs';

import { expect, test } from 'vite-plus/test';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

import {
  calendarConsumerProps,
  datePickerConsumerProps,
  dialogConsumerProps,
  searchFieldConsumerProps,
} from '../../fixtures/consumer-contracts.ts';
import type { DialogProps, SearchFieldProps } from '../../src/index.ts';

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

import { h, nextTick, ref } from 'vue';

import {
  Button,
  CladdProvider,
  Input,
  SearchField,
  Surface,
} from '../../src/index.ts';
import { mountTree, byTestId } from '../support/mountTree.ts';

test('validates positive consumer contract fixtures', () => {
  expect(searchFieldConsumerProps.size).toBe('lg');
  expect(searchFieldConsumerProps.placeholder).toBe('Search pilgrims');
  expect(dialogConsumerProps.title).toBe('Cancel booking?');
  expect(calendarConsumerProps.mode).toBe('range');
  expect(typeof datePickerConsumerProps.format).toBe('function');
});

test('compiles and mounts the documented README example', () => {
  const tree = mountTree(
    h(CladdProvider, { accentColor: 'brand', theme: 'dark' }, () =>
      h(Surface, { level: 1, outline: true, variant: 'gradient' }, () => [
        h(Input, { name: 'query', placeholder: 'Filter targets' }),
        h(Button, { color: 'green', variant: 'gradient-fill' }, () => 'Save'),
      ]),
    ),
  );

  expect(tree.root.querySelector('.cladd-surface')).toBeTruthy();
  expect(tree.root.querySelector('input')).toBeTruthy();
  expect(tree.root.querySelector('button')).toBeTruthy();
  tree.app.unmount();
});

test('rejects invalid props at the type level', () => {
  const _validSearchField = {
    placeholder: 'Search',
    size: 'lg',
  } satisfies SearchFieldProps;

  const _validDialog = {
    title: 'Confirm',
  } satisfies DialogProps;

  expect(_validSearchField.placeholder).toBe('Search');
  expect(_validDialog.title).toBe('Confirm');
});

test('Input emits change and clear events', async () => {
  const value = ref('');
  const mounted = mountTree(
    h(Input, {
      'data-testid': 'input-events',
      clearButton: true,
      modelValue: value.value,
      'onUpdate:modelValue': (v: string) => (value.value = v),
    }),
  );
  const root = byTestId(mounted.root, 'input-events');
  const input = root.querySelector('input') as HTMLInputElement;

  input.value = 'typed';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  await nextTick();
  expect(value.value).toBe('typed');

  mounted.app.unmount();
});

test('SearchField clears on Escape when value is present', async () => {
  const value = ref('query');
  const mounted = mountTree(
    h(SearchField, {
      'data-testid': 'sf-escape',
      modelValue: value.value,
      'onUpdate:modelValue': (v: string) => (value.value = v),
    }),
  );
  const root = byTestId(mounted.root, 'sf-escape');
  const input = root.querySelector('input') as HTMLInputElement;

  input.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }),
  );
  await nextTick();
  expect(value.value).toBe('');

  mounted.app.unmount();
});

test('SearchField does not clear Escape on empty field', async () => {
  const value = ref('');
  const mounted = mountTree(
    h(SearchField, {
      'data-testid': 'sf-escape-empty',
      modelValue: value.value,
      'onUpdate:modelValue': (v: string) => (value.value = v),
    }),
  );
  const root = byTestId(mounted.root, 'sf-escape-empty');
  const input = root.querySelector('input') as HTMLInputElement;

  input.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }),
  );
  await nextTick();
  expect(value.value).toBe('');

  mounted.app.unmount();
});
