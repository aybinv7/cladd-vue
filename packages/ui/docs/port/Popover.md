# Port manifest: `Popover`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Popover.tsx`, `src/components/Backdrop.tsx`,
  `src/hooks/use-modal-utils.ts`, `src/hooks/use-device.ts`,
  `src/components/Surface.tsx`
- Vue files: `src/components/Popover.vue`, `src/components/PopoverRoot.vue`,
  `src/components/PopoverTrigger.vue`, `src/components/PopoverClose.vue`,
  `src/composables/useOverlayLifecycle.ts`, `src/composables/useAnchorPosition.ts`,
  `src/components/overlay.contracts.ts`, `src/components/popoverChain.ts`
- Diffed: 2026-08-31, upstream read from `reference/cladd/`

## Props

| Upstream prop                                 | Upstream ref                              | Vue surface                    | Vue ref                      | Default                                    | Verdict    | Note                             |
| --------------------------------------------- | ----------------------------------------- | ------------------------------ | ---------------------------- | ------------------------------------------ | ---------- | -------------------------------- |
| `children`                                    | `Popover.tsx:120`                         | default slot `{ close }`       | `Popover.vue:73,291`         | —                                          | transposed |                                  |
| `open`                                        | `Popover.tsx:121`                         | `v-model:open`                 | `Popover.vue:84,111`         | `false`                                    | transposed |                                  |
| `defaultOpen`                                 | `Popover.tsx:122`                         | `defaultOpen` on `PopoverRoot` | `PopoverRoot.vue:5`          | `false`                                    | ported     |                                  |
| `onOpenChange`                                | `Popover.tsx:123`                         | `update:open`                  | `Popover.vue:84`             | —                                          | transposed |                                  |
| `position`                                    | `Popover.tsx:124`, `POSITIONS` table `40` | `position`                     | `Popover.vue:65,104,148`     | `bottom`                                   | ported     | 13 tokens                        |
| `offset`                                      | `Popover.tsx:125`                         | `offset`                       | `Popover.vue:63,101,154`     | `0`                                        | ported     | `number                          | string | [main,cross]`, `%`→`calc(anchor-size() * f)` |
| `viewportMargin`                              | `Popover.tsx:126`                         | `viewportMargin`               | `Popover.vue:69,106,158`     | `4`                                        | ported     |                                  |
| `anchorRef`                                   | `Popover.tsx:127`                         | `anchorElement`                | `Popover.vue:53,244`         | —                                          | transposed | `RefObject` → `HTMLElement` prop |
| `anchorRect`                                  | `Popover.tsx:128`                         | `anchorRect`                   | `Popover.vue:54,161`         | —                                          | ported     |                                  |
| `color`                                       | `Popover.tsx:129`                         | `color`                        | `Popover.vue:59,122`         | —                                          | ported     |                                  |
| `backdrop`                                    | `Popover.tsx:130`                         | `backdrop`                     | `Popover.vue:55,99,270`      | `false`                                    | ported     |                                  |
| `backdropTransparent`                         | `Popover.tsx:131`                         | `backdropTransparent`          | `Popover.vue:56,100,229`     | `false`                                    | ported     |                                  |
| `closeOnBackdropClick`                        | `Popover.tsx:132`                         | `closeOnBackdropClick`         | `Popover.vue:57,101,203`     | `true`                                     | ported     |                                  |
| `closeOnEscape`                               | `Popover.tsx:133`                         | `closeOnEscape`                | `Popover.vue:58,102,192`     | `true`                                     | ported     | Suppressed when child overlay    |
| `lazy`                                        | `Popover.tsx:134`                         | `lazy`                         | `Popover.vue:62,103,194`     | `false`                                    | ported     |                                  |
| `disabled`                                    | `Popover.tsx:135`                         | `disabled`                     | `Popover.vue:61,99,178`      | `false`                                    | ported     |                                  |
| `root`                                        | `Popover.tsx:136`                         | `root`                         | `Popover.vue:66,98,167`      | `'#app, #__next, #root'`                   | ported     |                                  |
| `surfaceLevel`                                | `Popover.tsx:137`                         | `surfaceLevel`                 | `Popover.vue:67,104,285`     | `light:1 dark:+1`                          | ported     |                                  |
| `variant`                                     | `Popover.tsx:138`                         | `variant`                      | `Popover.vue:68,102,125,288` | `light:solid dark:gradient`                | ported     |                                  |
| `contentClassName`                            | `Popover.tsx:139`                         | `contentClassName`             | `Popover.vue:60,99,224`      | `h-auto max-h-[70vh] w-full overflow-auto` | ported     |                                  |
| `className`                                   | `Popover.tsx:140`                         | `class` via `$attrs`           | `Popover.vue:50,89,215`      | —                                          | transposed | Routed to Surface                |
| `onClosing`/`onClosed`/`onOpening`/`onOpened` | `Popover.tsx:141`                         | `@closing` etc                 | `Popover.vue:77,195`         | —                                          | transposed |                                  |

