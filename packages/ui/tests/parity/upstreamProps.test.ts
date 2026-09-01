import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vite-plus/test';

import {
  packageRoot,
  upstreamHydrated,
  upstreamPath,
} from '../support/paths.ts';
import {
  interfaceProps,
  propsContracts,
  typeAliasProps,
} from '../support/upstream.ts';

/**
 * React-only props. None of these survive a Vue port: `children` becomes the
 * default slot, `className` and `style` arrive as attributes, `ref` becomes a
 * template ref, and every `onX` becomes an emit.
 */
const REACT_ONLY = new Set(['children', 'className', 'ref', 'style', 'key']);

/**
 * Upstream props whose Vue equivalent is not a prop, with what it became.
 * These are transpositions, not gaps.
 *
 * A few entries read "union member": upstream declares `value`, `defaultValue`,
 * `gradient` and `multiple` on the discriminated members of a `type` union
 * (`SolidColorEditorProps | GradientColorEditorProps`) rather than on the shared
 * `*BaseProps` interface. This reader only walks interfaces, so it cannot see
 * them. They are upstream props, not inventions.
 */
const transposed: Record<string, Record<string, string>> = {
  CheckboxProps: { id: 'extra: native id, forwarded as the inputId fallback' },
  DialogProps: {
    open: 'v-model:open',
    'aria-label': 'Vue normalises hyphenated attrs onto camelCase props',
    'aria-labelledby': 'Vue normalises hyphenated attrs onto camelCase props',
    'aria-describedby': 'Vue normalises hyphenated attrs onto camelCase props',
    ariaLabel: 'extra: the Vue camelCase spelling of aria-label',
    ariaLabelledby: 'extra: the Vue camelCase spelling of aria-labelledby',
    ariaDescribedby: 'extra: the Vue camelCase spelling of aria-describedby',
    buttons: 'the actions slot',
    backdropTransparent: 'extra: forwarded to Backdrop',
    color: 'extra: declared explicitly instead of via native props',
  },
  InputProps: {
    value: 'v-model',
    icon: 'the icon slot',
    prefix: 'the prefix slot',
    suffix: 'the suffix slot',
    inputRef: 'a template ref; the element is exposed as inputElement',
    displayValue: 'the displayValue slot',
    inputComponentProps: 'inputProps',
    inputProps: 'extra: the Vue spelling of inputComponentProps',
    bgClassName:
      'extra: inherited from SurfaceCutProps via InputProps & Omit<SurfaceCutProps,…>',
    clickable:
      'extra: inherited from SurfaceCutProps via InputProps & Omit<SurfaceCutProps,…>',
    hoverable:
      'extra: inherited from SurfaceCutProps via InputProps & Omit<SurfaceCutProps,…>',
    outline:
      'extra: inherited from SurfaceCutProps via InputProps & Omit<SurfaceCutProps,…>',
    overlayClassName:
      'extra: inherited from SurfaceCutProps via InputProps & Omit<SurfaceCutProps,…>',
    overlayPosition:
      'extra: inherited from SurfaceCutProps via InputProps & Omit<SurfaceCutProps,…>',
    pressed:
      'extra: inherited from SurfaceCutProps via InputProps & Omit<SurfaceCutProps,…>',
    wrapContent:
      'extra: inherited from SurfaceCutProps via InputProps & Omit<SurfaceCutProps,…>',
  },
  ListButtonProps: {
    icon: 'the icon slot',
    after: 'the after slot',
    clickable:
      'extra: inherited from ButtonProps via ListButtonProps & Omit<ButtonProps,…>',
    focusable:
      'extra: inherited from ButtonProps via ListButtonProps & Omit<ButtonProps,…>',
    hoverable:
      'extra: inherited from ButtonProps via ListButtonProps & Omit<ButtonProps,…>',
    loading:
      'extra: inherited from ButtonProps via ListButtonProps & Omit<ButtonProps,…>',
    pressed:
      'extra: inherited from ButtonProps via ListButtonProps & Omit<ButtonProps,…>',
    surfaceLevel:
      'extra: inherited from ButtonProps via ListButtonProps & Omit<ButtonProps,…>',
    tightFocusRing:
      'extra: inherited from ButtonProps via ListButtonProps & Omit<ButtonProps,…>',
  },
  ColorEditorProps: {
    header: 'the header slot',
    footer: 'the footer slot',
    defaultValue: 'union member',
    gradient: 'union member',
  },
  ColorPickerProps: {
    header: 'the header slot',
    footer: 'the footer slot',
    icon: 'the icon slot',
    anchorRef: 'anchorElement',
    anchorElement: 'extra: the Vue spelling of anchorRef',
    popoverState: 'v-model:popoverOpen',
    defaultValue: 'union member',
    gradient: 'union member',
    as: 'extra: inherited from ButtonProps via ColorPickerProps & Omit<ButtonProps,…>',
    clickable:
      'extra: inherited from ButtonProps via ColorPickerProps & Omit<ButtonProps,…>',
    focusable:
      'extra: inherited from ButtonProps via ColorPickerProps & Omit<ButtonProps,…>',
    hoverable:
      'extra: inherited from ButtonProps via ColorPickerProps & Omit<ButtonProps,…>',
    loading:
      'extra: inherited from ButtonProps via ColorPickerProps & Omit<ButtonProps,…>',
    pressed:
      'extra: inherited from ButtonProps via ColorPickerProps & Omit<ButtonProps,…>',
    square:
      'extra: inherited from ButtonProps via ColorPickerProps & Omit<ButtonProps,…>',
    surfaceLevel:
      'extra: inherited from ButtonProps via ColorPickerProps & Omit<ButtonProps,…>',
    tightFocusRing:
      'extra: inherited from ButtonProps via ColorPickerProps & Omit<ButtonProps,…>',
    variant:
      'extra: inherited from ButtonProps via ColorPickerProps & Omit<ButtonProps,…>',
  },
  NumberFieldProps: { value: 'v-model' },
  NumberScrubberProps: { value: 'v-model', icon: 'the icon slot' },
  OTPFieldProps: { value: 'v-model' },
  OTPFieldInputProps: {
    index:
      'claimed from the field context during setup, not injected by the parent',
  },
  SelectProps: {
    as: 'extra: inherited from ButtonProps via SelectProps & Omit<ButtonProps,…>',
    clickable:
      'extra: inherited from ButtonProps via SelectProps & Omit<ButtonProps,…>',
    focusable:
      'extra: inherited from ButtonProps via SelectProps & Omit<ButtonProps,…>',
    loading:
      'extra: inherited from ButtonProps via SelectProps & Omit<ButtonProps,…>',
    square:
      'extra: inherited from ButtonProps via SelectProps & Omit<ButtonProps,…>',
    surfaceLevel:
      'extra: inherited from ButtonProps via SelectProps & Omit<ButtonProps,…>',
    optionIndicatorColor:
      'extra: explicit indicator color for selected option icon',
    icon: 'the icon slot',
    beforeOptions: 'the beforeOptions slot',
    afterOptions: 'the afterOptions slot',
    renderOption: 'the option slot',
    renderOptionInfo: 'the optionInfo slot',
    renderBeforeOption: 'the beforeOption slot',
    renderAfterOption: 'the afterOption slot',
    params: 'slot props on the option slots',
    anchorRef: 'anchorElement',
    anchorElement: 'extra: the Vue spelling of anchorRef',
    popoverState: 'v-model:open',
    multiple: 'union member',
    optionLabel:
      'extra: declared explicitly instead of via the option renderer',
    optionInfo: 'extra: declared explicitly instead of via the option renderer',
    searchFilter:
      'extra: declared explicitly instead of via the option renderer',
    focused: 'extra: forwarded to the trigger Button',
    hoverable: 'extra: forwarded to the trigger Button',
    pressed: 'extra: forwarded to the trigger Button',
    tightFocusRing: 'extra: forwarded to the trigger Button',
    variant: 'extra: forwarded to the trigger Button',
  },
  PopoverProps: {
    as: 'extra: inherited from Surface but declared explicitly for Vue typings',
    open: 'v-model:open',
    anchorRef: 'anchorElement',
    anchorElement: 'extra: the Vue spelling of anchorRef',
    bgClassName:
      'extra: inherited from Surface but declared explicitly for Vue typings',
    clickable:
      'extra: inherited from Surface but declared explicitly for Vue typings',
    disabled:
      'extra: explicit disabled guard; upstream has no disabled on Popover',
    hoverable:
      'extra: inherited from Surface but declared explicitly for Vue typings',
    overlayClassName:
      'extra: inherited from Surface but declared explicitly for Vue typings',
    overlayPosition:
      'extra: inherited from Surface but declared explicitly for Vue typings',
    pressed:
      'extra: inherited from Surface but declared explicitly for Vue typings',
    wrapContent:
      'extra: inherited from Surface but declared explicitly for Vue typings',
  },
  PopupProps: {
    open: 'v-model:open',
    'aria-label': 'ariaLabel; Vue normalises hyphenated attrs onto props',
    'aria-labelledby': 'ariaLabelledby',
    'aria-describedby': 'ariaDescribedby',
    ariaLabel: 'extra: the Vue spelling of aria-label',
    ariaLabelledby: 'extra: the Vue spelling of aria-labelledby',
    ariaDescribedby: 'extra: the Vue spelling of aria-describedby',
    beforeContent: 'the beforeContent slot',
    closeButtonContent: 'the closeButton slot',
    closeRef: 'a template ref',
    headerLeft: 'the headerLeft slot',
    headerRight: 'the headerRight slot',
  },
  RadioProps: { id: 'extra: native id, forwarded as the inputId fallback' },
  SearchFieldProps: {
    value: 'v-model',
    icon: 'the icon slot',
    prefix: 'the prefix slot',
    suffix: 'the suffix slot',
    displayValue: 'the displayValue slot',
    beforeContent: 'the beforeContent slot',
    inputRef: 'a template ref; the element is exposed as inputElement',
    inputComponentProps: 'inputProps',
    inputProps: 'extra: the Vue spelling of inputComponentProps',
  },
  SliderProps: { name: 'extra: native name on the range input' },
  SurfaceProps: { beforeContent: 'the beforeContent slot' },
  SurfaceCutProps: { beforeContent: 'the beforeContent slot' },
  SwitchProps: {
    icon: 'the icon slot',
    value: 'v-model',
    id: 'extra: native id, forwarded as the inputId fallback',
    inputId: 'extra: explicit id for the hidden input',
    name: 'extra: native name on the hidden input',
    required: 'extra: native required on the hidden input',
  },
  TabProps: {
    as: 'extra: polymorphic root element, inherited via SegmentedButtonProps in upstream',
  },
  TextareaProps: {
    value: 'v-model',
    icon: 'the icon slot',
    prefix: 'the prefix slot',
    suffix: 'the suffix slot',
    bgClassName:
      'extra: inherited from SurfaceCutProps via TextareaProps & Omit<SurfaceCutProps,…>',
    clickable:
      'extra: inherited from SurfaceCutProps via TextareaProps & Omit<SurfaceCutProps,…>',
    hoverable:
      'extra: inherited from SurfaceCutProps via TextareaProps & Omit<SurfaceCutProps,…>',
    outline:
      'extra: inherited from SurfaceCutProps via TextareaProps & Omit<SurfaceCutProps,…>',
    overlayClassName:
      'extra: inherited from SurfaceCutProps via TextareaProps & Omit<SurfaceCutProps,…>',
    overlayPosition:
      'extra: inherited from SurfaceCutProps via TextareaProps & Omit<SurfaceCutProps,…>',
    pressed:
      'extra: inherited from SurfaceCutProps via TextareaProps & Omit<SurfaceCutProps,…>',
    wrapContent:
      'extra: inherited from SurfaceCutProps via TextareaProps & Omit<SurfaceCutProps,…>',
  },
  ToastProps: { open: 'v-model:open' },
  TooltipPrimitiveProps: {
    open: 'v-model:open',
    anchorRef: 'anchorElement',
    anchorElement: 'extra: the Vue spelling of anchorRef',
  },
  TooltipProps: {
    'aria-label': 'ariaLabel; Vue normalises hyphenated attrs onto props',
    tooltip: 'the tooltip slot',
    ariaLabel: 'extra: the Vue camelCase spelling of aria-label',
    color: 'extra: forwarded to TooltipPrimitive',
    contentClassName: 'extra: forwarded to TooltipPrimitive',
    disabled: 'extra: forwarded to TooltipPrimitive',
    offset: 'extra: forwarded to TooltipPrimitive',
    position: 'extra: forwarded to TooltipPrimitive',
    root: 'extra: forwarded to TooltipPrimitive',
    surfaceLevel: 'extra: forwarded to TooltipPrimitive',
    zIndex: 'extra: forwarded to TooltipPrimitive',
    onClick: 'native click listener attribute',
  },
};

