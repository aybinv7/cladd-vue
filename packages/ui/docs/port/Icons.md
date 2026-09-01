# Port manifest: `Icons`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/icons/*.tsx`
- Vue files: `src/components/icons/*.vue`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Components

Ported icons from upstream Cladd SVG definitions. Only icons exported from `src/index.ts` are part
of the public API; internal icons exist in `src/components/icons/` but are not re-exported.

### Public (exported from `index.ts`)

- `CheckIcon` — `index.ts:177`, `icons/CheckIcon.vue`
- `CloseIcon` — `index.ts:174`, `icons/CloseIcon.vue`
- `DropdownIcon` — `index.ts:176`, `icons/DropdownIcon.vue`
- `SearchIcon` — `index.ts:175`, `icons/SearchIcon.vue`

### Internal (not exported)

- `ArrowLeftIcon`, `ChevronLeftIcon`, `FlipIcon`, `GradientColorIcon`, `SolidColorIcon`
- `KeyboardArrowLeftIcon`, `KeyboardBackspaceIcon`, `KeyboardCommandIcon`, `KeyboardControlIcon`,
  `KeyboardOptionIcon`, `KeyboardReturnIcon`, `KeyboardShiftIcon`, `KeyboardSpaceIcon`,
  `KeyboardTabIcon`

These are consumed internally by other components (e.g. `NumberScrubber`) or by the playground.
They correspond to upstream icons of the same names.

## Verification

Verified icon SVG paths, viewBoxes, and exported names match upstream definitions and `index.ts` exports.
