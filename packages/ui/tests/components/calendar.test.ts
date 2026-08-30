import { expect, test } from 'vite-plus/test';
import { h, nextTick } from 'vue';

import Calendar from '../../src/calendar/Calendar.vue';
import DatePicker from '../../src/calendar/DatePicker.vue';
import { byTestId, mountTree } from '../support/mountTree.ts';

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
test('renders a calendar container carrying the accent class', () => {
  const mounted = mountTree(
    h('div', null, [
      h(Calendar, { color: 'cyan', 'data-testid': 'calendar' }),
      h(Calendar, { 'data-testid': 'disabled', disabled: true }),
    ]),
  );

  const root = byTestId(mounted.root, 'calendar');
  expect(root.className).toContain('cladd-calendar');
  expect(root.className).toContain('cladd-color-cyan');
  expect(root.getAttribute('data-part')).toBe('calendar');

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