const eventTransposed: Record<string, Record<string, string>> = {
  AccordionRootProps: { onValueChange: 'update:value emit' },
  CheckboxProps: {
    onChange: 'change emit',
    onClick: 'native click listener attribute',
    onPointerDown: 'native pointerdown listener attribute',
  },
  CollapsibleRootProps: { onOpenChange: 'update:open emit' },
  ColorEditorProps: { onChange: 'change emit' },
  ColorPickerProps: {
    onClick: 'native click listener attribute',
    onChange: 'change emit',
    onPopoverState: 'update:popoverState emit',
  },
  DialogProps: {
    onCancel: 'cancel emit',
    onClosed: 'closed emit',
    onConfirm: 'confirm emit',
    onOpenChange: 'v-model:open',
  },
  InputProps: {
    onBlur: 'blur emit',
    onChange: 'change emit',
    onClear: 'clear emit',
    onFocus: 'focus emit',
    onKeyDown: 'keydown emit',
  },
  LinkProps: { onClick: 'native click listener attribute' },
  NumberFieldProps: { onChange: 'change emit' },
  NumberScrubberProps: {
    onChange: 'change emit',
    onTemporaryChange: 'temporaryChange emit',
  },
  OTPFieldProps: { onChange: 'v-model emit' },
  PopoverProps: {
    onClose: 'closing emit',
    onClosed: 'closed emit',
    onOpenChange: 'v-model:open',
    onOpen: 'opening emit',
    onOpened: 'opened emit',
    onPhaseChange: 'internal lifecycle callback; not a public Vue emit',
  },
  PopupProps: {
    onCloseButtonClick: 'closeButtonClick emit',
    onClose: 'closing emit',
    onClosed: 'closed emit',
    onOpenChange: 'v-model:open',
    onOpen: 'opening emit',
    onOpened: 'opened emit',
  },
  RadioProps: {
    onChange: 'change emit',
    onClick: 'native click listener attribute',
    onPointerDown: 'native pointerdown listener attribute',
  },
  SearchFieldProps: {
    onBlur: 'forwarded blur listener',
    onChange: 'change emit',
    onClear: 'clear emit',
    onFocus: 'forwarded focus listener',
    onKeyDown: 'keydown emit',
  },
  SelectProps: {
    onClick: 'click emit',
    onPopoverState: 'overlay lifecycle emits',
    onSearch: 'search emit',
  },
  SliderProps: { onChange: 'change emit' },
  TabsProps: { onValueChange: 'update:value emit' },
  TextareaProps: {
    onBlur: 'blur emit',
    onChange: 'change emit',
    onFocus: 'focus emit',
    onKeyDown: 'keydown emit',
  },
  ToastProps: {
    onClosed: 'closed emit',
    onOpenChange: 'v-model:open',
  },
  ToggleButtonOwnProps: { onChange: 'change emit' },
  ToggleGroupOwnProps: { onValueChange: 'update:value emit' },
  TooltipPrimitiveProps: {
    onClose: 'closing emit',
    onClosed: 'closed emit',
    onOpenChange: 'v-model:open',
    onOpen: 'opening emit',
    onOpened: 'opened emit',
    onPhaseChange: 'internal lifecycle callback; not a public Vue emit',
  },
  TooltipProps: {
    onClick: 'native click listener attribute',
  },
};

