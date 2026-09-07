import { expect, test } from 'vite-plus/test';
import { defineComponent, h, nextTick, ref } from 'vue';

import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRoot,
  ContextMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../src/index.ts';
import { click, mountTree } from '../support/mountTree.ts';

async function settleMenu(): Promise<void> {
  await nextTick();
  await new Promise((resolve) =>
    requestAnimationFrame(() => resolve(undefined)),
  );
  await nextTick();
}

function cleanup(root: HTMLElement, unmount: () => void): void {
  unmount();
  root.remove();
}

test('opens a dropdown, roves focus, and restores focus after Escape', async () => {
  const selected = ref<string[]>([]);
  const harness = defineComponent({
    setup() {
      return () =>
        h(DropdownMenuRoot, null, {
          default: () => [
            h(
              DropdownMenuTrigger,
              { 'data-testid': 'trigger' },
              () => 'Actions',
            ),
            h(DropdownMenuContent, null, {
              default: () => [
                h(
                  DropdownMenuItem,
                  { onSelect: () => selected.value.push('copy') },
                  () => 'Copy',
                ),
                h(DropdownMenuItem, null, () => 'Paste'),
              ],
            }),
          ],
        });
    },
  });
  const mounted = mountTree(h(harness));
  const trigger = mounted.root.querySelector<HTMLElement>(
    '[data-testid="trigger"]',
  );

  expect(trigger).not.toBeNull();
  if (trigger) await click(trigger);
  await settleMenu();

  const menu = document.body.querySelector<HTMLElement>('[role="menu"]');
  const items = document.body.querySelectorAll<HTMLElement>('[data-menu-item]');
  expect(menu).not.toBeNull();
  expect(items).toHaveLength(2);
  expect(document.activeElement).toBe(items[0]);

  items[0]?.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }),
  );
  await nextTick();
  expect(document.activeElement).toBe(items[1]);

  items[1]?.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }),
  );
  await settleMenu();
  expect(document.body.querySelector('[role="menu"]')).toBeNull();
  expect(document.activeElement).toBe(trigger);
  expect(selected.value).toEqual([]);

  cleanup(mounted.root, () => mounted.app.unmount());
});

test('updates checkbox items without closing their parent menu', async () => {
  const checked = ref(false);
  const harness = defineComponent({
    setup() {
      return () =>
        h(
          DropdownMenuRoot,
          { defaultOpen: true },
          {
            default: () =>
              h(DropdownMenuContent, null, {
                default: () =>
                  h(
                    DropdownMenuCheckboxItem,
                    {
                      checked: checked.value,
                      'onUpdate:checked': (value: boolean) =>
                        (checked.value = value),
                    },
                    () => 'Show hidden files',
                  ),
              }),
          },
        );
    },
  });
  const mounted = mountTree(h(harness));
  await settleMenu();
  const item = document.body.querySelector<HTMLElement>(
    '[role="menuitemcheckbox"]',
  );

  expect(item?.getAttribute('aria-checked')).toBe('false');
  if (item) await click(item);
  await nextTick();
  expect(checked.value).toBe(true);
  expect(item?.getAttribute('aria-checked')).toBe('true');
  expect(document.body.querySelector('[role="menu"]')).not.toBeNull();

  cleanup(mounted.root, () => mounted.app.unmount());
});

test('opens a submenu from the keyboard and closes it with Left', async () => {
  const harness = defineComponent({
    setup() {
      return () =>
        h(
          DropdownMenuRoot,
          { defaultOpen: true },
          {
            default: () =>
              h(DropdownMenuContent, null, {
                default: () =>
                  h(DropdownMenuSub, null, {
                    default: () => [
                      h(DropdownMenuSubTrigger, null, () => 'More'),
                      h(DropdownMenuSubContent, null, {
                        default: () =>
                          h(DropdownMenuItem, null, () => 'Archive'),
                      }),
                    ],
                  }),
              }),
          },
        );
    },
  });
  const mounted = mountTree(h(harness));
  await settleMenu();
  const trigger = document.body.querySelector<HTMLElement>(
    '[data-menu-sub-trigger]',
  );

  trigger?.focus();
  trigger?.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }),
  );
  await settleMenu();
  expect(
    document.body.querySelector('[data-slot="menu-sub-content"]'),
  ).not.toBeNull();

  const item =
    document.body.querySelectorAll<HTMLElement>('[data-menu-item]')[1];
  item?.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowLeft' }),
  );
  await settleMenu();
  expect(
    document.body.querySelector('[data-slot="menu-sub-content"]'),
  ).toBeNull();
  expect(document.activeElement).toBe(trigger);

  cleanup(mounted.root, () => mounted.app.unmount());
});

test('opens a context menu at the pointer and supports the platform keyboard command', async () => {
  const harness = defineComponent({
    setup() {
      return () =>
        h(ContextMenuRoot, null, {
          default: () => [
            h(
              ContextMenuTrigger,
              { 'data-testid': 'context-trigger' },
              () => 'File',
            ),
            h(ContextMenuContent, null, {
              default: () => h(ContextMenuItem, null, () => 'Rename'),
            }),
          ],
        });
    },
  });
  const mounted = mountTree(h(harness));
  const trigger = mounted.root.querySelector<HTMLElement>(
    '[data-testid="context-trigger"]',
  );

  trigger?.dispatchEvent(
    new MouseEvent('contextmenu', { bubbles: true, clientX: 32, clientY: 48 }),
  );
  await settleMenu();
  expect(
    document.body.querySelector('[data-slot="context-menu-content"]'),
  ).not.toBeNull();

  const item = document.body.querySelector<HTMLElement>('[data-menu-item]');
  item?.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }),
  );
  await settleMenu();
  expect(
    document.body.querySelector('[data-slot="context-menu-content"]'),
  ).toBeNull();

  trigger?.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, key: 'ContextMenu' }),
  );
  await settleMenu();
  expect(
    document.body.querySelector('[data-slot="context-menu-content"]'),
  ).not.toBeNull();

  cleanup(mounted.root, () => mounted.app.unmount());
});
