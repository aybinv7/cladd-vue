# Port manifest: `Dialog`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Dialog.tsx`, `src/components/Backdrop.tsx`,
  `src/components/ModalController.tsx`, `src/hooks/use-modal-utils.ts`,
  `src/hooks/use-focus-trap.ts`, `src/components/Surface.tsx`
- Vue files: `src/components/Dialog.vue`, `src/components/DialogRoot.vue`,
  `src/components/DialogTrigger.vue`, `src/components/DialogClose.vue`,
  `src/components/Backdrop.vue`, `src/composables/useOverlayLifecycle.ts`,
  `src/composables/useOverlayPhase.ts`, `src/composables/useFocusTrap.ts`,
  `src/components/overlay.contracts.ts`, `src/components/overlayRootContext.ts`
- Diffed: 2026-08-31, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

| Upstream prop                                               | Upstream ref             | Vue surface                   | Vue ref                 | Default                   | Verdict    | Note                                                                                            |
| ----------------------------------------------------------- | ------------------------ | ----------------------------- | ----------------------- | ------------------------- | ---------- | ----------------------------------------------------------------------------------------------- |
| `children`                                                  | `Dialog.tsx:140`         | default slot `{ close }`      | `Dialog.vue:74,305`     | —                         | transposed | `ReactNode` → slot                                                                              |
| `title`                                                     | `Dialog.tsx:142`         | `title`                       | `Dialog.vue:70,289`     | —                         | ported     | JSDoc copied                                                                                    |
| `text` (`description` in Vue `description` → `text` rename) | `Dialog.tsx:143`         | `text`                        | `Dialog.vue:65,298`     | —                         | deviated   | Upstream `description`, Vue `text` for DOM clarity; still `aria-describedby` wired              |
| `open`                                                      | `Dialog.tsx:144`         | `v-model:open`                | `Dialog.vue:91,119`     | `false`                   | transposed | `open` + `onOpenChange` → `defineModel('open')`                                                 |
| `defaultOpen`                                               | `DialogRoot.tsx:10`      | `defaultOpen` on `DialogRoot` | `DialogRoot.vue:6`      | `false`                   | ported     | Only on `DialogRoot`, not `Dialog`                                                              |
| `onOpenChange`                                              | `Dialog.tsx:145`         | `update:open`                 | `Dialog.vue:91`         | —                         | transposed |                                                                                                 |
| `color`                                                     | `Dialog.tsx:146`         | `color`                       | `Dialog.vue:62,132`     | `''` → `undefined`        | ported     | Sets `cladd-color-*` on Surface                                                                 |
| `confirmButtonColor`                                        | `Dialog.tsx:147`         | `confirmButtonColor`          | `Dialog.vue:63,135`     | theme accent              | ported     |                                                                                                 |
| `cancelButtonColor`                                         | `Dialog.tsx:148`         | `cancelButtonColor`           | `Dialog.vue:55,106`     | `neutral`                 | ported     |                                                                                                 |
| `confirmButtonText`                                         | `Dialog.tsx:149`         | `confirmButtonText`           | `Dialog.vue:64,333`     | —                         | ported     | Was `confirmText` in audit, renamed to `confirmButtonText` per `upstream-parity-realignment.md` |
| `cancelButtonText`                                          | `Dialog.tsx:150`         | `cancelButtonText`            | `Dialog.vue:56,322`     | —                         | ported     | Was `cancelText`, renamed                                                                       |
| `requireConfirmText`                                        | `Dialog.tsx:151`         | `requireConfirmText`          | `Dialog.vue:68,141,307` | —                         | ported     | Guards confirm                                                                                  |
| `inertContainer`                                            | `Dialog.tsx:152`         | `inertContainer`              | `Dialog.vue:59,110,182` | `'.app-container'`        | ported     |                                                                                                 |
| `lazy`                                                      | `Dialog.tsx:153`         | `lazy`                        | `Dialog.vue:60,111,201` | `false`                   | ported     | Defers `opened` via double rAF                                                                  |
| `stopPropagationOnClick`                                    | `Dialog.tsx:154`         | `stopPropagationOnClick`      | `Dialog.vue:61,112,245` | `false`                   | ported     |                                                                                                 |
| `closeOnBackdropClick`                                      | `Dialog.tsx:155`         | `closeOnBackdropClick`        | `Dialog.vue:57,105,220` | `true`                    | ported     |                                                                                                 |
| `closeOnEscape`                                             | `Dialog.tsx:156`         | `closeOnEscape`               | `Dialog.vue:58,108,199` | `true`                    | ported     | Suppressed when child overlay exists                                                            |
| `backdropTransparent`                                       | `Dialog.tsx:157`         | `backdropTransparent`         | `Dialog.vue:53,106,237` | `false`                   | ported     |                                                                                                 |
| `surfaceLevel`                                              | `Dialog.tsx:158`         | `surfaceLevel`                | `Dialog.vue:69,113,284` | `1`                       | ported     | Forwarded to `Surface` `level`                                                                  |
| `variant`                                                   | `Dialog.tsx:159`         | `variant`                     | `Dialog.vue:71,114,286` | `gradient`                | ported     |                                                                                                 |
| `root`                                                      | `Dialog.tsx:160`         | `root`                        | `Dialog.vue:68,145,266` | `'#app, #__next, #root'`  | transposed | `string                                                                                         | HTMLElement`→`string | HTMLElement`, via `useUiContext().overlaysRoot` |
| `contentClassName`                                          | `Dialog.tsx:161`         | `contentClassName`            | `Dialog.vue:54,107,234` | `flex flex-col gap-4 p-4` | ported     |                                                                                                 |
| `className`                                                 | `Dialog.tsx:162`         | `class` via `$attrs`          | `Dialog.vue:50,96,230`  | —                         | transposed | Routed to Surface, not trigger                                                                  |
| `onCancel` / `onConfirm`                                    | `Dialog.tsx:163`         | `@cancel` / `@confirm`        | `Dialog.vue:83,160,164` | —                         | transposed |                                                                                                 |
| `onOpened` / `onOpening` / `onClosing` / `onClosed`         | `ModalController.tsx:40` | `@opened` etc                 | `Dialog.vue:83`         | —                         | transposed | Via `useOverlayLifecycle`                                                                       |

