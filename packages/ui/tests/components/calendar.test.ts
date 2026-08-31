import { expect, test } from 'vite-plus/test';
import { h, nextTick, ref } from 'vue';

import {
  shouldCloseAfterSelect,
  type CalendarValue,
} from '../../src/calendar/calendar.contracts.ts';
import Calendar from '../../src/calendar/Calendar.vue';
import DatePicker from '../../src/calendar/DatePicker.vue';
import { byTestId, click, mountTree } from '../support/mountTree.ts';

function part(root: HTMLElement, name: string): HTMLElement {
  const found = root.querySelector<HTMLElement>(`[data-part="${name}"]`);
  if (!found) throw new Error(`missing [data-part="${name}"]`);
  return found;
}

/**
 * The month grid comes from `@vuepic/vue-datepicker`, which renders nothing under
 * happy-dom, so these cover the wrapper: the container, the accent cascade, the
 * slots and the trigger. The grid itself is the dependency's to test.
 */
test('renders a calendar container without tinting the whole panel', () => {
  const mounted = mountTree(
    h('div', null, [
      h(Calendar, { color: 'cyan', 'data-testid': 'calendar', size: 'lg' }),
      h(Calendar, { 'data-testid': 'disabled', disabled: true }),
    ]),
  );

  const root = byTestId(mounted.root, 'calendar');
  expect(root.className).toContain('cladd-calendar');
  expect(root.getAttribute('data-part')).toBe('calendar');
  expect(root.getAttribute('data-size')).toBe('lg');

  // Upstream colours only the selected and today cells (Calendar.tsx:285), so
  // the accent must not sit on the panel where it would tint the caption,
  // the weekday row and every other day.
  expect(root.className).not.toContain('cladd-color-cyan');

  expect(byTestId(mounted.root, 'disabled').className).toContain(
    'pointer-events-none',
  );
  mounted.app.unmount();
});

test('renders the header and footer slots around the grid', () => {
  const mounted = mountTree(
    h(
      Calendar,
      { 'data-testid': 'calendar' },
      {
        footer: () => 'Pick a day',
        header: () => 'Availability',
      },
    ),
  );

  const root = byTestId(mounted.root, 'calendar');
  expect(part(root, 'header').textContent).toContain('Availability');
  expect(part(root, 'footer').textContent).toContain('Pick a day');
  mounted.app.unmount();
});

test('shows the placeholder until a date picker has a value', () => {
  const chosen = new Date(2026, 0, 15);
  const mounted = mountTree(
    h('div', null, [
      h(DatePicker, { 'data-testid': 'empty', placeholder: 'Select date' }),
      h(DatePicker, { 'data-testid': 'filled', modelValue: chosen }),
    ]),
  );

  expect(
    part(byTestId(mounted.root, 'empty'), 'value').textContent?.trim(),
  ).toBe('Select date');
  expect(
    part(byTestId(mounted.root, 'filled'), 'value').textContent?.trim(),
  ).toBe(chosen.toLocaleDateString());
  mounted.app.unmount();
});

test('formats a range value as a from-to label', () => {
  const from = new Date(2026, 0, 5);
  const to = new Date(2026, 0, 9);
  const mounted = mountTree(
    h(DatePicker, {
      'data-testid': 'picker',
      modelValue: { from, to },
      mode: 'range',
    }),
  );

  const label = part(byTestId(mounted.root, 'picker'), 'value').textContent;
  expect(label).toContain(from.toLocaleDateString());
  expect(label).toContain(to.toLocaleDateString());
  mounted.app.unmount();
});

test('renders the calendar glyph and dropdown indicator on the trigger', async () => {
  const mounted = mountTree(h(DatePicker, { 'data-testid': 'picker' }));
  await nextTick();

  const root = byTestId(mounted.root, 'picker');
  expect(part(root, 'icon').querySelector('svg')).not.toBeNull();
  expect(root.querySelector('[data-part="dropdown-icon"]')).not.toBeNull();
  mounted.app.unmount();
});

test('closes the popover after a single-mode pick, not in multiple or range', () => {
  // Upstream closes only in single mode and only when the caller hasn't opted
  // out (DatePicker.tsx:206-209). The real decision is exercised here rather
  // than through a pointer click on the grid, which the dependency does not
  // render under happy-dom (see the note above).
  expect(shouldCloseAfterSelect('single', true)).toBe(true);
  expect(shouldCloseAfterSelect('single', false)).toBe(false);
  expect(shouldCloseAfterSelect('multiple', true)).toBe(false);
  expect(shouldCloseAfterSelect('range', true)).toBe(false);
});

async function settleOverlay(): Promise<void> {
  await nextTick();
  await new Promise((resolve) =>
    requestAnimationFrame(() => resolve(undefined)),
  );
  await nextTick();
}

test('keeps the popover open when closeOnSelect is set to false', async () => {
  const mounted = mountTree(
    h(DatePicker, { closeOnSelect: false, 'data-testid': 'picker' }),
  );
  document.body.append(mounted.root);

  await click(byTestId(mounted.root, 'picker'));
  await settleOverlay();

  expect(document.body.querySelector('[data-part="content"]')).not.toBeNull();
  mounted.app.unmount();
  mounted.root.remove();
});

test('reshapes a stale value when mode changes, instead of crashing', async () => {
  // A bare Date fed in while `mode` is `'multiple'` is what the dependency
  // rejects outright: "You need to use array as model-value binding in order
  // to support multi-dates". A consumer switching modes without also
  // resetting the bound value is the expected case, not an edge case.
  const value = ref<CalendarValue>(new Date(2026, 0, 15));
  const mode = ref<'multiple' | 'range' | 'single'>('single');
  const mounted = mountTree(
    h(Calendar, {
      'data-testid': 'calendar',
      mode: mode.value,
      modelValue: value.value,
      'onUpdate:modelValue': (next?: CalendarValue) => (value.value = next),
    }),
  );

  expect(() => {
    mode.value = 'multiple';
  }).not.toThrow();

  mounted.app.unmount();
});