/**
 * Upstream props with no Vue equivalent at all. Unlike `transposed`, these are
 * real gaps. Shrink the list; adding to it needs a reason in
 * plans/upstream-parity-realignment.md.
 */
const notImplemented: Record<string, string[]> = {};

const resolvedContractGaps: Record<string, string[]> = {
  SearchFieldProps: [],
};

function stripReact(props: Set<string>): string[] {
  return [...props].filter(
    (name) => !REACT_ONLY.has(name) && !/^on[A-Z]/u.test(name),
  );
}

function contractFiles(root: string): string[] {
  return ['components', 'calendar'].flatMap((directory) => {
    const path = join(root, directory);
    return readdirSync(path)
      .filter((name) => /\.(?:ts|tsx)$/u.test(name))
      .map((name) => join(path, name));
  });
}

function ourInterfaces(): Map<string, Set<string>> {
  const found = new Map<string, Set<string>>();
  const dir = join(packageRoot, 'src', 'components');

  for (const file of readdirSync(dir).filter((name) => name.endsWith('.ts'))) {
    const path = join(dir, file);
    for (const name of namesIn(path)) {
      found.set(name, interfaceProps(path, name));
    }
  }

  return found;
}

function namesIn(path: string): string[] {
  const source = readFileSync(path, 'utf8');
  return [...source.matchAll(/^export interface (\w+Props)\b/gmu)].map(
    (match) => match[1],
  );
}

