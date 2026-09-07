import { expect, test } from 'vite-plus/test';
import { defineComponent, h, nextTick, ref } from 'vue';

import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxRoot,
} from '../../src/index.ts';
import { mountTree } from '../support/mountTree.ts';

async function settle(): Promise<void> {
  await nextTick();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await nextTick();
}

test('keeps focus on input and selects an option through active descendant', async () => {
  const value = ref<string | string[]>('');
  const harness = defineComponent({
    setup() {
      return () =>
        h(
          ComboboxRoot,
          {
            'onUpdate:value': (next: string | string[]) => (value.value = next),
            value: value.value,
          },
          {
            default: () => [
              h(ComboboxInput, { 'data-testid': 'input' }),
              h(ComboboxContent, null, {
                default: () =>
                  h(ComboboxList, null, {
                    default: () => [
                      h(
                        ComboboxItem,
                        { label: 'Algeria', value: 'dz' },
                        () => 'Algeria',
                      ),
                      h(
                        ComboboxItem,
                        { label: 'Tunisia', value: 'tn' },
                        () => 'Tunisia',
                      ),
                    ],
                  }),
              }),
            ],
          },
        );
    },
  });
  const mounted = mountTree(h(harness));
  const input = mounted.root.querySelector<HTMLInputElement>(
    '[data-testid="input"]',
  );
  input?.focus();
  await settle();
  input?.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }),
  );
  input?.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }),
  );
  await settle();
  expect(value.value).toBe('tn');
  expect(document.activeElement).toBe(input);
  mounted.app.unmount();
  mounted.root.remove();
});

test('removes the last multiple selection with Backspace only when query is empty', async () => {
  const value = ref<string[]>(['dz', 'tn']);
  const mounted = mountTree(
    h(
      ComboboxRoot,
      {
        multiple: true,
        'onUpdate:value': (next: string[]) => (value.value = next),
        value: value.value,
      },
      { default: () => h(ComboboxInput, { 'data-testid': 'input' }) },
    ),
  );
  const input = mounted.root.querySelector<HTMLInputElement>(
    '[data-testid="input"]',
  );
  input?.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'Backspace' }),
  );
  await settle();
  expect(value.value).toEqual(['dz']);
  mounted.app.unmount();
  mounted.root.remove();
});

test('waits for IME composition to finish before updating the query', async () => {
  const query = ref('');
  const harness = defineComponent({
    setup() {
      return () =>
        h(
          ComboboxRoot,
          {
            'onUpdate:query': (next: string) => (query.value = next),
            query: query.value,
          },
          { default: () => h(ComboboxInput, { 'data-testid': 'input' }) },
        );
    },
  });
  const mounted = mountTree(h(harness));
  const input = mounted.root.querySelector<HTMLInputElement>(
    '[data-testid="input"]',
  );
  input!.value = 'ت';
  input!.dispatchEvent(
    new CompositionEvent('compositionstart', { bubbles: true }),
  );
  input!.dispatchEvent(new Event('input', { bubbles: true }));
  await settle();
  expect(query.value).toBe('');
  input!.dispatchEvent(
    new CompositionEvent('compositionend', { bubbles: true }),
  );
  await settle();
  expect(query.value).toBe('ت');
  mounted.app.unmount();
  mounted.root.remove();
});
