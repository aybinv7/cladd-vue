# Port manifest: `ListTitle`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/ListTitle.tsx`
- Vue files: `src/components/ListTitle.vue`, `src/components/list.contracts.ts` (line 6)
- Diffed: 2026-08-03, upstream read from `reference/cladd/`

Read upstream paths below as `reference/cladd/<path>`. Vue paths are relative to `packages/ui/`.

## Props

| Upstream prop                              | Upstream ref       | Vue surface                                | Vue ref                                                    | Default | Verdict    | Note                                                                                                     |
| ------------------------------------------ | ------------------ | ------------------------------------------ | ---------------------------------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| `children`                                 | `ListTitle.tsx:8`  | default slot                               | `ListTitle.vue:23`                                         | —       | transposed | `ReactNode` prop to slot.                                                                                |
| `className`                                | `ListTitle.tsx:10` | `class` through `$attrs`                   | `ListTitle.vue:14–18,22`                                   | —       | transposed | `inheritAttrs: false` + class merge into `listTitleClasses`.                                             |
| `ref`                                      | `ListTitle.tsx:12` | root element via template ref              | `ListTitle.vue:22`                                         | —       | transposed | Vue exposes the root `<div>` without an explicit prop.                                                   |
| `useComponentDefaults('ListTitle', props)` | `ListTitle.tsx:29` | `useComponentDefaults('ListTitle', props)` | `ListTitle.vue:18`, `foundations/componentDefaults.ts:112` | —       | ported     | Wired with built-in `className ''` (`ListTitle.vue:18`). Registry `ComponentDefaults.ListTitle` present. |

## Copied literals

| Value                                                                                                            | Upstream ref       | Vue ref                 |
| ---------------------------------------------------------------------------------------------------------------- | ------------------ | ----------------------- |
| `'cladd-list-title flex items-end gap-4 p-2 text-cladd-xs font-medium text-cladd-fg-soft uppercase select-none'` | `ListTitle.tsx:35` | `list.contracts.ts:6–7` |

## Deviations

- Upstream `ListTitleProps` extends `ComponentPropsWithoutRef<'div'>` via intersection (`ListTitle.tsx:15–16`). Vue `ListTitleProps` (`list.contracts.ts:44`) is `Record<string, never>` with `className` via `useComponentDefaults` wired. Native attributes forwarded through `$attrs`; observable result identical.

## Verification

Compared the single render path line-by-line. The CSS class string was verified character-by-character. `ListTitle.tsx:31–41` maps directly to `ListTitle.vue:21–24`.

Not verified here: browser/device checks.
