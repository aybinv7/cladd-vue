# Port manifest: `Chip`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Chip.tsx`
- Vue files: `src/components/Chip.vue`, `src/components/chip.contracts.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

| Upstream prop | Upstream ref  | Vue surface   | Vue ref       | Default     | Verdict    | Note                                        |
| ------------- | ------------- | ------------- | ------------- | ----------- | ---------- | ------------------------------------------- |
| `size`        | `Chip.tsx:16` | `size`        | `Chip.vue:24` | `'md'`      | ported     | Chip sizing token.                          |
| `color`       | `Chip.tsx:18` | `color`       | `Chip.vue:22` | `'neutral'` | ported     | Accent color token.                         |
| `variant`     | `Chip.tsx:20` | `variant`     | `Chip.vue:25` | `'solid'`   | ported     | Chip visual style variant.                  |
| `rounded`     | `Chip.tsx:22` | `rounded`     | `Chip.vue:23` | `true`      | ported     | Pill corners.                               |
| `removable`   | `Chip.tsx:24` | `removable`   | `Chip.vue:27` | `false`     | ported     | Render clear/remove button.                 |
| `onRemove`    | `Chip.tsx:26` | `remove` emit | `Chip.vue:35` | —           | transposed | `onRemove` callback transposes to Vue emit. |
| `children`    | `Chip.tsx:14` | default slot  | `Chip.vue:49` | —           | transposed | Slot content.                               |

## Copied literals

| Value               | Upstream ref     | Vue ref                  |
| ------------------- | ---------------- | ------------------------ |
| Chip sizing classes | `Chip.tsx:32-48` | `chip.contracts.ts:8-28` |

## Deviations

None.

## Verification

Compared `Chip.tsx` with Vue SFC implementation. Verified props, styling, and remove action in `tests/components/actions.test.ts`.
