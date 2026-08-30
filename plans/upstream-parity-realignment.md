# Upstream parity realignment

Audit of every way `packages/ui` diverges from `reference/cladd` at `fadd8ef`, and the order to close
it. The rule this plan serves is in `packages/ui/CLAUDE.md`: port, do not invent.

Evidence was gathered by diffing the port against the vendored checkout, not by inspection.

## Done

- [x] CSS namespace restored to upstream: `cui-` → `cladd-`, `--cui-` → `--cladd-`, and the unprefixed
      `.safe-areas` / `.no-safe-areas` hooks put back. 1087 occurrences across 96 files.
- [x] `--radius-cui` → `--radius-cladd`.
- [x] Formatter aligned to upstream `.oxfmtrc.json` (80 columns, single quotes outside CSS, two-space
      indent, trailing commas, Tailwind class sorting through `cn`/`clsx`/`twMerge`).
- [x] Upstream's duplicate `.light .cladd-color-neutral` selector restored rather than "cleaned up".
- [x] `tailwind-merge` moved from `^3.6.0` to upstream's `^3.5.0`.
- [x] `tests/parity/upstreamStyles.test.ts` added. It diffs every stylesheet against the vendored checkout,
      fails on drift, and skips only when `reference/cladd` has not been hydrated.

**Result: 7 of 8 stylesheets are byte-identical to upstream.** The exception is one line in
`colors.css` where upstream ships `neutral){` unformatted and oxfmt rewrites it to `neutral) {`. It is
recorded as an allowance in the parity test.

## 1. Public API names

- [x] `accent` prop deleted; upstream's `color` is the only spelling. `popoverAccent` ->
      `popoverColor`, `cancelAccent` -> `cancelButtonColor`, `confirmAccent` -> `confirmButtonColor`.
- [x] `UiProvider` -> `CladdProvider`.
- [x] `UiAccent` -> `Color` in `src/types.ts`, ported verbatim including `| (string & {})`.
- [x] `uiAccents`, `useUiContext`, `useOverlaysRoot`, `defaultOverlaysRoot` and `UiContextValue`
      un-exported. Upstream's index exports none of them.
- [x] Styles subpath `./styles.css` -> `./css`.
- [x] `CheckIcon`, `CloseIcon`, `DropdownIcon` and `SearchIcon` exported, matching upstream's index.
- [x] Fifteen invented runtime tables un-exported: `uiSizes`, `uiThemes`, `surfaceLevels`,
      `surfaceVariants`, `overlayPhases`, `clampSurfaceLevel`, `resolveSurfaceLevel`,
      `buttonSpinnerSizes`, `choiceSizes`, `fieldSizes`, `sliderVariants`, `switchSizes`,
      `popoverPositions`, `popoverPositionConfigs`, `tooltipPositions`. They stay internal; upstream
      exports none of them.
- [x] `Backdrop` and `useCollapsibleContext` exported. Both were implemented but missing from the
      index.
- [ ] `UiSize` / `UiTheme` still centralized in `foundations/contracts.ts`. Upstream declares size
      unions per component (`ButtonSize` in `Button.tsx`) and has no theme union at all.

## 2. Invented components

**This section was wrong when first written and is corrected here.** The original audit compared
_filenames_ against `reference/cladd/src/components/`, which lists one file per component. Upstream
declares several components per file: `DialogRoot`, `DialogTrigger` and `DialogClose` all live inside
`Dialog.tsx`, and the same holds for Popover, Popup and Toast. All twelve are exported from upstream's
`index.ts` (lines 123-129, 189-207, 314-320). They are a faithful port, not an invention.

Comparing _export lists_ instead of filenames leaves a much shorter list:

- [x] `CheckboxGlyph` deleted. Upstream's `Checkbox.tsx:15,215` renders `icons/CheckIcon`.
- [x] `SelectDropdownIcon` deleted. Upstream's `Select.tsx:17,648` renders `icons/DropdownIcon`.
- [x] `forms/SearchIcon.vue` and `feedback/CloseIcon.vue` deleted; they shadowed the copies in
      `components/icons/`, which is where upstream keeps them and which already matched upstream.
- [x] `RadioGroup` deleted along with `radioGroupContext.ts`. Upstream groups radios with the native
      `name` attribute (`Radio.tsx:29-30,175`) and has no group component; `Radio` no longer injects a
      group, and the fixture and tests bind `checked` per radio the way a caller has to.

## 3. Code shape

