import { expect, test } from 'vite-plus/test';
import { defineComponent, h, nextTick, ref } from 'vue';

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandRoot,
} from '../../src/index.ts';
import { byTestId, click, mountTree } from '../support/mountTree.ts';

async function settle(): Promise<void> {
  await nextTick();
  await nextTick();
}

test('filters items, exposes active descendant, and selects with Enter', async () => {
  const selected = ref<string | undefined>();
  const harness = defineComponent({
    setup() {
      return () =>
        h(CommandRoot, null, {
          default: () => [
            h(CommandInput, { 'data-testid': 'input' }),
            h(CommandList, null, {
              default: () => [
                h(
                  CommandItem,
                  {
                    onSelect: (value: string) => (selected.value = value),
                    value: 'Open project',
                  },
                  () => 'Open project',
                ),
                h(CommandItem, { value: 'Close window' }, () => 'Close window'),
              ],
            }),
            h(CommandEmpty, null, () => 'No commands'),
          ],
        });
    },
  });
  const mounted = mountTree(h(harness));
  await settle();
  const input = mounted.root.querySelector<HTMLInputElement>(
    '[data-testid="input"]',
  );

  input!.value = 'open';
  input!.dispatchEvent(new Event('input', { bubbles: true }));
  await settle();
  expect(mounted.root.querySelectorAll('[data-command-item]')).toHaveLength(1);
  expect(input?.getAttribute('aria-activedescendant')).toBeTruthy();

  input?.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }),
  );
  await settle();
  expect(selected.value).toBe('Open project');

  input!.value = 'missing';
  input!.dispatchEvent(new Event('input', { bubbles: true }));
  await settle();
  expect(mounted.root.textContent).toContain('No commands');

  mounted.app.unmount();
  mounted.root.remove();
});

test('CommandDialog restores trigger focus and preserves controlled query on close', async () => {
  const open = ref(false);
  const query = ref('');
  const harness = defineComponent({
    setup() {
      return () =>
        h(
          CommandDialog,
          {
            'onUpdate:open': (value?: boolean) => (open.value = value ?? false),
            'onUpdate:query': (value: string) => (query.value = value),
            open: open.value,
            query: query.value,
          },
          {
            default: () => [
              h(CommandInput, { 'data-testid': 'command-input' }),
              h(CommandList, null, {
                default: () =>
                  h(
                    CommandItem,
                    { value: 'Open project' },
                    () => 'Open project',
                  ),
              }),
            ],
            trigger: () =>
              h(
                'button',
                { 'data-testid': 'command-trigger' },
                'Open commands',
              ),
          },
        );
    },
  });
  const mounted = mountTree(h(harness));
  const trigger = byTestId(mounted.root, 'command-trigger');
  trigger.focus();
  await click(trigger);
  await settle();
  expect(open.value).toBe(true);

  const input = byTestId(mounted.root, 'command-input') as HTMLInputElement;
  input!.value = 'open';
  input!.dispatchEvent(new Event('input', { bubbles: true }));
  await settle();
  expect(query.value).toBe('open');

  document.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }),
  );
  await settle();
  expect(open.value).toBe(false);
  expect(document.activeElement).toBe(trigger);
  expect(query.value).toBe('open');

  mounted.app.unmount();
  mounted.root.remove();
});

test('skips disabled items while keyboard navigation wraps', async () => {
  const mounted = mountTree(
    h(CommandRoot, null, {
      default: () => [
        h(CommandInput, { 'data-testid': 'input' }),
        h(CommandList, null, {
          default: () => [
            h(
              CommandItem,
              { disabled: true, value: 'Disabled' },
              () => 'Disabled',
            ),
            h(CommandItem, { value: 'Available' }, () => 'Available'),
          ],
        }),
      ],
    }),
  );
  await settle();
  const input = mounted.root.querySelector<HTMLInputElement>(
    '[data-testid="input"]',
  );

  input?.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }),
  );
  await settle();
  const activeId = input?.getAttribute('aria-activedescendant');
  expect(mounted.root.querySelector(`#${activeId}`)?.textContent).toContain(
    'Available',
  );

  mounted.app.unmount();
  mounted.root.remove();
});
