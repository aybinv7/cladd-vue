import { join } from 'node:path';

import { expect, test } from 'vite-plus/test';

import {
  packageRoot,
  upstreamHydrated,
  upstreamRoot,
} from '../support/paths.ts';
import { typeExports, valueExports } from '../support/upstream.ts';

/**
 * Upstream exports the port does not implement yet. Every entry is work, not a
 * decision: shrink this list, never grow it. Adding a name here without porting
 * the component is how a gap becomes permanent.
 */
const notYetPorted = new Set<string>();

/**
 * Names the port exports that upstream does not. This must stay empty: the
 * package reproduces upstream's public surface, so anything extra is either an
 * invention or an internal that leaked into `src/index.ts`.
 */
const allowedExtraExports = new Set<string>();

function upstreamExports(): Set<string> {
  return valueExports(join(upstreamRoot, 'src', 'index.ts'));
}

function portExports(): Set<string> {
  return valueExports(join(packageRoot, 'src', 'index.ts'));
}

test.skipIf(!upstreamHydrated)('exports every upstream value', () => {
  const missing = [...upstreamExports()]
    .filter((name) => !portExports().has(name))
    .filter((name) => !notYetPorted.has(name))
    .sort();

  expect(missing, 'upstream exports with no counterpart in the port').toEqual(
    [],
  );
});

test.skipIf(!upstreamHydrated)('exports nothing upstream does not', () => {
  const extra = [...portExports()]
    .filter((name) => !upstreamExports().has(name))
    .filter((name) => !allowedExtraExports.has(name))
    .sort();

  expect(extra, 'public exports with no upstream counterpart').toEqual([]);
});

test.skipIf(!upstreamHydrated)('keeps the not-yet-ported list honest', () => {
  const alreadyPorted = [...notYetPorted]
    .filter((name) => portExports().has(name))
    .sort();

  expect(
    alreadyPorted,
    'these are exported now and should leave the not-yet-ported list',
  ).toEqual([]);

  const stale = [...notYetPorted]
    .filter((name) => !upstreamExports().has(name))
    .sort();

  expect(stale, 'these are not upstream exports at all').toEqual([]);
});

/**
 * Type exports the port does not ship yet. Same rule as `notYetPorted`: a queue,
 * not a decision. Each of these is a props interface declared inline in its
 * `.vue` via `defineProps<{...}>()` rather than in a contracts file, so there is
 * nothing to re-export. Lifting one into its contracts file removes it here.
 */
const typesNotYetPorted = new Set([
  'AccordionIndicatorProps',
  'AccordionIndicatorState',
  'AccordionPanelDefaultProps',
  'AccordionPanelProps',
  'AccordionTriggerProps',
  'BackdropDefaultProps',
  'BackdropProps',
  'CladdProviderProps',
  'CollapsibleTriggerProps',
  'DialogCloseProps',
  'DialogRootProps',
  'DialogTriggerProps',
  'ListItemProps',
  'ListProps',
  'ListSeparatorProps',
  'ListTitleProps',
  'PopoverCloseProps',
  'PopoverRootProps',
  'PopoverTriggerProps',
  'PopupCloseProps',
  'PopupRootProps',
  'PopupTriggerProps',
  'SectionTitleProps',
  'TabsListProps',
  'ToastCloseProps',
  'ToastRootProps',
  'ToastTriggerProps',
  'ToggleButtonProps',
  'ToolbarButtonProps',
  'ToolbarSeparatorDefaultProps',
  'ToolbarSeparatorProps',
]);

/**
 * Type exports the port ships that upstream does not. Every one is debt, listed
 * in plans/upstream-parity-realignment.md. Do not add without a plan entry.
 */
const allowedExtraTypeExports = new Set([
  // Vue-side surfaces with no upstream counterpart. A Vue consumer needs these
  // to type `v-model` bindings and slot props; React's inference covers the
  // same ground without a named export.
  'DialogApi',
  'SelectOption',
  'SelectOptionInput',
  'SelectOptionParams',
  'SelectValue',
]);

test.skipIf(!upstreamHydrated)(
  'exports nothing type-side upstream does not',
  () => {
    const upstream = typeExports(join(upstreamRoot, 'src', 'index.ts'));
    const port = typeExports(join(packageRoot, 'src', 'index.ts'));

    const extra = [...port]
      .filter((name) => !upstream.has(name))
      .filter((name) => !allowedExtraTypeExports.has(name))
      .sort();

    expect(extra, 'public type exports with no upstream counterpart').toEqual(
      [],
    );
  },
);

test.skipIf(!upstreamHydrated)('exports every upstream type', () => {
  const upstream = typeExports(join(upstreamRoot, 'src', 'index.ts'));
  const port = typeExports(join(packageRoot, 'src', 'index.ts'));

  const missing = [...upstream]
    .filter((name) => !port.has(name))
    .filter((name) => !typesNotYetPorted.has(name))
    .sort();

  expect(missing, 'upstream type exports with no counterpart').toEqual([]);
});

test.skipIf(!upstreamHydrated)('keeps the type-export queue honest', () => {
  const port = typeExports(join(packageRoot, 'src', 'index.ts'));
  const done = [...typesNotYetPorted].filter((name) => port.has(name)).sort();

  expect(done, 'these are exported now and should leave the queue').toEqual([]);
});