let upstreamIndex: Map<string, Set<string>> | undefined;

/** Props name -> its own prop names, built once across every upstream component file. */
function upstreamInterfaces(): Map<string, Set<string>> {
  if (upstreamIndex) return upstreamIndex;

  upstreamIndex = new Map();
  const dir = upstreamPath('components');

  for (const file of readdirSync(dir).filter((name) => name.endsWith('.tsx'))) {
    const path = join(dir, file);
    const source = readFileSync(path, 'utf8');

    for (const match of source.matchAll(
      /(?:export\s+)?(?:interface|type)\s+(\w+Props)\b/gu,
    )) {
      const name = match[1];
      if (upstreamIndex.has(name)) continue;

      const props = interfaceProps(path, name);
      if (props.size > 0) {
        upstreamIndex.set(name, props);
      } else {
        upstreamIndex.set(name, typeAliasProps(path, name));
      }
    }
  }

  return upstreamIndex;
}

function upstreamInterface(base: string): Set<string> | undefined {
  const index = upstreamInterfaces();
  for (const candidate of [
    base + 'OwnProps',
    base + 'BaseProps',
    base + 'Props',
  ]) {
    const props = index.get(candidate);
    if (props && props.size > 0) return props;
  }
  return undefined;
}

test.skipIf(!upstreamHydrated)(
  'indexes upstream interfaces and type aliases',
  () => {
    const index = upstreamInterfaces();
    expect(index.size).toBeGreaterThan(0);

    for (const name of ['ButtonProps', 'DialogProps', 'ToastProps']) {
      expect(index.has(name), `${name} should be indexed`).toBe(true);
    }
  },
);

