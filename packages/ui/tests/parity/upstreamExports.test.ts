import { existsSync, readdirSync } from 'node:fs';
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

/**
 * Reviewed Cladd extensions — new families that do not exist upstream but are
 * built from Cladd tokens, surfaces, density, and motion. Every entry must have
 * a matching `docs/extensions/<name>.md` specification. An extra export that is
 * neither upstream nor in this set fails the test below, and a name in this
 * set without a spec also fails.
 */
const reviewedExtensions = new Set<string>([
  'Field',
  'FieldDescription',
  'FieldError',
  'FieldGroup',
  'FieldLabel',
  'FieldLegend',
  'FieldSet',
  'InputGroup',
  'InputGroupAddon',
  'InputGroupButton',
  'InputGroupInput',
  'InputGroupTextarea',
]);

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
    .filter((name) => !reviewedExtensions.has(name))
    .sort();

  expect(extra, 'public exports with no upstream counterpart').toEqual([]);
});

test('every reviewed extension has a specification', () => {
  const missing = [...reviewedExtensions]
    .filter(
      (name) =>
        !existsSync(join(packageRoot, 'docs', 'extensions', `${name}.md`)),
    )
    .sort();

  expect(
    missing,
    'reviewed extensions missing docs/extensions/*.md spec',
  ).toEqual([]);
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
 * not a decision. Empty, and it should stay that way.
 */
const typesNotYetPorted = new Set<string>();

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

/**
 * Reviewed extension type exports — mirrors `reviewedExtensions` for type-only
 * names. Empty until a reviewed extension ships type exports.
 */
const reviewedExtensionTypeExports = new Set<string>([
  'FieldDefaultProps',
  'FieldDensity',
  'FieldDescriptionDefaultProps',
  'FieldDescriptionProps',
  'FieldErrorDefaultProps',
  'FieldErrorProps',
  'FieldGroupDefaultProps',
  'FieldGroupProps',
  'FieldLabelDefaultProps',
  'FieldLabelProps',
  'FieldLegendDefaultProps',
  'FieldLegendProps',
  'FieldOrientation',
  'FieldProps',
  'FieldSetDefaultProps',
  'FieldSetProps',
  'InputGroupAddonDefaultProps',
  'InputGroupAddonProps',
  'InputGroupAddonSide',
  'InputGroupButtonDefaultProps',
  'InputGroupButtonProps',
  'InputGroupDefaultProps',
  'InputGroupInputDefaultProps',
  'InputGroupInputProps',
  'InputGroupProps',
  'InputGroupTextareaDefaultProps',
  'InputGroupTextareaProps',
]);

test.skipIf(!upstreamHydrated)(
  'exports nothing type-side upstream does not',
  () => {
    const upstream = typeExports(join(upstreamRoot, 'src', 'index.ts'));
    const port = typeExports(join(packageRoot, 'src', 'index.ts'));

    const extra = [...port]
      .filter((name) => !upstream.has(name))
      .filter((name) => !allowedExtraTypeExports.has(name))
      .filter((name) => !reviewedExtensionTypeExports.has(name))
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

test('every public component family has an auditable port manifest', () => {
  const portDir = join(packageRoot, 'docs', 'port');
  const manifests = new Set(
    readdirSync(portDir).map((file) => file.replace(/\.md$/u, '')),
  );

  const publicFamilies = [
    'Accordion',
    'Backdrop',
    'Button',
    'Calendar',
    'Checkbox',
    'Chip',
    'CladdProvider',
    'CollapsibleRoot',
    'ColorEditor',
    'ColorPicker',
    'Dialog',
    'FocusRing',
    'Icons',
    'Input',
    'Link',
    'List',
    'ListButton',
    'ListItem',
    'ListSeparator',
    'ListTitle',
    'NumberField',
    'NumberScrubber',
    'OTPField',
    'Popover',
    'Popup',
    'Radio',
    'SearchField',
    'SectionTitle',
    'Segmented',
    'Select',
    'Shortcut',
    'Slider',
    'Spinner',
    'Surface',
    'SurfaceCut',
    'Switch',
    'Tabs',
    'Textarea',
    'Toast',
    'ToggleGroup',
    'Toolbar',
    'Tooltip',
  ];

  const missing = publicFamilies.filter((family) => !manifests.has(family));
  expect(
    missing,
    'public component families missing docs/port/*.md manifest',
  ).toEqual([]);
});