- [x] `shared/cn.ts` restored to upstream's flat literal arrays. **Byte-identical to upstream.**
- [x] `shared/roundedClasses.ts` and `shared/sizeClasses.ts` ported verbatim from
      `rounded-classes.ts` and `size-utls.ts`. **Byte-identical to upstream.** This also fixed a real
      divergence: upstream defaults `size` to `'sm'` and returns `string | undefined`, where the port
      had made the parameter required.
- [x] `shared/nextTick.ts` ported and exported; upstream exports it from its index.
- [ ] Restore upstream's JSDoc on every public prop. The port stripped it under a no-comments rule
      that no longer applies to ported documentation. This is the largest remaining shape item.
- [ ] `*.contracts.ts` files have no upstream counterpart. Decide per file whether the constants live
      where upstream puts them (inline, or in `shared/`) and collapse the rest.
- [ ] `useOverlayLifecycle`'s local `runAfterTwoFrames` duplicates `shared/nextTick`.

## 4. File layout

- [x] `src/components/*` flattened to match upstream: one directory plus `icons/`. 102 files moved,
      every relative import re-resolved against its new location.
- [x] `src/cladd.css` → `src/cladd.css`, with upstream's `@source "./"; @source "./components";`
      and `@import "./styles/*.css"` paths. **Byte-identical to upstream**, and now covered by the
      parity test alongside the eight partials.
- [x] `composables/useTheme.ts` and camelCase `shared/` filenames stay as they are. Decided: filename
      and directory idiom is part of the React-to-Vue transposition, like `.tsx` becoming `.vue`.
      Upstream `hooks/use-theme.ts` maps to `composables/useTheme.ts`, `shared/rounded-classes.ts` to
      `shared/roundedClasses.ts`, and `shared/size-utls.ts` to `shared/sizeClasses.ts`. The contents
      still port verbatim; only the path idiom moves.
- [ ] `foundations/` and `contexts/` have no upstream counterpart. Fold them into the upstream homes
      (`types.ts`, `shared/`, and the component that owns each context).

## 5. Not yet ported

Upstream exports the port does not, taken from upstream's `index.ts` rather than its filenames:

`Backdrop`, `ColorEditor`, `ColorPicker`, `Link`, `NumberField`, `NumberScrubber`, `OTPField`,
`OTPFieldInput`, `OTPFieldSeparator`, `SurfaceContent`, `SurfaceContextProvider`, `SurfaceCutContent`,
and the `calendar/` entrypoint (`Calendar`, `CalendarIcon`, `DatePicker`).

`Backdrop` and `useCollapsibleContext` were implemented but not exported, and now are, leaving eleven
genuine gaps. `ColorEditor` and `ColorPicker` also need `shared/color.ts`, roughly 300 lines of HSV
conversion that is not ported.

`tests/parity/upstreamExports.test.ts` locks this: it fails when an upstream export has no
counterpart, when the port exports something upstream does not, and when the not-yet-ported list goes
stale. The list is the work queue; it may only shrink.

## 6. Type safety

`vp lint --typeCheck` never covered `.vue` templates, so the port carried 77 type errors nobody could
see. `vp run typecheck` (vue-tsc) now surfaces them and is wired into `ready`.

- [x] Built-in defaults were cast `as SomeProps['x']`, which is `X | undefined` and poisoned every
      lookup table indexed by that value. Narrowed to `as NonNullable<SomeProps['x']>`, 18 files,
      which cleared 40 errors on its own.
- [x] `defineModel<boolean>('open', { default: undefined })` widened to `boolean | undefined`.
      Keeping the runtime options identical matters: dropping `{ default: undefined }` instead breaks
      `ToastRoot`.
- [x] Zero errors. Two of the unused locals were real defects: `Shortcut` never applied its root
      class (upstream `Shortcut.tsx:225`), and `TooltipPrimitive` never applied its anchor positioning
      style (upstream `TooltipPrimitive.tsx:201`). The third mirrored upstream's own dead
      `hoverableComputed` and was dropped as an unobservable deviation.
- [x] `SurfaceLevelInput` widened from `number | \`${number}\``to upstream's`number | string`
(`Surface.tsx:67`, `Popover.tsx:340`), which is what makes `'+1'`and`'-1'` legal.

## Sequencing

Sections 1 and 3 are the highest value: they change the public contract and the reviewability of the
source, and they get cheaper the sooner they happen. Section 2 is a breaking removal and should land
in one change with a migration note. Section 4 is mechanical but touches every import in the package,
so it goes last among the realignment work. Section 5 starts only once the parity test covers
components as well as stylesheets.
