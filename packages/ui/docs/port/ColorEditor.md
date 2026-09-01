# Port manifest: `ColorEditor`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/ColorEditor.tsx`
- Vue files: `src/components/ColorEditor.vue`, `src/components/colorEditor.contracts.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

| Upstream prop | Upstream ref         | Vue surface              | Vue ref               | Default | Verdict    | Note                                          |
| ------------- | -------------------- | ------------------------ | --------------------- | ------- | ---------- | --------------------------------------------- |
| `value`       | `ColorEditor.tsx:45` | `modelValue` / `v-model` | `ColorEditor.vue:55`  | —       | transposed | Two-way model binding.                        |
| `format`      | `ColorEditor.tsx:47` | `format`                 | `ColorEditor.vue:42`  | `'hex'` | ported     | Format selector (`hex`, `rgb`, `hsl`, `hsb`). |
| `gradient`    | `ColorEditor.tsx:50` | `gradient`               | `ColorEditor.vue:44`  | `false` | ported     | Enable linear gradient editing mode.          |
| `header`      | `ColorEditor.tsx:55` | `#header` slot           | `ColorEditor.vue:112` | —       | transposed | Named slot.                                   |
| `footer`      | `ColorEditor.tsx:57` | `#footer` slot           | `ColorEditor.vue:125` | —       | transposed | Named slot.                                   |

## Copied literals

| Value                                   | Upstream ref              | Vue ref                          |
| --------------------------------------- | ------------------------- | -------------------------------- |
| Color conversion algorithms and sliders | `ColorEditor.tsx:120-250` | `colorEditor.contracts.ts:25-90` |

## Deviations

None.

## Verification

Validated solid and gradient color picking, format conversions, and event triggers in `tests/components/color.test.ts`.
