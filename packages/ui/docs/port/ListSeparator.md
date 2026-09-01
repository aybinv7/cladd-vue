# Port manifest: `ListSeparator`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/ListSeparator.tsx`
- Vue files: `src/components/ListSeparator.vue`, `src/components/list.contracts.ts` (line 9)
- Diffed: 2026-08-03, upstream read from `reference/cladd/`

Read upstream paths below as `reference/cladd/<path>`. Vue paths are relative to `packages/ui/`.

## Props

| Upstream prop                                  | Upstream ref           | Vue surface                                    | Vue ref                                                        | Default | Verdict    | Note                                                                                                             |
| ---------------------------------------------- | ---------------------- | ---------------------------------------------- | -------------------------------------------------------------- | ------- | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| `children`                                     | `ListSeparator.tsx:8`  | default slot                                   | `ListSeparator.vue:23`                                         | —       | transposed | `ReactNode` prop to slot.                                                                                        |
| `className`                                    | `ListSeparator.tsx:10` | `class` through `$attrs`                       | `ListSeparator.vue:14–18,22`                                   | —       | transposed | `inheritAttrs: false` + class merge into `listSeparatorClasses`.                                                 |
| `ref`                                          | `ListSeparator.tsx:12` | root element via template ref                  | `ListSeparator.vue:22`                                         | —       | transposed | Vue exposes the root `<div>` without an explicit prop.                                                           |
| `useComponentDefaults('ListSeparator', props)` | `ListSeparator.tsx:26` | `useComponentDefaults('ListSeparator', props)` | `ListSeparator.vue:18`, `foundations/componentDefaults.ts:111` | —       | ported     | Wired with built-in `className ''` (`ListSeparator.vue:18`). Registry `ComponentDefaults.ListSeparator` present. |

## Copied literals

| Value                                                     | Upstream ref           | Vue ref                  |
| --------------------------------------------------------- | ---------------------- | ------------------------ |
| `'cladd-list-separator -mx-2 my-2 h-px bg-cladd-outline'` | `ListSeparator.tsx:32` | `list.contracts.ts:9–10` |

## Deviations

- Upstream `ListSeparatorProps` extends `HTMLAttributes<HTMLDivElement>` (`ListSeparator.tsx:6`). Vue `ListSeparatorProps` (`list.contracts.ts:42`) is `Record<string, never>` with `className` via `useComponentDefaults` wired. Native attributes forwarded through `$attrs`; observable result identical.

## Verification

Compared the single render path line-by-line. The CSS class string was verified character-by-character. `ListSeparator.tsx:28–38` maps directly to `ListSeparator.vue:21–24`.

Not verified here: browser/device checks.
