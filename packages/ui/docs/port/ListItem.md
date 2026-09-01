# Port manifest: `ListItem`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/ListItem.tsx`
- Vue files: `src/components/ListItem.vue`, `src/components/list.contracts.ts` (line 3)
- Diffed: 2026-08-03, upstream read from `reference/cladd/`

Read upstream paths below as `reference/cladd/<path>`. Vue paths are relative to `packages/ui/`.

## Props

| Upstream prop                             | Upstream ref      | Vue surface                               | Vue ref                                                   | Default | Verdict    | Note                                                                                                   |
| ----------------------------------------- | ----------------- | ----------------------------------------- | --------------------------------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| `children`                                | `ListItem.tsx:8`  | default slot                              | `ListItem.vue:23`                                         | —       | transposed | `ReactNode` prop to slot.                                                                              |
| `className`                               | `ListItem.tsx:10` | `class` through `$attrs`                  | `ListItem.vue:14–18,22`                                   | —       | transposed | `inheritAttrs: false` + class merge into `listItemClasses`.                                            |
| `ref`                                     | `ListItem.tsx:12` | root element via template ref             | `ListItem.vue:22`                                         | —       | transposed | Vue exposes the root `<div>` without an explicit prop.                                                 |
| `useComponentDefaults('ListItem', props)` | `ListItem.tsx:25` | `useComponentDefaults('ListItem', props)` | `ListItem.vue:18`, `foundations/componentDefaults.ts:110` | —       | ported     | Wired with built-in `className ''` (`ListItem.vue:18`). Registry `ComponentDefaults.ListItem` present. |

## Copied literals

| Value                                                                                   | Upstream ref      | Vue ref                 |
| --------------------------------------------------------------------------------------- | ----------------- | ----------------------- |
| `'cladd-list-item flex min-h-9 items-center gap-4 px-2 py-1 text-cladd-xs font-medium'` | `ListItem.tsx:31` | `list.contracts.ts:3–4` |

## Deviations

- Upstream `ListItemProps` extends `HTMLAttributes<HTMLDivElement>` (`ListItem.tsx:6`). Vue `ListItemProps` (`list.contracts.ts:39`) is `Record<string, never>` with `className` via `useComponentDefaults` wired. Native attributes forwarded through `$attrs`; observable result identical.

## Verification

Compared the single render path line-by-line. The CSS class string was verified character-by-character. `ListItem.tsx:27–37` maps directly to `ListItem.vue:21–24`.

Not verified here: browser/device checks.
