# Port manifest: `CollapsibleRoot`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/CollapsibleRoot.tsx`, `src/components/CollapsibleContext.tsx`
- Vue files: `src/components/CollapsibleRoot.vue`, `src/components/collapsible.contracts.ts`, `src/components/collapsibleContext.ts`
- Diffed: 2026-08-03, upstream read from `reference/cladd/`

Read upstream paths below as `reference/cladd/<path>`. Vue paths are relative to `packages/ui/`.

## Props

| Upstream prop                                    | Upstream ref             | Vue surface         | Vue ref                        | Default     | Verdict    | Note                                                                                                                                                                                                       |
| ------------------------------------------------ | ------------------------ | ------------------- | ------------------------------ | ----------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`                                       | `CollapsibleRoot.tsx:8`  | default slot        | `CollapsibleRoot.vue:52`       | —           | transposed | `ReactNode` prop to slot. Renders no DOM of its own; the slot is the only output.                                                                                                                          |
| `open`                                           | `CollapsibleRoot.tsx:10` | `open`              | `CollapsibleRoot.vue:11,28–31` | `undefined` | ported     | When provided, `isControlled` is `true` (`CollapsibleRoot.vue:28`) and internal state is bypassed (`CollapsibleRoot.vue:30`), matching `CollapsibleRoot.tsx:56`–`57`.                                      |
| `defaultOpen`                                    | `CollapsibleRoot.tsx:12` | `defaultOpen`       | `CollapsibleRoot.vue:10,25,27` | `false`     | ported     | Initializes `internalOpen` (`CollapsibleRoot.vue:27`). Ignored when `open` is provided.                                                                                                                    |
| `onOpenChange`                                   | `CollapsibleRoot.tsx:14` | `update:open` event | `CollapsibleRoot.vue:15,36`    | —           | transposed | Upstream callback `onOpenChange(next)` (`CollapsibleRoot.tsx:62`) → Vue `emit('update:open', next)` (`CollapsibleRoot.vue:36`). Same observable effect: the consumer is notified of state change requests. |
| `disabled`                                       | `CollapsibleRoot.tsx:16` | `disabled`          | `CollapsibleRoot.vue:9,23,34`  | `false`     | ported     | Guards `setOpen` on both sides (`CollapsibleRoot.tsx:60` → `CollapsibleRoot.vue:34`). Published to context for `CollapsibleTrigger` to consume.                                                            |
| `ref`                                            | —                        | —                   | —                              | —           | —          | Not declared upstream either; `CollapsibleRoot` renders no DOM.                                                                                                                                            |
| `useComponentDefaults('CollapsibleRoot', props)` | `CollapsibleRoot.tsx:53` | —                   | —                              | —           | deviated   | `useComponentDefaults` is ported (`CollapsibleRoot.vue:22–25`) but provider-supplied defaults are a package-wide gap (audit finding 7).                                                                    |

## Context

| Upstream                                                                                  | Upstream ref                    | Vue                                                         | Vue ref                        | Verdict    | Note                                                                |
| ----------------------------------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------- | ------------------------------ | ---------- | ------------------------------------------------------------------- |
| `CollapsibleContextValue` shape `{ open, toggle, setOpen, disabled, triggerId, panelId }` | `CollapsibleContext.tsx:8`–`21` | `CollapsibleContextValue` identical shape                   | `collapsibleContext.ts:3`–`10` | ported     | Same six members, same names, same types.                           |
| `createContext(null)` default                                                             | `CollapsibleContext.tsx:23`     | `inject(key, null)` default                                 | `collapsibleContext.ts:17`     | transposed | React `createContext` → Vue `provide`/`inject` with `InjectionKey`. |
| `useId()` for base IDs                                                                    | `CollapsibleRoot.tsx:46`        | Vue `useId()`                                               | `CollapsibleRoot.vue:26`       | transposed | Same purpose: generates unique IDs for `triggerId` and `panelId`.   |
| `useState(defaultOpen)`                                                                   | `CollapsibleRoot.tsx:55`        | `shallowRef(defaultOpen)`                                   | `CollapsibleRoot.vue:27`       | transposed | React `useState` → Vue `shallowRef`.                                |
| `isControlled = openProp !== undefined`                                                   | `CollapsibleRoot.tsx:56`        | `isControlled = computed(() => d.value.open !== undefined)` | `CollapsibleRoot.vue:28`       | transposed | `computed` instead of plain boolean; same logic.                    |
| Error message for missing provider                                                        | `CollapsibleContext.tsx:39`     | `collapsibleContext.ts:21`                                  | `collapsibleContext.ts:21`     | ported     | Same error string.                                                  |

## Copied literals

| Value                                   | Upstream ref                | Vue ref                    |
| --------------------------------------- | --------------------------- | -------------------------- |
| `triggerId` = `` `${baseId}-trigger` `` | `CollapsibleRoot.tsx:72`    | `CollapsibleRoot.vue:46`   |
| `panelId` = `` `${baseId}-panel` ``     | `CollapsibleRoot.tsx:73`    | `CollapsibleRoot.vue:43`   |
| Error: `'cladd-vue: …'`                 | `CollapsibleContext.tsx:39` | `collapsibleContext.ts:21` |

## Deviations

- `onOpenChange` callback → `update:open` emitted event. Upstream fires `onOpenChange?.(next)` (`CollapsibleRoot.tsx:62`) as a callback prop. Vue emits `'update:open'` (`CollapsibleRoot.vue:36`). This is the standard Vue pattern for two-way binding (`v-model:open`), but a consumer using `@update:open` must write `@update:open="handler"` instead of `:onOpenChange="handler"`. The API surface is different even though the behavior is the same.
- `useState` (`CollapsibleRoot.tsx:55`) → `shallowRef` (`CollapsibleRoot.vue:27`). React's `useState` triggers re-render on state change; Vue's `shallowRef` triggers reactivity through `.value` assignment. The `.value` is read through `open` computed (`CollapsibleRoot.vue:29–31`), which is reactive. No observable difference.
- `useComponentDefaults` is called (`CollapsibleRoot.vue:22`) but the `uiContext` carries no `CollapsibleRootDefaultProps` — the function returns the original props unchanged for this component.
- Upstream `CollapsibleRootProps` includes `onOpenChange` as a callback prop (`CollapsibleRoot.tsx:14`). Vue `CollapsibleRootProps` (`collapsible.contracts.ts:3–10`) omits it entirely; the event is declared via `defineEmits` (`CollapsibleRoot.vue:14–16`). The typed public API differs.
- Error message prefix: upstream says `'Cladd: …'` (`CollapsibleContext.tsx:39`); Vue says `'cladd-vue: …'` (`collapsibleContext.ts:21`). Same structure, different package name.

## Verification

Compared prop-by-prop against `CollapsibleRoot.tsx`. The controlled/uncontrolled state logic was traced line-by-line on both sides. The context shape was compared member-by-member between `CollapsibleContext.tsx:8`–`21` and `collapsibleContext.ts:3`–`10`. The `baseId` → `triggerId`/`panelId` derivation was verified. The error message was compared.

Not verified here: `CollapsibleTrigger`, `CollapsiblePanel`, `CollapsibleIndicator`, `AccordionItem`, or `useComponentDefaults` provider resolution (package-wide gap).
