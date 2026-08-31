# Port manifest: `Checkbox`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71`
- Upstream files: `src/components/Checkbox.tsx`
- Vue files: `src/components/Checkbox.vue`, `src/components/checkbox.contracts.ts`
- Diffed: 2026-08-31, upstream read from `reference/cladd/`

## Props

| Upstream prop              | Upstream ref      | Vue surface       | Vue ref           | Default | Verdict    | Note |
| -------------------------- | ----------------- | ----------------- | ----------------- | ------- | ---------- | ---- |
| `checked`/`defaultChecked` | `Checkbox.tsx:20` | `v-model:checked` | `Checkbox.vue:20` | `false` | transposed |      |
| `onChange`                 | `Checkbox.tsx:21` | `@update:checked` | `Checkbox.vue:20` | —       | transposed |      |
| `disabled`                 | `Checkbox.tsx:22` | `disabled`        | `Checkbox.vue:21` | `false` | ported     |      |
| `label`                    | `Checkbox.tsx:23` | default slot      | `Checkbox.vue:30` | —       | transposed |      |

## Copied literals

| Value                                                                  | Upstream ref      | Vue ref                    |
| ---------------------------------------------------------------------- | ----------------- | -------------------------- |
| `checkboxClasses: size-4 rounded-cladd-xs border border-cladd-outline` | `Checkbox.tsx:40` | `checkbox.contracts.ts:10` |

## Verification

Via `tests/parity/upstreamProps.test.ts` and `tests/components/forms.test.ts`.