## Copied literals

| Value                                                                                                                      | Upstream ref     | Vue ref                    |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------- |
| `dialogContainerClasses: cladd-dialog`                                                                                     | `Dialog.tsx:180` | `overlay.contracts.ts:203` |
| `dialogSurfaceClasses: fixed top-1/2 left-1/2 z-50 w-80 max-w-full -translate-x-1/2 -translate-y-1/2 rounded-cladd-dialog` | `Dialog.tsx:181` | `overlay.contracts.ts:205` |
| `dialogHiddenClasses: scale-75 opacity-0 duration-200 ease-out!`                                                           | `Dialog.tsx:182` | `overlay.contracts.ts:208` |
| `dialogOpenedClasses: scale-100 opacity-100 duration-500 ease-[cubic-bezier(0,1,0.2,1.1)]`                                 | `Dialog.tsx:183` | `overlay.contracts.ts:210` |
| `dialogContentClasses: flex flex-col gap-4 p-4`                                                                            | `Dialog.tsx:184` | `overlay.contracts.ts:213` |
| `dialogTitleClasses: text-cladd-md font-semibold`                                                                          | `Dialog.tsx:185` | `overlay.contracts.ts:215` |
| `dialogTextClasses: text-cladd-sm leading-relaxed`                                                                         | `Dialog.tsx:186` | `overlay.contracts.ts:217` |
| `dialogButtonsClasses: mt-4 flex flex-wrap items-center justify-end gap-2`                                                 | `Dialog.tsx:187` | `overlay.contracts.ts:219` |
| `dialogInertHoldSelector: .cladd-popover, .cladd-popup`                                                                    | `Dialog.tsx:318` | `overlay.contracts.ts:156` |
| `dialogChildOverlaySelector: .cladd-popover, .cladd-dialog, .cladd-popup`                                                  | `Dialog.tsx:340` | `overlay.contracts.ts:158` |
| `backdropClasses: cladd-backdrop fixed inset-0 z-50 bg-cladd-backdrop/90`                                                  | `Backdrop.tsx:8` | `overlay.contracts.ts:163` |

## Deviations

- `description` → `text` prop rename for DOM `aria-describedby` clarity; behavior identical.
- `confirmText`/`cancelText` → `confirmButtonText`/`cancelButtonText` per parity realignment; previously stale names in playground labs, now ported.
- `open` + `onOpenChange` → `v-model:open` (`defineModel`) — transposition, not deviation, but listed for traceability.
- Vue adds `provideSurfaceColorReset()` at portal boundary because `provide/inject` crosses Teleport like React context; upstream has `SurfaceColorReset` same place.

## Verification

Compared `Dialog.tsx` 17992 bytes line-for-line against `Dialog.vue` + contracts + composables. Utility strings diffed via `tests/components/overlays.test.ts` (backdrop, surface, title/text, buttons) and `tests/foundations/overlayLifecycle.test.ts` (portal/inert/focus). `DialogRoot`/`Trigger`/`Close` compound verified via `src/index.ts` exports and `tests/parity/upstreamExports.test.ts` (`notYetPorted` empty).
