# Port manifest: `Textarea`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71`
- Upstream files: `src/components/Textarea.tsx`
- Vue files: `src/components/Textarea.vue`, `src/components/textarea.contracts.ts`
- Diffed: 2026-08-31, upstream read from `reference/cladd/`

## Props

| Upstream prop | Upstream ref      | Vue surface   | Vue ref           | Default | Verdict    | Note |
| ------------- | ----------------- | ------------- | ----------------- | ------- | ---------- | ---- |
| `value`       | `Textarea.tsx:30` | `v-model`     | `Textarea.vue:30` | —       | transposed |      |
| `placeholder` | `Textarea.tsx:31` | `placeholder` | `Textarea.vue:31` | —       | ported     |      |
| `rows`        | `Textarea.tsx:32` | `rows`        | `Textarea.vue:32` | `3`     | ported     |      |

## Copied literals

| Value                                                                           | Upstream ref      | Vue ref                    |
| ------------------------------------------------------------------------------- | ----------------- | -------------------------- |
| `textareaClasses: min-h-20 w-full rounded-cladd-md border border-cladd-outline` | `Textarea.tsx:50` | `textarea.contracts.ts:10` |

## Verification

Via `tests/parity/upstreamProps.test.ts`.
