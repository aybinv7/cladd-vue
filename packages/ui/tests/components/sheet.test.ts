import { expect, test } from 'vite-plus/test';
import { defineComponent, h, nextTick, ref } from 'vue';

import {
  AlertDialog,
  AlertDialogRoot,
  Drawer,
  Sheet,
} from '../../src/index.ts';
import { mountTree } from '../support/mountTree.ts';

async function settle(): Promise<void> {
  await nextTick();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await nextTick();
}

function cleanup(root: HTMLElement, unmount: () => void): void {
  unmount();
  root.remove();
}

test('contains focus, makes the app inert, and closes a sheet with Escape', async () => {
  const open = ref(true);
  const appContainer = document.createElement('div');
  appContainer.className = 'app-container';
  document.body.append(appContainer);
  const harness = defineComponent({
    setup() {
      return () =>
        h(
          Sheet,
          {
            open: open.value,
            root: false,
            'onUpdate:open': (value: boolean) => (open.value = value),
          },
          {
            default: () =>
              h('button', { 'data-testid': 'sheet-action' }, 'Save'),
            title: () => 'Details',
          },
        );
    },
  });
  const mounted = mountTree(h(harness));
  await settle();

  const dialog = mounted.root.querySelector<HTMLElement>('[role="dialog"]');
  expect(dialog).not.toBeNull();
  expect(appContainer.inert).toBe(true);
  expect(document.activeElement).toBe(
    mounted.root.querySelector('[data-testid="sheet-action"]'),
  );

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  await settle();
  expect(open.value).toBe(false);
  expect(mounted.root.querySelector('[role="dialog"]')).toBeNull();
  expect(appContainer.inert).toBe(false);

  cleanup(mounted.root, () => mounted.app.unmount());
  appContainer.remove();
});

test('uses a bottom panel for Drawer', async () => {
  const mounted = mountTree(
    h(Drawer, { open: true, root: false }, () => 'Drawer content'),
  );
  await settle();

  const panel = mounted.root.querySelector<HTMLElement>('.cladd-sheet');
  expect(panel).not.toBeNull();
  expect(panel?.className).toContain('bottom-0');

  cleanup(mounted.root, () => mounted.app.unmount());
});

test('closes a Drawer after a sufficiently long touch drag', async () => {
  const open = ref(true);
  const harness = defineComponent({
    setup() {
      return () =>
        h(Drawer, {
          open: open.value,
          root: false,
          'onUpdate:open': (value: boolean) => (open.value = value),
        });
    },
  });
  const mounted = mountTree(h(harness));
  await settle();
  const panel = mounted.root.querySelector<HTMLElement>('.cladd-sheet');

  panel?.dispatchEvent(
    new PointerEvent('pointerdown', {
      bubbles: true,
      clientY: 0,
      pointerId: 1,
      pointerType: 'touch',
    }),
  );
  panel?.dispatchEvent(
    new PointerEvent('pointermove', {
      bubbles: true,
      clientY: 120,
      pointerId: 1,
      pointerType: 'touch',
    }),
  );
  panel?.dispatchEvent(
    new PointerEvent('pointerup', {
      bubbles: true,
      clientY: 120,
      pointerId: 1,
      pointerType: 'touch',
    }),
  );
  await settle();

  expect(open.value).toBe(false);
  cleanup(mounted.root, () => mounted.app.unmount());
});

test('renders alert dialogs with alert semantics and focuses cancel first', async () => {
  const mounted = mountTree(
    h(
      AlertDialogRoot,
      { defaultOpen: true },
      {
        default: () =>
          h(AlertDialog, {
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Delete',
            root: false,
            text: 'This action cannot be undone.',
            title: 'Delete project?',
          }),
      },
    ),
  );
  await settle();

  const dialog = mounted.root.querySelector<HTMLElement>(
    '[role="alertdialog"]',
  );
  const cancel = mounted.root.querySelector<HTMLElement>(
    '[data-part="cancel"]',
  );
  expect(dialog).not.toBeNull();
  expect(dialog?.getAttribute('aria-describedby')).toBeTruthy();
  expect(dialog?.getAttribute('aria-labelledby')).toBeTruthy();
  expect(document.activeElement).toBe(cancel);

  cleanup(mounted.root, () => mounted.app.unmount());
});
