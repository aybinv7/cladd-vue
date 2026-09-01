# Port manifest: `CladdProvider`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/CladdProvider.tsx`, `src/components/ThemeContext.tsx`
- Vue files: `src/components/CladdProvider.vue`, `src/components/claddProvider.contracts.ts`, `src/contexts/uiContext.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

| Upstream prop | Upstream ref           | Vue surface   | Vue ref                | Default   | Verdict    | Note                         |
| ------------- | ---------------------- | ------------- | ---------------------- | --------- | ---------- | ---------------------------- |
| `theme`       | `CladdProvider.tsx:12` | `theme`       | `CladdProvider.vue:15` | `'dark'`  | ported     | Dark/light theme context.    |
| `accentColor` | `CladdProvider.tsx:14` | `accentColor` | `CladdProvider.vue:16` | `'brand'` | ported     | Scoped accent color context. |
| `defaults`    | `CladdProvider.tsx:16` | `defaults`    | `CladdProvider.vue:17` | `{}`      | ported     | Component defaults map.      |
| `children`    | `CladdProvider.tsx:10` | default slot  | `CladdProvider.vue:35` | —         | transposed | Slot content.                |

## Copied literals

| Value                                        | Upstream ref             | Vue ref              |
| -------------------------------------------- | ------------------------ | -------------------- |
| Default theme tokens and theme class binding | `ThemeContext.tsx:20-45` | `uiContext.ts:10-38` |

## Deviations

None.

## Verification

Verified component defaults injection and theme provider propagation across all components in `tests/foundations/componentDefaults.test.ts`.
