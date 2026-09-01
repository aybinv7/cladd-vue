# Port manifest: `List`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/List.tsx`
- Vue files: `src/components/List.vue`, `src/components/list.contracts.ts` (line 1)
- Diffed: 2026-08-03, upstream read from `reference/cladd/`

Read upstream paths below as `reference/cladd/<path>`. Vue paths are relative to `packages/ui/`.

## Props

| Upstream prop                         | Upstream ref  | Vue surface                           | Vue ref                                               | Default | Verdict    | Note                                                                                                                                   |
| ------------------------------------- | ------------- | ------------------------------------- | ----------------------------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children`                            | `List.tsx:8`  | default slot                          | `List.vue:23`                                         | —       | transposed | `ReactNode` prop to slot.                                                                                                              |
| `className`                           | `List.tsx:10` | `class` through `$attrs`              | `List.vue:14–18,22`                                   | —       | transposed | `inheritAttrs: false` + class merge into `listClasses`.                                                                                |
| `ref`                                 | `List.tsx:12` | root element via template ref         | `List.vue:22`                                         | —       | transposed | Vue exposes the root `<div>` without an explicit prop.                                                                                 |
| `useComponentDefaults('List', props)` | `List.tsx:24` | `useComponentDefaults('List', props)` | `List.vue:18`, `foundations/componentDefaults.ts:108` | —       | ported     | Wired with built-in `className ''` (`List.vue:18`). Registry `ComponentDefaults.List` present. Previously audit finding 7, now ported. |

## Copied literals

| Value                            | Upstream ref  | Vue ref               |
| -------------------------------- | ------------- | --------------------- |
| `'cladd-list flex flex-col p-2'` | `List.tsx:29` | `list.contracts.ts:1` |

## Deviations

- Upstream `ListProps` extends `HTMLAttributes<HTMLDivElement>` (`List.tsx:6`). Vue `ListProps` (`list.contracts.ts:36`) is `Record<string, never>` with `className` via `useComponentDefaults` wired. Native attributes forwarded through `$attrs`; observable result identical.

## Verification

Compared the single render path line-by-line. The CSS class string was verified character-by-character. `List.tsx:26–33` maps directly to `List.vue:21–24`.

Not verified here: browser/device checks.
