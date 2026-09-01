# Port manifest: `Segmented` (`Segmented`, `SegmentedButton`)

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Segmented.tsx`, `src/components/SegmentedButton.tsx`, `src/components/SegmentedContext.tsx`
- Vue files: `src/components/Segmented.vue`, `src/components/SegmentedButton.vue`, `src/components/segmented.contracts.ts`, `src/components/segmentedContext.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

### Segmented

| Upstream prop | Upstream ref       | Vue surface              | Vue ref            | Default     | Verdict    | Note                    |
| ------------- | ------------------ | ------------------------ | ------------------ | ----------- | ---------- | ----------------------- |
| `value`       | `Segmented.tsx:16` | `modelValue` / `v-model` | `Segmented.vue:24` | `undefined` | transposed | Active selection value. |
| `size`        | `Segmented.tsx:18` | `size`                   | `Segmented.vue:18` | `'md'`      | ported     | Control size token.     |
| `color`       | `Segmented.tsx:20` | `color`                  | `Segmented.vue:16` | `'neutral'` | ported     | Accent color token.     |

### SegmentedButton

| Upstream prop | Upstream ref             | Vue surface | Vue ref                  | Default  | Verdict | Note               |
| ------------- | ------------------------ | ----------- | ------------------------ | -------- | ------- | ------------------ |
| `value`       | `SegmentedButton.tsx:12` | `value`     | `SegmentedButton.vue:15` | required | ported  | Option identifier. |
| `disabled`    | `SegmentedButton.tsx:14` | `disabled`  | `SegmentedButton.vue:13` | `false`  | ported  | Disable item.      |

## Copied literals

| Value                           | Upstream ref          | Vue ref                       |
| ------------------------------- | --------------------- | ----------------------------- |
| Segmented pill container styles | `Segmented.tsx:32-45` | `segmented.contracts.ts:6-24` |

## Deviations

None.

## Verification

Tested selection switching, keyboard arrow navigation, and roving focus in `tests/components/actions.test.ts`.
