# Port manifest: `Spinner`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Spinner.tsx`
- Vue files: `src/components/Spinner.vue`, `src/components/feedback.contracts.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

| Upstream prop | Upstream ref     | Vue surface | Vue ref          | Default     | Verdict | Note                |
| ------------- | ---------------- | ----------- | ---------------- | ----------- | ------- | ------------------- |
| `size`        | `Spinner.tsx:14` | `size`      | `Spinner.vue:15` | `'md'`      | ported  | Spinner size token. |
| `color`       | `Spinner.tsx:16` | `color`     | `Spinner.vue:14` | `undefined` | ported  | Stroke color token. |

## Copied literals

| Value                                | Upstream ref        | Vue ref                      |
| ------------------------------------ | ------------------- | ---------------------------- |
| Spinner SVG dimensions and dasharray | `Spinner.tsx:22-35` | `feedback.contracts.ts:8-25` |

## Deviations

None.

## Verification

Tested SVG rendering and sizing classes in `tests/components/actions.test.ts`.
