# Port manifest: `NumberField` + `NumberScrubber`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71`
- Upstream files: `src/components/NumberField.tsx`, `src/components/NumberScrubber.tsx`
- Vue files: `src/components/NumberField.vue`, `src/components/NumberScrubber.vue`,
  `src/components/numberField.contracts.ts`, `src/components/numberScrubber.contracts.ts`
- Diffed: 2026-08-31, upstream read from `reference/cladd/`

## Props

| Upstream prop      | Upstream ref         | Vue surface        | Vue ref              | Default | Verdict    | Note |
| ------------------ | -------------------- | ------------------ | -------------------- | ------- | ---------- | ---- |
| `value`            | `NumberField.tsx:30` | `v-model`          | `NumberField.vue:30` | —       | transposed |      |
| `min`/`max`/`step` | `NumberField.tsx:31` | `min`/`max`/`step` | `NumberField.vue:31` | —       | ported     |      |
| `disabled`         | `NumberField.tsx:32` | `disabled`         | `NumberField.vue:32` | `false` | ported     |      |

## Copied literals

| Value                                         | Upstream ref         | Vue ref                       |
| --------------------------------------------- | -------------------- | ----------------------------- |
| `numberFieldClasses: flex items-center gap-2` | `NumberField.tsx:50` | `numberField.contracts.ts:10` |

## Verification

Via `tests/parity/upstreamProps.test.ts` and `tests/components/numberField.test.ts`.
