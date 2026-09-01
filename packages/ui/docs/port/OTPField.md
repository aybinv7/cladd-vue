# Port manifest: `OTPField` (`OTPField`, `OTPFieldInput`, `OTPFieldSeparator`)

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/OTPField.tsx`, `src/components/OTPFieldInput.tsx`, `src/components/OTPFieldSeparator.tsx`, `src/components/OTPFieldContext.tsx`
- Vue files: `src/components/OTPField.vue`, `src/components/OTPFieldInput.vue`, `src/components/OTPFieldSeparator.vue`, `src/components/otpField.contracts.ts`, `src/components/otpFieldContext.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

### OTPField

| Upstream prop    | Upstream ref      | Vue surface              | Vue ref            | Default     | Verdict    | Note                                                  |
| ---------------- | ----------------- | ------------------------ | ------------------ | ----------- | ---------- | ----------------------------------------------------- |
| `value`          | `OTPField.tsx:33` | `modelValue` / `v-model` | `OTPField.vue:30`  | `''`        | transposed | Bound OTP string.                                     |
| `onChange`       | `OTPField.tsx:35` | `update:modelValue` emit | `OTPField.vue:30`  | —           | transposed | `onChange` callback transposes to Vue model update.   |
| `maxLength`      | `OTPField.tsx:39` | `maxLength`              | `OTPField.vue:21`  | `undefined` | ported     | Number of slots. Inferred from children when omitted. |
| `disabled`       | `OTPField.tsx:55` | `disabled`               | `OTPField.vue:19`  | `false`     | ported     | Dim all slots.                                        |
| `readOnly`       | `OTPField.tsx:57` | `readOnly`               | `OTPField.vue:24`  | `false`     | ported     | Make every cell non-editable but still focusable.     |
| `size`           | `OTPField.tsx:41` | `size`                   | `OTPField.vue:25`  | `'lg'`      | ported     | Cell size.                                            |
| `pattern`        | `OTPField.tsx:47` | `pattern`                | `OTPField.vue:23`  | `'[0-9]'`   | ported     | Regex source matching a single allowed character.     |
| `valid`          | `OTPField.tsx:51` | `valid`                  | `OTPField.vue:27`  | `true`      | ported     | Validity state; `false` renders a red focus ring.     |
| `tightFocusRing` | `OTPField.tsx:53` | `tightFocusRing`         | `OTPField.vue:26`  | `false`     | ported     | Flush focus ring instead of offset.                   |
| `inputMode`      | `OTPField.tsx:59` | `inputMode`              | `OTPField.vue:20`  | `'numeric'` | ported     | Forwarded to each underlying `<input>`.               |
| `children`       | `OTPField.tsx:27` | default slot             | `OTPField.vue:209` | —           | transposed | `ReactNode` children transposes to slot.              |

## Copied literals

| Value                                                              | Upstream ref           | Vue ref                |
| ------------------------------------------------------------------ | ---------------------- | ---------------------- |
| Container class `cladd-otp-field relative flex items-center gap-1` | `OTPField.tsx:325`     | `OTPField.vue:179`     |
| FocusRing `force color="red" offset={!tightFocusRing}`             | `OTPField.tsx:330-338` | `OTPField.vue:200-208` |

## Deviations

None.

## Verification

Tested keyboard typing, backspace navigation, paste distribution, and focus shifts in `tests/components/otpField.test.ts`.
