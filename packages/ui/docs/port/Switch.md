# Port manifest: `Switch`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71`
- Upstream files: `src/components/Switch.tsx`
- Vue files: `src/components/Switch.vue`, `src/components/switch.contracts.ts`
- Diffed: 2026-08-31, upstream read from `reference/cladd/`

## Props

| Upstream prop | Upstream ref    | Vue surface       | Vue ref         | Default | Verdict    | Note |
| ------------- | --------------- | ----------------- | --------------- | ------- | ---------- | ---- |
| `checked`     | `Switch.tsx:20` | `v-model:checked` | `Switch.vue:20` | `false` | transposed |      |
| `disabled`    | `Switch.tsx:21` | `disabled`        | `Switch.vue:21` | `false` | ported     |      |

## Verification

Via `tests/parity/upstreamProps.test.ts`.