test.skipIf(!upstreamHydrated)(
  'resolves intersections, unions, inheritance, property types, and calendar contracts',
  () => {
    const contracts = propsContracts(contractFiles(upstreamPath()));
    const button = contracts.get('ButtonProps');
    const colorPicker = contracts.get('ColorPickerProps');
    const searchField = contracts.get('SearchFieldProps');
    const calendar = contracts.get('CalendarProps');
    const datePicker = contracts.get('DatePickerProps');

    expect(button?.props.has('size')).toBe(true);
    expect(colorPicker?.props.has('gradient')).toBe(true);
    expect(searchField?.props.has('placeholder')).toBe(true);
    expect(calendar?.props.get('header')?.types).toContain('ReactNode');
    expect(calendar?.unresolved).toContain('DayPickerProps');
    expect(datePicker?.props.has('format')).toBe(true);
    expect(datePicker?.props.has('calendarProps')).toBe(true);
  },
);

test.skipIf(!upstreamHydrated)(
  'tracks inherited SearchField gaps explicitly',
  () => {
    const upstreamContracts = propsContracts(contractFiles(upstreamPath()));
    const ourContracts = propsContracts(
      contractFiles(join(packageRoot, 'src')),
    );
    const upstream = upstreamContracts.get('SearchFieldProps');
    const ours = ourContracts.get('SearchFieldProps');
    const allowed = {
      ...transposed.SearchFieldProps,
      ...eventTransposed.SearchFieldProps,
    };
    const missing = [...(upstream?.props.keys() ?? [])].filter(
      (name) =>
        !REACT_ONLY.has(name) && !ours?.props.has(name) && !(name in allowed),
    );

    expect(missing.sort()).toEqual(
      [...resolvedContractGaps.SearchFieldProps].sort(),
    );
  },
);

test.skipIf(!upstreamHydrated)(
  'declares upstream props for every component',
  () => {
    const drift: string[] = [];
    let comparableContracts = 0;

    const index = upstreamInterfaces();
    expect(
      index.size,
      'upstreamInterfaces() returned zero entries — reference/cladd may be unhydrated or the reader is broken',
    ).toBeGreaterThan(0);

    for (const [name, ourProps] of ourInterfaces()) {
      const upstream = upstreamInterface(name.slice(0, -'Props'.length));
      if (!upstream) continue;
      comparableContracts += 1;

      const allowed = {
        ...transposed[name],
        ...eventTransposed[name],
      };
      const known = new Set(notImplemented[name] ?? []);

      for (const prop of stripReact(upstream)) {
        if (ourProps.has(prop) || prop in allowed || known.has(prop)) continue;
        drift.push(`${name} is missing upstream's \`${prop}\``);
      }

      for (const prop of stripReact(ourProps)) {
        if (upstream.has(prop) || prop in allowed) continue;
        drift.push(`${name} declares \`${prop}\`, which upstream does not`);
      }
    }

    expect(
      comparableContracts,
      'no comparable prop contracts were found',
    ).toBeGreaterThan(0);

    expect(drift.sort(), 'prop drift against reference/cladd').toEqual([]);
  },
);

