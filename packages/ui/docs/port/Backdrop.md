# Port manifest: `Backdrop`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Backdrop.tsx`
- Vue files: `src/components/Backdrop.vue`, `src/components/overlay.contracts.ts` (line 163)
- Diffed: 2026-08-03, upstream read from `reference/cladd/`

Read upstream paths below as `reference/cladd/<path>`. Vue paths are relative to `packages/ui/`.

## Props

| Upstream prop                             | Upstream ref      | Vue surface                   | Vue ref                 | Default | Verdict    | Note                                                                                  |
| ----------------------------------------- | ----------------- | ----------------------------- | ----------------------- | ------- | ---------- | ------------------------------------------------------------------------------------- |
| `className`                               | `Backdrop.tsx:8`  | `class` through `$attrs`      | `Backdrop.vue:14–18,22` | —       | transposed | `inheritAttrs: false` + `v-bind="rootAttrs"` with class merge into `backdropClasses`. |
| `children`                                | `Backdrop.tsx:10` | default slot                  | `Backdrop.vue:23`       | —       | transposed | `ReactNode` prop to slot.                                                             |
| `ref`                                     | `Backdrop.tsx:12` | root element via template ref | `Backdrop.vue:22`       | —       | transposed | Vue exposes the root `<div>` without an explicit prop.                                |
| `data-part="backdrop"`                    | `Backdrop.tsx:31` | `data-part="backdrop"`        | `Backdrop.vue:22`       | —       | ported     |                                                                                       |
| `useComponentDefaults('Backdrop', props)` | `Backdrop.tsx:26` | —                             | —                       | —       | deviated   | Not ported. Audit finding 7.                                                          |

## Copied literals

| Value                                                      | Upstream ref      | Vue ref                        |
| ---------------------------------------------------------- | ----------------- | ------------------------------ |
| `'cladd-backdrop fixed inset-0 z-50 bg-cladd-backdrop/90'` | `Backdrop.tsx:33` | `overlay.contracts.ts:163–164` |
| `data-part="backdrop"`                                     | `Backdrop.tsx:31` | `Backdrop.vue:22`              |

## Deviations

- `useComponentDefaults` / `BackdropDefaultProps` not ported (`Backdrop.tsx:26`, `16`–`18`). Provider-supplied per-component defaults are a package-wide gap (audit finding 7).
- Upstream `BackdropProps` extends `HTMLAttributes<HTMLDivElement>` (`Backdrop.tsx:6`), inheriting all native div props. Vue `BackdropProps` (`overlay.contracts.ts:529`) is `Record<string, never>` — no own props. Native attributes are forwarded through `$attrs`, so the observable result is the same, but the typed public API differs: upstream consumers can pass any `HTMLDivElement` prop explicitly; Vue consumers pass them as untyped attributes.

## Verification

Compared the single render path line-by-line. The CSS class string and `data-part` attribute were verified character-by-character. `Backdrop.tsx:28–39` maps directly to `Backdrop.vue:21–24`.

Not verified here: `useComponentDefaults` provider resolution (package-wide gap), or how `Backdrop` is composed inside `Dialog`/`Popover`/`Tooltip`.
