# Port manifest: `Radio`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71`
- Upstream files: `src/components/Radio.tsx`
- Vue files: `src/components/Radio.vue`, `src/components/radio.contracts.ts`
- Diffed: 2026-08-31, upstream read from `reference/cladd/`

## Props

| Upstream prop | Upstream ref   | Vue surface       | Vue ref        | Default | Verdict    | Note |
| ------------- | -------------- | ----------------- | -------------- | ------- | ---------- | ---- |
| `checked`     | `Radio.tsx:20` | `v-model:checked` | `Radio.vue:20` | `false` | transposed |      |
| `name`        | `Radio.tsx:21` | `name`            | `Radio.vue:21` | —       | ported     |      |
| `value`       | `Radio.tsx:22` | `value`           | `Radio.vue:22` | —       | ported     |      |

## Verification

Via `tests/parity/upstreamProps.test.ts`.
