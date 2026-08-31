# Port manifest: `Toast`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Toast.tsx`, `src/hooks/use-toast.ts`,
  `src/components/ToastRoot.tsx`
- Vue files: `src/components/Toast.vue`, `src/components/ToastRoot.vue`,
  `src/components/ToastTrigger.vue`, `src/components/ToastClose.vue`,
  `src/composables/useToast.ts`, `src/components/feedback.contracts.ts`
- Diffed: 2026-08-31, upstream read from `reference/cladd/`

## Props

| Upstream prop  | Upstream ref   | Vue surface    | Vue ref           | Default | Verdict    | Note |
| -------------- | -------------- | -------------- | ----------------- | ------- | ---------- | ---- |
| `children`     | `Toast.tsx:20` | default slot   | `Toast.vue:20`    | —       | transposed |      |
| `open`         | `Toast.tsx:21` | `v-model:open` | `Toast.vue:30`    | `false` | transposed |      |
| `duration`     | `Toast.tsx:22` | `duration`     | `Toast.vue:31,40` | `3000`  | ported     |      |
| `color`        | `Toast.tsx:23` | `color`        | `Toast.vue:32,50` | —       | ported     |      |
| `variant`      | `Toast.tsx:24` | `variant`      | `Toast.vue:33,51` | `solid` | ported     |      |
| `className`    | `Toast.tsx:25` | `class`        | `Toast.vue:15,45` | —       | transposed |      |
| `onOpenChange` | `Toast.tsx:26` | `update:open`  | `Toast.vue:30`    | —       | transposed |      |

## Copied literals

| Value                                                         | Upstream ref   | Vue ref                    |
| ------------------------------------------------------------- | -------------- | -------------------------- |
| `toastClasses: fixed bottom-0 z-50 flex max-w-full p-4`       | `Toast.tsx:30` | `feedback.contracts.ts:20` |
| `toastSurfaceClasses: rounded-cladd-toast shadow-cladd-toast` | `Toast.tsx:31` | `feedback.contracts.ts:22` |

## Deviations

- `useToast` timeout management uses Vue `ref` + `watch` vs React `useEffect`; behavior identical (auto-close after `duration`, pause on hover).
- `ToastRoot` portal target `overlaysRoot` same as other overlays.

## Verification

Props compared via `tests/parity/upstreamProps.test.ts` (`notImplemented` empty for Toast). Visual `Toast` locked via `tests/components/feedback.test.ts` if present, else via playground `Toast` section.
