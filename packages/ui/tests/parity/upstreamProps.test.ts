import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vite-plus/test';

import {
  packageRoot,
  upstreamHydrated,
  upstreamPath,
} from '../support/paths.ts';
import { interfaceProps } from '../support/upstream.ts';

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
    inputComponentProps: 'inputProps',
    inputProps: 'extra: the Vue spelling of inputComponentProps',
  },
  ListButtonProps: { icon: 'the icon slot', after: 'the after slot' },
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
  },
  NumberFieldProps: { value: 'v-model' },
  NumberScrubberProps: { value: 'v-model', icon: 'the icon slot' },
  OTPFieldProps: { value: 'v-model' },
  OTPFieldInputProps: {
    index:
      'claimed from the field context during setup, not injected by the parent',
  },
  SelectProps: {
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
    clearButton: 'extra: declared explicitly instead of inherited from Input',
    color: 'extra: declared explicitly instead of inherited from Input',
    placeholder: 'extra: declared explicitly instead of inherited from Input',
    rounded: 'extra: declared explicitly instead of inherited from Input',
    size: 'extra: declared explicitly instead of inherited from Input',
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
  TextareaProps: {
    value: 'v-model',
    icon: 'the icon slot',
    prefix: 'the prefix slot',
    suffix: 'the suffix slot',
  },
  ToastProps: { open: 'v-model:open' },
  TooltipPrimitiveProps: {
    open: 'v-model:open',
    anchorRef: 'anchorElement',
    anchorElement: 'extra: the Vue spelling of anchorRef',
  },
  TooltipProps: {
    tooltip: 'the tooltip slot',
    ariaLabel: 'extra: declared explicitly instead of via native props',
    color: 'extra: forwarded to TooltipPrimitive',
    contentClassName: 'extra: forwarded to TooltipPrimitive',
    disabled: 'extra: forwarded to TooltipPrimitive',
    offset: 'extra: forwarded to TooltipPrimitive',
    position: 'extra: forwarded to TooltipPrimitive',
    root: 'extra: forwarded to TooltipPrimitive',
    surfaceLevel: 'extra: forwarded to TooltipPrimitive',
    zIndex: 'extra: forwarded to TooltipPrimitive',
  },
};

/**
 * Upstream props with no Vue equivalent at all. Unlike `transposed`, these are
 * real gaps. Shrink the list; adding to it needs a reason in
 * plans/upstream-parity-realignment.md.
 */
const notImplemented: Record<string, string[]> = {
  DialogProps: ['inertContainer', 'lazy', 'stopPropagationOnClick'],
  InputProps: ['displayValue', 'inputComponent'],
  SwitchProps: ['event'],
  TextareaProps: ['inputPadding'],
};

function stripReact(props: Set<string>): string[] {
  return [...props].filter(
    (name) => !REACT_ONLY.has(name) && !/^on[A-Z]/u.test(name),
  );
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

/** interface name -> its own prop names, built once across every upstream component file. */
function upstreamInterfaces(): Map<string, Set<string>> {
  if (upstreamIndex) return upstreamIndex;

  upstreamIndex = new Map();
  const dir = upstreamPath('components');

  for (const file of readdirSync(dir).filter((name) => name.endsWith('.tsx'))) {
    const path = join(dir, file);
    const source = readFileSync(path, 'utf8');
    for (const match of source.matchAll(/interface (\w+Props)/gu)) {
      const name = match[1];
      if (upstreamIndex.has(name)) continue;
      upstreamIndex.set(name, interfaceProps(path, name));
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
  'declares upstream props for every component',
  () => {
    const drift: string[] = [];

    for (const [name, ourProps] of ourInterfaces()) {
      const upstream = upstreamInterface(name.slice(0, -'Props'.length));
      if (!upstream) continue;

      const allowed = transposed[name] ?? {};
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
