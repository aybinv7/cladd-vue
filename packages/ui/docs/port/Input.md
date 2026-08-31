# Port manifest: `Input`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Input.tsx`, `src/components/Surface.tsx`
- Vue files: `src/components/Input.vue`, `src/components/input.contracts.ts`,
  `src/styles/input.css`
- Diffed: 2026-08-31, upstream read from `reference/cladd/`

## Props

| Upstream prop          | Upstream ref   | Vue surface          | Vue ref        | Default | Verdict    | Note                                 |
| ---------------------- | -------------- | -------------------- | -------------- | ------- | ---------- | ------------------------------------ |
| `value`/`defaultValue` | `Input.tsx:60` | `v-model`            | `Input.vue:40` | —       | transposed | `value` + `onChange` → `defineModel` |
| `onChange`             | `Input.tsx:61` | `@update:modelValue` | `Input.vue:40` | —       | transposed |                                      |
| `placeholder`          | `Input.tsx:62` | `placeholder`        | `Input.vue:45` | —       | ported     |                                      |
| `size`                 | `Input.tsx:63` | `size`               | `Input.vue:46` | `md`    | ported     |                                      |
| `disabled`             | `Input.tsx:64` | `disabled`           | `Input.vue:47` | `false` | ported     |                                      |
| `readOnly`             | `Input.tsx:65` | `readOnly`           | `Input.vue:48` | `false` | ported     |                                      |
| `color`                | `Input.tsx:66` | `color`              | `Input.vue:49` | —       | ported     |                                      |
| `className`            | `Input.tsx:67` | `class`              | `Input.vue:50` | —       | transposed |                                      |

## Copied literals

| Value                                                                                                                   | Upstream ref   | Vue ref        |
| ----------------------------------------------------------------------------------------------------------------------- | -------------- | -------------- |
| `inputClasses: flex h-cladd-md w-full rounded-cladd-md border border-cladd-outline bg-cladd-surface px-3 text-cladd-sm` | `Input.tsx:80` | `input.css:10` |

## Deviations

- `v-model` vs `value`/`onChange` — transposition, behavior identical.

## Verification

Props compared via `tests/parity/upstreamProps.test.ts` (`notImplemented` empty). Visual via `tests/components/forms.test.ts` and playground `Input` section.
