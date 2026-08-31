import { expect, test } from 'vite-plus/test';
import { createApp, defineComponent, h, nextTick, ref, shallowRef } from 'vue';

import { useOverlayDismiss } from '../../src/composables/useOverlayDismiss.ts';
import { useOverlayLifecycle } from '../../src/composables/useOverlayLifecycle.ts';
import type { OverlayPhase } from '../../src/foundations/contracts.ts';
import { byTestId, type MountedTree } from '../support/mountTree.ts';

async function settle(): Promise<void> {
  await nextTick();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await nextTick();
}

function mountConnected(vnode: ReturnType<typeof h>): MountedTree {
  const root = document.createElement('div');
  document.body.append(root);
  const app = createApp({ render: () => vnode });
  app.mount(root);
  return { app, root };
}

test('emits closed exactly once when unmounted while closing', async () => {
  const phase = ref<OverlayPhase>('opening');
  const events: string[] = [];
  const harness = defineComponent({
    setup() {
      const element = shallowRef<HTMLElement>();

      useOverlayLifecycle({
        element,
        onClose: () => events.push('closing'),
        onClosed: () => events.push('closed'),
        onOpen: () => events.push('opening'),
        onOpened: () => events.push('opened'),
        phase,
        setPhase: (next) => {
          phase.value = next;
        },
      });

      return () => h('div', { ref: element, 'data-testid': 'overlay' });
    },
  });
  const mounted = mountConnected(h(harness));

  await settle();
  expect(events).toContain('opened');

  phase.value = 'closing';
  await nextTick();
  mounted.app.unmount();
  await nextTick();

  expect(events.filter((event) => event === 'closing')).toHaveLength(1);
  expect(events.filter((event) => event === 'closed')).toHaveLength(1);
  expect(phase.value).toBe('closed');
  mounted.root.remove();
});

test('removes escape handling and pending callbacks on unmount', async () => {
  const phase = ref<OverlayPhase>('opening');
  const events: string[] = [];
  const harness = defineComponent({
    setup() {
      const element = shallowRef<HTMLElement>();

      useOverlayLifecycle({
        element,
        onClose: () => events.push('closing'),
        onOpen: () => events.push('opening'),
        phase,
        setPhase: (next) => {
          phase.value = next;
        },
      });

      return () => h('div', { ref: element });
    },
  });
  const mounted = mountConnected(h(harness));

  mounted.app.unmount();
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  await settle();

  expect(events).toEqual([]);
  expect(phase.value).toBe('opening');
  mounted.root.remove();
});

test('does not dismiss a drag that starts inside the overlay', async () => {
  const opened = ref(true);
  let closes = 0;
  const harness = defineComponent({
    setup() {
      const container = shallowRef<HTMLElement>();

      useOverlayDismiss({
        closeOnOutsideClick: () => true,
        container,
        onClose: () => {
          closes += 1;
        },
        opened,
      });

      return () =>
        h('div', { ref: container, 'data-testid': 'overlay' }, 'overlay');
    },
  });
  const mounted = mountConnected(h(harness));
  const overlay = byTestId(mounted.root, 'overlay');
  const outside = document.createElement('button');
  document.body.append(outside);
  await nextTick();

  overlay.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
  outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  expect(closes).toBe(0);

  outside.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
  outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  expect(closes).toBe(1);
  mounted.app.unmount();
  mounted.root.remove();
  outside.remove();
});
