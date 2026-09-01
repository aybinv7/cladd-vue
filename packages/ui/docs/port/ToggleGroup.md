# Port manifest: `ToggleGroup` (`ToggleGroup`, `ToggleButton`)

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/ToggleGroup.tsx`, `src/components/ToggleButton.tsx`, `src/components/ToggleGroupContext.tsx`
- Vue files: `src/components/ToggleGroup.vue`, `src/components/ToggleButton.vue`, `src/components/toggleGroup.contracts.ts`, `src/components/toggleGroupContext.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

### ToggleGroup

| Upstream prop | Upstream ref         | Vue surface              | Vue ref              | Default     | Verdict    | Note                     |
| ------------- | -------------------- | ------------------------ | -------------------- | ----------- | ---------- | ------------------------ |
| `value`       | `ToggleGroup.tsx:16` | `modelValue` / `v-model` | `ToggleGroup.vue:24` | `undefined` | transposed | Active selection.        |
| `multiple`    | `ToggleGroup.tsx:18` | `multiple`               | `ToggleGroup.vue:18` | `false`     | ported     | Multiple toggles active. |
| `size`        | `ToggleGroup.tsx:20` | `size`                   | `ToggleGroup.vue:19` | `'md'`      | ported     | Control size token.      |

### ToggleButton

| Upstream prop | Upstream ref          | Vue surface | Vue ref               | Default     | Verdict | Note                     |
| ------------- | --------------------- | ----------- | --------------------- | ----------- | ------- | ------------------------ |
| `value`       | `ToggleButton.tsx:14` | `value`     | `ToggleButton.vue:16` | required    | ported  | Option identifier.       |
| `pressed`     | `ToggleButton.tsx:16` | `pressed`   | `ToggleButton.vue:15` | `undefined` | ported  | Standalone toggle state. |

## Copied literals

| Value                                          | Upstream ref            | Vue ref                         |
| ---------------------------------------------- | ----------------------- | ------------------------------- |
| Toggle group outline and active pressed styles | `ToggleGroup.tsx:32-50` | `toggleGroup.contracts.ts:6-30` |

## Deviations

None.

## Verification

Tested single and multi toggle selection in `tests/components/actions.test.ts`.
