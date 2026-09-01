# Port manifest: `SectionTitle`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/SectionTitle.tsx`
- Vue files: `src/components/SectionTitle.vue`, `src/components/list.contracts.ts` (line 12)
- Diffed: 2026-08-03, upstream read from `reference/cladd/`

Read upstream paths below as `reference/cladd/<path>`. Vue paths are relative to `packages/ui/`.

## Props

| Upstream prop                                 | Upstream ref          | Vue surface                                   | Vue ref                     | Default | Verdict    | Note                                                            |
| --------------------------------------------- | --------------------- | --------------------------------------------- | --------------------------- | ------- | ---------- | --------------------------------------------------------------- |
| `children`                                    | `SectionTitle.tsx:8`  | default slot                                  | `SectionTitle.vue:34`       | —       | transposed | `ReactNode` prop to slot.                                       |
| `className`                                   | `SectionTitle.tsx:10` | `class` through `$attrs`                      | `SectionTitle.vue:14–18,33` | —       | transposed | `inheritAttrs: false` + class merge into `sectionTitleClasses`. |
| `ref`                                         | `SectionTitle.tsx:12` | root element via template ref                 | `SectionTitle.vue:33`       | —       | transposed | Vue exposes the root `<div>` without an explicit prop.          |
| `useComponentDefaults('SectionTitle', props)` | `SectionTitle.tsx:29` | `useComponentDefaults('SectionTitle', props)` | `SectionTitle.vue:18`       | —       | ported     | Component defaults wired.                                       |

## Copied literals

| Value                                                                                                           | Upstream ref          | Vue ref                   |
| --------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------- |
| `'cladd-section-title flex items-end gap-4 text-cladd-xs font-medium text-cladd-fg-soft uppercase select-none'` | `SectionTitle.tsx:35` | `list.contracts.ts:12–13` |

## Deviations

- Upstream `SectionTitleProps` extends `ComponentPropsWithoutRef<'div'>` via intersection (`SectionTitle.tsx:15–16`). Vue `SectionTitle.vue:14` defines `className?: string` directly in the component's props. Native attributes forwarded through `$attrs`; observable result identical.
- `className` is a direct Vue prop (`SectionTitle.vue:14`) rather than a merged-through-attrs `className` as upstream does, since Vue does not pass a separate `className` prop to elements.

## Verification

Compared the single render path line-by-line. The CSS class string was verified character-by-character. `SectionTitle.tsx:31–41` maps directly to `SectionTitle.vue:21–24`.
