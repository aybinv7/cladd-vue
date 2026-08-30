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
- [x] `tests/upstreamParity.test.ts` added. It diffs every stylesheet against the vendored checkout,
      fails on drift, and skips only when `reference/cladd` has not been hydrated.

**Result: 7 of 8 stylesheets are byte-identical to upstream.** The exception is one line in
`colors.css` where upstream ships `neutral){` unformatted and oxfmt rewrites it to `neutral) {`. It is
recorded as an allowance in the parity test.

## 1. Public API names

The port renamed upstream's public surface. Every rename is a second contract to maintain and a
permanent diff.

- [ ] `accent` prop → `color`, everywhere. Upstream `Button.tsx:44` documents `color?: Color` driving
      the `cladd-color-{name}` class. The port ships `accent` **and** `color` with `color` winning,
      documented as "Port alias" in nine component docs. Delete the alias.
- [ ] `UiProvider` → `CladdProvider`.
- [ ] `UiAccent` → `Color`, and widen it to upstream's `| (string & {})` escape hatch. Upstream's
      `types.ts` is eleven names plus that union member; the port ships a closed union, so a consumer
      cannot pass a custom accent that upstream accepts.
- [ ] `UiSize` → upstream's per-component size types (`ButtonSize` and friends are declared in the
      component file, not centrally).
- [ ] `useUiContext` / `UiContextValue` → upstream's `use-theme` / `use-accent-color` /
      `use-overlays-root` split.
- [ ] `@cladd-vue/ui/styles.css` export subpath → upstream's `./css`.

## 2. Invented components

Sixteen components in the port have no upstream counterpart. Upstream exposes `Dialog`, `Popover`,
`Popup` and `Toast` as single components; the port invented Radix-style compounds.

- [ ] Remove `DialogRoot`, `DialogTrigger`, `DialogClose`.
- [ ] Remove `PopoverRoot`, `PopoverTrigger`, `PopoverClose`.
- [ ] Remove `PopupRoot`, `PopupTrigger`, `PopupClose`.
- [ ] Remove `ToastRoot`, `ToastTrigger`, `ToastClose`.
- [ ] Remove `RadioGroup`, `CheckboxGlyph`, `SelectDropdownIcon`; fold their behavior back into the
      upstream component that owns it.
- [ ] Delete the duplicated icons: `forms/SearchIcon.vue` and `feedback/CloseIcon.vue` shadow the
      copies in `components/icons/`, which is where upstream keeps them.

## 3. Code shape

- [ ] `shared/cn.ts`: restore upstream's flat literal arrays. The port replaced them with
      `safeGroup()`, `safeNumberGroup()`, `sizeScale.map()`, `radiusVariant()` and `overlayRadii`.
      Same output, undiffable source.
- [ ] Restore upstream's JSDoc on every public prop. The port stripped it under a no-comments rule
      that no longer applies to ported documentation.
- [ ] `*.contracts.ts` files have no upstream counterpart. Decide per file whether the constants live
      where upstream puts them (inline, or in `shared/`) and collapse the rest.

## 4. File layout

- [ ] Flatten `src/components/*` to match upstream. The port groups by category (`actions/`, `forms/`,
      `overlays/`, `surface/`, …); upstream is one flat directory plus `icons/`.
- [ ] `src/styles/index.css` → `src/cladd.css` at the package root, with upstream's
      `@source "./"; @source "./components";` and `@import "./styles/*.css"` paths.
- [x] `composables/useTheme.ts` and camelCase `shared/` filenames stay as they are. Decided: filename
      and directory idiom is part of the React-to-Vue transposition, like `.tsx` becoming `.vue`.
      Upstream `hooks/use-theme.ts` maps to `composables/useTheme.ts`, `shared/rounded-classes.ts` to
      `shared/roundedClasses.ts`, and `shared/size-utls.ts` to `shared/sizeClasses.ts`. The contents
      still port verbatim; only the path idiom moves.
- [ ] `foundations/` and `contexts/` have no upstream counterpart. Fold them into the upstream homes
      (`types.ts`, `shared/`, and the component that owns each context).

## 5. Not yet ported

Upstream components with no port at all. These are additions, not realignment, and come after the
above.

`ColorEditor`, `ColorPicker`, `Link`, `ModalController`, `NumberField`, `NumberScrubber`, `OTPField`,
`OTPFieldInput`, `OTPFieldSeparator`, `SurfaceContent`, `SurfaceCutContent`, and the `calendar/`
entrypoint (`Calendar`, `CalendarIcon`, `DatePicker`).

## Sequencing

Sections 1 and 3 are the highest value: they change the public contract and the reviewability of the
source, and they get cheaper the sooner they happen. Section 2 is a breaking removal and should land
in one change with a migration note. Section 4 is mechanical but touches every import in the package,
so it goes last among the realignment work. Section 5 starts only once the parity test covers
components as well as stylesheets.