## Copied literals

| Value                                                                                                                                                                                    | Upstream ref            | Vue ref                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------ |
| `popoverContainerClasses: cladd-popover`                                                                                                                                                 | `Popover.tsx:40`        | `overlay.contracts.ts:172`     |
| `popoverSurfaceClasses: pointer-events-auto absolute z-50 flex w-40 max-w-[calc(100vw-16px)] rounded-cladd-popover shadow-cladd-popover transition-[opacity,transform,scale] duration-0` | `Popover.tsx:41`        | `overlay.contracts.ts:174`     |
| `popoverOpenedClasses: scale-100 opacity-100 ease-[cubic-bezier(0,1,0,1.025)]`                                                                                                           | `Popover.tsx:42`        | `overlay.contracts.ts:177`     |
| `popoverEnterDurationClasses: duration-300`                                                                                                                                              | `Popover.tsx:43`        | `overlay.contracts.ts:180`     |
| `popoverClosingClasses: duration-200 ease-in-out!`                                                                                                                                       | `Popover.tsx:44`        | `overlay.contracts.ts:182`     |
| `popoverHiddenClasses: scale-0 opacity-0`                                                                                                                                                | `Popover.tsx:45`        | `overlay.contracts.ts:184`     |
| `popoverContentClasses: h-auto max-h-[70vh] w-full overflow-auto`                                                                                                                        | `Popover.tsx:46`        | `overlay.contracts.ts:186`     |
| `POSITIONS` table 13 entries                                                                                                                                                             | `Popover.tsx:50`–`120`  | `overlay.contracts.ts:8,51`    |
| `popoverPositionTryFallbacks: flip-block, flip-inline, flip-block flip-inline`                                                                                                           | `Popover.tsx:155`       | `overlay.contracts.ts:146`     |
| `popoverChildOverlaySelector: .cladd-popover, .cladd-dialog`                                                                                                                             | `Popover.tsx:340`       | `overlay.contracts.ts:153`     |
| `buildPopoverPositionStyle` offset `%` → `calc(anchor-size() * f)`                                                                                                                       | `Popover.tsx:170`–`210` | `overlay.contracts.ts:376,401` |

## Deviations

- `anchorRef` → `anchorElement` prop rename — transposition (`RefObject` → `HTMLElement`), behavior identical.
- `open` + `onOpenChange` → `v-model:open` — transposition.
- `PopoverSurfaceReset` flattening at `level 1` in light theme reproduced via `Popover.vue:141` `resolveSurfaceLevel` + `SurfaceContextProvider` wrapper.

## Verification

`Popover.tsx` diffed against `Popover.vue` + `overlay.contracts.ts` + `popoverChain.ts`. Position table locked by `tests/components/overlays.test.ts` and `tests/foundations/overlayLifecycle.test.ts` (13 positions, viewport, origin). Chain exclusivity verified in `overlays.test.ts:253`.
