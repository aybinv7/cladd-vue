# Port manifest: `Popup`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Popup.tsx`, `src/components/Backdrop.tsx`,
  `src/components/ModalController.tsx`, `src/hooks/use-modal-utils.ts`,
  `src/hooks/use-focus-trap.ts`
- Vue files: `src/components/Popup.vue`, `src/components/PopupRoot.vue`,
  `src/components/PopupTrigger.vue`, `src/components/PopupClose.vue`,
  `src/components/PopupContent.vue`, `src/composables/useOverlayLifecycle.ts`,
  `src/components/popup.contracts.ts`
- Diffed: 2026-08-31, upstream read from `reference/cladd/`

## Props

| Upstream prop          | Upstream ref   | Vue surface                  | Vue ref                | Default                  | Verdict    | Note                          |
| ---------------------- | -------------- | ---------------------------- | ---------------------- | ------------------------ | ---------- | ----------------------------- |
| `children`             | `Popup.tsx:40` | default slot `{ close }`     | `Popup.vue:74,350`     | —                        | transposed |                               |
| `open`                 | `Popup.tsx:41` | `v-model:open`               | `Popup.vue:89,116`     | `false`                  | transposed |                               |
| `defaultOpen`          | `Popup.tsx:42` | `defaultOpen` on `PopupRoot` | `PopupRoot.vue:5`      | `false`                  | ported     |                               |
| `onOpenChange`         | `Popup.tsx:43` | `update:open`                | `Popup.vue:89`         | —                        | transposed |                               |
| `header`               | `Popup.tsx:44` | `header`                     | `Popup.vue:64,314`     | `true`                   | ported     |                               |
| `backdrop`             | `Popup.tsx:45` | `backdrop`                   | `Popup.vue:57,99,305`  | `true`                   | ported     |                               |
| `closeButton`          | `Popup.tsx:46` | `closeButton`                | `Popup.vue:59,100,328` | `true`                   | ported     |                               |
| `closeOnBackdropClick` | `Popup.tsx:47` | `closeOnBackdropClick`       | `Popup.vue:61,101,244` | `true`                   | ported     |                               |
| `closeOnEscape`        | `Popup.tsx:48` | `closeOnEscape`              | `Popup.vue:62,102,141` | `true`                   | ported     | Suppressed when child overlay |
| `lazy`                 | `Popup.tsx:49` | `lazy`                       | `Popup.vue:67,105,143` | `false`                  | ported     |                               |
| `inertContainer`       | `Popup.tsx:50` | `inertContainer`             | `Popup.vue:66,104,185` | `'.app-container'`       | ported     |                               |
| `root`                 | `Popup.tsx:51` | `root`                       | `Popup.vue:68,106,154` | `'#app, #__next, #root'` | ported     |                               |
| `ariaLabel` etc        | `Popup.tsx:52` | `ariaLabel`                  | `Popup.vue:54,291`     | —                        | transposed |                               |
| `contentClassName`     | `Popup.tsx:53` | `contentClassName`           | `Popup.vue:63,102,178` | `!h-auto w-full p-4`     | ported     |                               |
| `className`            | `Popup.tsx:54` | `class` via `$attrs`         | `Popup.vue:51,155,180` | —                        | transposed |                               |

## Copied literals

| Value                                                                                                                             | Upstream ref   | Vue ref                 |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------------------- |
| `popupContainerClasses: cladd-popup fixed inset-0 z-50 flex flex-col justify-center overflow-hidden`                              | `Popup.tsx:60` | `popup.contracts.ts:20` |
| `popupWrapperClasses: cladd-popup-wrapper absolute inset-0 z-50 h-fit max-h-full self-center overflow-auto pt-safe-12 pb-safe-12` | `Popup.tsx:61` | `popup.contracts.ts:22` |
| `popupWrapperOpenedClasses: duration-500 ease-[cubic-bezier(0,1,0.2,1)]`                                                          | `Popup.tsx:62` | `popup.contracts.ts:24` |
| `popupWrapperClosedClasses: translate-y-[100vh] scale-x-65 duration-200 ease-[ease-in]`                                           | `Popup.tsx:63` | `popup.contracts.ts:26` |
| `popupBackdropClasses: bg-cladd-backdrop/90 duration-200`                                                                         | `Popup.tsx:64` | `popup.contracts.ts:30` |
| `popupStackTransform: translateY(-16px) scale(0.9) per level`                                                                     | `Popup.tsx:70` | `popup.contracts.ts:32` |

## Deviations

- `open` + `onOpenChange` → `v-model:open` — transposition.
- Vue `Popup` adds `provideSurfaceColorReset()` same as Dialog; upstream same.

## Verification

Diffed `Popup.tsx` against `Popup.vue` + contracts. Stack transform locked in `tests/components/overlays.test.ts` (`popupStackTransform`). Lifecycle via `useOverlayLifecycle` same as Dialog.
