# Component audit fixes

Found by a five-way parity audit against `reference/cladd`, run independently of the existing
`tests/parity/*` suite and `plans/upstream-parity-realignment.md` (both of which have known blind
spots — happy-dom can't render real layout, and the export/prop readers have been wrong before).

## High severity

- [x] `Input.vue` / `Textarea.vue` — consumer `class` isn't put last in `cn(...)`; it relies on
      Vue's attrs-merge order instead, which puts the consumer's class _first_, so the component's
      own `opacity-50`/rounded classes win over a conflicting consumer utility. Same bug class as
      the earlier Button/Checkbox/Chip sweep, reintroduced through the attrs path instead of a
      literal `cn()` ordering mistake. (`Input.tsx:286-292`, `Textarea.tsx:238-242`) Fixed: both now
      strip `class` from the forwarded attrs and append it last in their own `cn()`.
- [x] `SurfaceCut.vue` — `outline` defaults to `false`; upstream defaults `true`
      (`SurfaceCut.tsx:448`), and the port's own `surface.contracts.ts:54` JSDoc already says
      `true`. Every `SurfaceCut` is missing its inset ring by default. Fixed.
- [x] `ToggleGroup.vue` — `isControlled` computed as `d.value.value !== undefined` instead of
      upstream's `'value' in props` (`ToggleGroup.tsx:79-83`, which has an explicit comment warning
      against the `!== undefined` inference: an empty selection is legitimately `undefined`, so a
      controlled group that clears flips to uncontrolled and desyncs from the parent's state). Fixed
      via `getCurrentInstance().vnode.props` presence check (`defineModel`'s options can't reference
      local variables, so its local-fallback default couldn't be seeded from the `defaultValue`
      prop). Locked with a regression test.
- [x] `AccordionRoot.vue` — same bug as `ToggleGroup`: `d.value.value !== undefined` instead of
      `'value' in props` (`AccordionRoot.tsx:770-774`, same warning comment). A controlled
      single-open accordion that closes to `undefined` can pop back open with stale state. Fixed the
      same way, locked with a regression test.
- [x] `Dialog.vue` — confirm button keeps `currentAccent` regardless of confirmation state; upstream
      drops the color to `undefined` while the type-to-confirm text doesn't match yet
      (`Dialog.tsx:474-478`). Fixed: `:color="confirmationValid ? currentAccent : undefined"`.
- [x] `DialogsPortal.vue` — drops `lazy` and `stopPropagationOnClick` when forwarding imperative
      dialog data to `<Dialog>` (`DialogsPortal.tsx:12-31`). Both are silently ignored by callers of
      the imperative API. Fixed: both are now bound through.
- [x] `Popover.vue` — **audit correction**: the original finding ("unconditionally resets color;
      upstream never resets color for Popover") was wrong — upstream's `Popover.tsx:701` does wrap
      the whole portaled tree in `SurfaceColorReset`, same as Dialog/Popup, and the port's
      `provideSurfaceColorReset()` call already matched that correctly. What was actually missing:
      upstream _additionally_ wraps just the content `Surface`'s children in `PopoverSurfaceReset`
      (`Popover.tsx:388-396`), which flattens the surface level to `0` (and, since it omits `color`
      on `SurfaceContextProvider`, resets color again too) when the popover's own resolved level is
      `1` and the theme is `light`. Fixed by replicating `Surface`'s own level-resolution math in
      `Popover.vue` and conditionally wrapping the default slot in `SurfaceContextProvider` when
      that condition holds.
- [x] `Button.vue` — `disabled` is only wired to the native `<button>` case; a polymorphic
      `as="SomeComponent"` target never receives it. Upstream always passes
      `disabled={disabled || readOnly}` through to `WrapComponent` regardless of tag
      (`Button.tsx:~215`). Fixed: `:disabled` binding no longer gated on `isNativeButton`.
- [x] `foundations/componentDefaults.ts` — `ComponentDefaults` interface is missing `Backdrop` and
      `ToolbarSeparator` entries (`ThemeContext.tsx:68-125` has both). App-wide defaults for these
      two components are unreachable, and a type error if a consumer tries. Fixed: both entries
      added (both `*DefaultProps` types already existed and were already exported from the index,
      just missing from this interface). Neither component calls `useComponentDefaults` at the
      runtime level, same as `List`/`SectionTitle` — their only real prop is `className`/`class`,
      which flows through `attrs` in this codebase's idiom, not the defaults cascade, so there is no
      runtime gap to close beyond the type.

## Lower severity / edge cases (fix opportunistically, lower priority than the above)

- [x] `FocusRing.vue` — merges consumer class via plain attrs fallthrough instead of `cn(...)`, so
      tailwind-merge dedup doesn't apply to it specifically. Fixed with the same
      `rootAttrs`/`attrs.class`-last pattern as everywhere else; locked in
      `tests/components/classPrecedence.test.ts` alongside Input and Textarea.
- [x] `OTPFieldInput.vue` — claims its index once at mount (`claimIndex()`) rather than recomputing
      from live child order every render like upstream's `useMemo` does. **Decided: not a bug worth
      fixing.** It only desyncs if a consumer dynamically adds/removes/reorders cells in a
      fixed-length OTP field at runtime, which isn't a realistic use of this component. Reproducing
      upstream's reactive child-tracking for that case would add real complexity for no practical
      gain. Documented in place instead.
- [x] `SurfaceCut.vue` — stray `text-cladd-fg` class on the root (`SurfaceCut.vue:60`) that upstream
      doesn't set (`SurfaceCut.tsx:486`). Fixed in `abbe985` alongside the corrected `outline`
      default; the root now matches the upstream class list.
- [x] `surfaceLevel.ts` — silently "fixes" an upstream edge case: a malformed numeric-string level
      falls back to `clampSurfaceLevel(parentLevel + 1)` instead of reproducing upstream's `NaN`
      result (`Surface.tsx:158-171`). **Decided: keep the safer behavior, do not reproduce the
      bug.** No real caller passes a malformed `SurfaceLevelInput` — the type only ever holds
      `number`, `'+N'`, `'-N'`, or a plain numeric string — so this only guards a case that can't
      occur from normal usage, and there's no value in deliberately emitting a broken
      `cladd-surface-level-NaN` class for it.
- [x] `useOverlayLifecycle.ts` — local `runAfterTwoFrames` duplicates `shared/nextTick.ts`'s
      double-rAF timing, plus a cancel function `nextTick` lacks. Fixed: `runAfterTwoFrames` now
      wraps `nextTick` with a cancelled-flag guard instead of reimplementing the double-rAF timer,
      so there's one timer implementation, not two. The cancellation itself stays - Vue's
      `watchEffect`/`onCleanup` needs it where React's effect model doesn't (upstream's own
      `use-modal-utils.ts` calls the same shared `nextTick` with no cancellation at all).

## Confirm intentional, not a bug

- `Select.vue` is a non-generic, union-typed option model vs. upstream's generic `Select<T, V>` —
  a real API-shape difference, not a regression. Flagging for awareness, not fixing here.

## Clean (audited, no findings)

Popup*, Toast*, Backdrop, Segmented*, Toolbar*, Tabs family, List family, Link, Surface/
SurfaceContent, Spinner, ColorEditor/ColorPicker, Collapsible family, `shared/*` copies, `types.ts`,
`useDevice.ts`, Checkbox/Radio/Switch, NumberField/NumberScrubber, SearchField, Chip, Shortcut.