test.skipIf(!upstreamHydrated)('keeps the not-implemented list honest', () => {
  const done: string[] = [];

  for (const [name, props] of Object.entries(notImplemented)) {
    const ourProps = ourInterfaces().get(name);
    if (!ourProps) continue;

    for (const prop of props) {
      if (ourProps.has(prop)) done.push(`${name}.${prop}`);
    }
  }

  expect(
    done.sort(),
    'these are implemented now and should leave the not-implemented list',
  ).toEqual([]);
});

test.skipIf(!upstreamHydrated)(
  'accounts for every upstream event in the transposition map',
  () => {
    const unaccounted: string[] = [];
    let comparableContracts = 0;
    const INTERNAL =
      /(?:Own|Default|Inner|Root|Base|Selection|Resolved)\w*Props$|^Gradient|^Solid/u;

    for (const [name, upstreamProps] of upstreamInterfaces()) {
      if (INTERNAL.test(name)) continue;
      const events = eventTransposed[name] ?? {};
      const reactEvents = new Set(
        [...upstreamProps].filter((p) => /^on[A-Z]/u.test(p) && !(p in events)),
      );

      if (reactEvents.size === 0 && Object.keys(events).length === 0) continue;
      comparableContracts += 1;

      for (const prop of reactEvents) {
        unaccounted.push(
          `${name}.${prop} — upstream event not in eventTransposed`,
        );
      }
    }

    expect(
      comparableContracts,
      'no comparable event contracts were found',
    ).toBeGreaterThan(0);

    expect(
      unaccounted.sort(),
      'every upstream event must be in eventTransposed or explicitly React-only',
    ).toEqual([]);
  },
);

test.skipIf(!upstreamHydrated)(
  'matches upstream optionality for shared props',
  () => {
    const mismatches: string[] = [];
    let comparableContracts = 0;
    const INTERNAL =
      /(?:Own|Default|Inner|Root|Base|Selection|Resolved)\w*Props$|^Gradient|^Solid/u;

    const upstreamContracts = propsContracts(contractFiles(upstreamPath()));
    const ourContracts = propsContracts(
      contractFiles(join(packageRoot, 'src')),
    );

    for (const [name, upstream] of upstreamContracts) {
      if (INTERNAL.test(name)) continue;
      const ours = ourContracts.get(name);
      if (!ours) continue;
      comparableContracts += 1;

      const allowed = {
        ...transposed[name],
        ...eventTransposed[name],
      };

      for (const [prop, upstreamProp] of upstream.props) {
        if (REACT_ONLY.has(prop) || prop in allowed) continue;
        const ourProp = ours.props.get(prop);
        if (!ourProp) continue;

        if (!upstreamProp.optional && ourProp.optional) {
          mismatches.push(`${name}.${prop}: upstream required, ours optional`);
        }
      }
    }

    expect(
      comparableContracts,
      'no comparable contracts for optionality check',
    ).toBeGreaterThan(0);

    expect(
      mismatches.sort(),
      'upstream required props should remain required in our ports',
    ).toEqual([]);
  },
);

test('documents every public prop', () => {
  const undocumented: string[] = [];
  const dir = join(packageRoot, 'src', 'components');

  for (const file of readdirSync(dir).filter((name) => name.endsWith('.ts'))) {
    const source = readFileSync(join(dir, file), 'utf8');

    for (const block of source.matchAll(
      /export interface (\w+Props) \{(.*?)\n\}/gsu,
    )) {
      const lines = block[2].split('\n');

      for (const [index, line] of lines.entries()) {
        const prop = /^ {2}(?:readonly )?([A-Za-z_$][\w$-]*)\??\s*:/u.exec(
          line,
        );
        if (!prop) continue;

        const previous = (lines[index - 1] ?? '').trim();
        if (previous.endsWith('*/') || previous.startsWith('*')) continue;

        undocumented.push(`${block[1]}.${prop[1]}`);
      }
    }
  }

  expect(
    undocumented.sort(),
    'public props without JSDoc; port upstream\u2019s wording where it exists',
  ).toEqual([]);
});
