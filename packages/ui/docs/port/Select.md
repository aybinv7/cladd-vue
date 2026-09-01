# Port manifest: `Select`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Select.tsx`
- Vue files: `src/components/Select.vue`, `src/components/select.contracts.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

| Upstream prop | Upstream ref    | Vue surface              | Vue ref         | Default              | Verdict    | Note                            |
| ------------- | --------------- | ------------------------ | --------------- | -------------------- | ---------- | ------------------------------- |
| `value`       | `Select.tsx:35` | `modelValue` / `v-model` | `Select.vue:65` | `undefined`          | transposed | Selected value or values.       |
| `options`     | `Select.tsx:38` | `options`                | `Select.vue:45` | `[]`                 | ported     | Selectable options list.        |
| `multiple`    | `Select.tsx:40` | `multiple`               | `Select.vue:42` | `false`              | ported     | Multi-select mode.              |
| `searchable`  | `Select.tsx:42` | `searchable`             | `Select.vue:48` | `false`              | ported     | Filter search input in popover. |
| `placeholder` | `Select.tsx:44` | `placeholder`            | `Select.vue:46` | `'Select an option'` | ported     | Empty placeholder.              |

## Copied literals

| Value                                       | Upstream ref        | Vue ref                     |
| ------------------------------------------- | ------------------- | --------------------------- |
| Select popover geometry and listbox classes | `Select.tsx:75-140` | `select.contracts.ts:15-80` |

## Deviations

None.

## Verification

Tested trigger, dropdown listbox, search filtering, and single/multi selection in `tests/components/forms.test.ts`.
