# Port manifest: `Tooltip` + `TooltipPrimitive`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Tooltip.tsx`, `src/components/TooltipPrimitive.tsx`,
  `src/components/tooltipTimeout.ts`, `src/components/Surface.tsx`
- Vue files: `src/components/Tooltip.vue`, `src/components/TooltipPrimitive.vue`,
  `src/components/tooltipTimeout.ts`, `src/components/overlay.contracts.ts`
- Diffed: 2026-08-31, upstream read from `reference/cladd/`

## Props

### Tooltip

| Upstream prop   | Upstream ref     | Vue surface         | Vue ref                  | Default | Verdict    | Note                                                  |
| --------------- | ---------------- | ------------------- | ------------------------ | ------- | ---------- | ----------------------------------------------------- |
| `children`      | `Tooltip.tsx:20` | default slot        | `Tooltip.vue:44,218`     | —       | transposed |                                                       |
| `content`       | `Tooltip.tsx:21` | default slot string | `Tooltip.vue:44`         | —       | transposed | Upstream `content` string → Vue default slot          |
| `trigger`       | `Tooltip.tsx:22` | `#trigger` slot     | `Tooltip.vue:44,181`     | —       | transposed | `cloneElement` → `cloneTriggerNode` + `VNodeRenderer` |
| `position`      | `Tooltip.tsx:23` | `position`          | `Tooltip.vue:36,65,207`  | `top`   | ported     | `top` / `bottom` only                                 |
| `offset`        | `Tooltip.tsx:24` | `offset`            | `Tooltip.vue:35,65,207`  | `4`     | ported     |                                                       |
| `color`         | `Tooltip.tsx:25` | `color`             | `Tooltip.vue:32,187`     | —       | ported     |                                                       |
| `disabled`      | `Tooltip.tsx:26` | `disabled`          | `Tooltip.vue:34,64,75`   | `false` | ported     |                                                       |
| `timeout`       | `Tooltip.tsx:27` | `timeout`           | `Tooltip.vue:39,68,81`   | `true`  | ported     | Shared global timer                                   |
| `aria-label`    | `Tooltip.tsx:28` | `ariaLabel`         | `Tooltip.vue:31,63,206`  | —       | transposed | Hyphen → camelCase                                    |
| `className`     | `Tooltip.tsx:29` | `class`             | `Tooltip.vue:28,184,204` | —       | transposed |                                                       |
| `onOpening` etc | `Tooltip.tsx:30` | `@opening` etc      | `Tooltip.vue:47,213`     | —       | transposed |                                                       |

### TooltipPrimitive

| Upstream prop      | Upstream ref              | Vue surface        | Vue ref                          | Default                  | Verdict    | Note |
| ------------------ | ------------------------- | ------------------ | -------------------------------- | ------------------------ | ---------- | ---- |
| `anchorRef`        | `TooltipPrimitive.tsx:20` | `anchorElement`    | `TooltipPrimitive.vue:30,68`     | —                        | transposed |      |
| `position`         | `TooltipPrimitive.tsx:21` | `position`         | `TooltipPrimitive.vue:33,62,150` | `top`                    | ported     |      |
| `offset`           | `TooltipPrimitive.tsx:22` | `offset`           | `TooltipPrimitive.vue:32,61,148` | `4`                      | ported     |      |
| `color`            | `TooltipPrimitive.tsx:23` | `color`            | `TooltipPrimitive.vue:29,60,135` | —                        | ported     |      |
| `contentClassName` | `TooltipPrimitive.tsx:24` | `contentClassName` | `TooltipPrimitive.vue:31,59,172` | `px-2 py-1`              | ported     |      |
| `root`             | `TooltipPrimitive.tsx:25` | `root`             | `TooltipPrimitive.vue:34,63,110` | `'#app, #__next, #root'` | ported     |      |
| `surfaceLevel`     | `TooltipPrimitive.tsx:26` | `surfaceLevel`     | `TooltipPrimitive.vue:35,64,138` | `light:1 dark:5`         | ported     |      |
| `zIndex`           | `TooltipPrimitive.tsx:27` | `zIndex`           | `TooltipPrimitive.vue:36,65,139` | `z-50`                   | ported     |      |

## Copied literals

| Value                                                                                                                                                                                            | Upstream ref              | Vue ref                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- | -------------------------- |
| `tooltipContainerClasses: cladd-tooltip pointer-events-none`                                                                                                                                     | `TooltipPrimitive.tsx:40` | `overlay.contracts.ts:188` |
| `tooltipSurfaceClasses: pointer-events-none fixed max-h-[50vh] w-max max-w-50 overflow-auto rounded-cladd-tooltip text-cladd-xs leading-normal font-medium transition-[opacity,transform,scale]` | `TooltipPrimitive.tsx:41` | `overlay.contracts.ts:190` |
| `tooltipOpenedClasses: scale-100 opacity-100`                                                                                                                                                    | `TooltipPrimitive.tsx:42` | `overlay.contracts.ts:193` |
| `tooltipDurationClasses: duration-200`                                                                                                                                                           | `TooltipPrimitive.tsx:43` | `overlay.contracts.ts:195` |
| `tooltipHiddenClasses: scale-50 opacity-0`                                                                                                                                                       | `TooltipPrimitive.tsx:44` | `overlay.contracts.ts:197` |
| `tooltipZIndexClasses: z-50`                                                                                                                                                                     | `TooltipPrimitive.tsx:45` | `overlay.contracts.ts:199` |
| `tooltipContentClasses: px-2 py-1`                                                                                                                                                               | `TooltipPrimitive.tsx:46` | `overlay.contracts.ts:201` |
| `tooltipOrigins: top→origin-bottom, bottom→origin-top`                                                                                                                                           | `TooltipPrimitive.tsx:50` | `overlay.contracts.ts:131` |
| `tooltipPositionTryFallbacks: flip-block`                                                                                                                                                        | `TooltipPrimitive.tsx:60` | `overlay.contracts.ts:149` |

## Deviations

- `anchorRef` → `anchorElement`, `aria-label` → `ariaLabel` — transpositions (Vue prop naming).
- Vue adds `role="tooltip"` + `aria-describedby` wiring in `Tooltip.vue:162` where upstream has neither; registered as deviation (a11y improvement).
- Global tooltip timeout (`tooltipTimeout.ts`) ported verbatim; no deviation.

## Verification

Diffed `Tooltip.tsx` + `TooltipPrimitive.tsx` against Vue counterparts. Utility strings locked in `tests/components/overlays.test.ts` (origins, surface, zIndex). `Tooltip.vue` pointer listeners (`pointerenter`/`leave`/`down`/`up`) and global timeout verified via manual browser QA at `http://localhost:5174/components/tooltip` (hover → `scale-100`).
