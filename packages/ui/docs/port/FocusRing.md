# Port manifest: `FocusRing`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/FocusRing.tsx`
- Vue files: `src/components/FocusRing.vue`, `src/components/focusRing.contracts.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

| Upstream prop | Upstream ref       | Vue surface | Vue ref            | Default     | Verdict | Note                          |
| ------------- | ------------------ | ----------- | ------------------ | ----------- | ------- | ----------------------------- |
| `visible`     | `FocusRing.tsx:15` | `visible`   | `FocusRing.vue:18` | `true`      | ported  | Force ring visibility.        |
| `color`       | `FocusRing.tsx:17` | `color`     | `FocusRing.vue:16` | `undefined` | ported  | Ring accent color class.      |
| `tight`       | `FocusRing.tsx:19` | `tight`     | `FocusRing.vue:20` | `false`     | ported  | Flush inset ring positioning. |
| `rounded`     | `FocusRing.tsx:21` | `rounded`   | `FocusRing.vue:19` | `false`     | ported  | Pill border radius.           |

## Copied literals

| Value                  | Upstream ref          | Vue ref                       |
| ---------------------- | --------------------- | ----------------------------- |
| FocusRing base classes | `FocusRing.tsx:25-35` | `focusRing.contracts.ts:5-22` |

## Deviations

None.

## Verification

Tested focus trap and ring visibility across interactive controls in `tests/foundations/focusTrap.test.ts`.
