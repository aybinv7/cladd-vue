# Port manifest: `NumberScrubber`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/NumberScrubber.tsx`
- Vue files: `src/components/NumberScrubber.vue`, `src/components/numberScrubber.contracts.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

| Upstream prop | Upstream ref               | Vue surface              | Vue ref                    | Default     | Verdict    | Note                      |
| ------------- | -------------------------- | ------------------------ | -------------------------- | ----------- | ---------- | ------------------------- |
| `value`       | `NumberScrubber.tsx:22`    | `modelValue` / `v-model` | `NumberScrubber.vue:42`    | `0`         | transposed | Two-way model binding.    |
| `step`        | `NumberScrubber.tsx:24`    | `step`                   | `NumberScrubber.vue:28`    | `1`         | ported     | Increment step.           |
| `min` / `max` | `NumberScrubber.tsx:26,28` | `min` / `max`            | `NumberScrubber.vue:25,26` | `undefined` | ported     | Value bounds.             |
| `sensitivity` | `NumberScrubber.tsx:30`    | `sensitivity`            | `NumberScrubber.vue:27`    | `1`         | ported     | Pixel drag delta divisor. |
| `icon`        | `NumberScrubber.tsx:32`    | `#icon` slot             | `NumberScrubber.vue:75`    | —           | transposed | Icon slot.                |

## Copied literals

| Value                         | Upstream ref               | Vue ref                     |
| ----------------------------- | -------------------------- | --------------------------- |
| Pointer lock and drag physics | `NumberScrubber.tsx:50-95` | `NumberScrubber.vue:80-140` |

## Deviations

None.

## Verification

Tested pointer lock, shift/alt modifiers, and scrubbing in `tests/components/numberScrubber.test.ts`.
