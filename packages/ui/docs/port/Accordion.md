# Port manifest: `Accordion` (`AccordionRoot`, `AccordionItem`)

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/AccordionRoot.tsx`, `src/components/AccordionItem.tsx`, `src/components/AccordionContext.tsx`
- Vue files: `src/components/AccordionRoot.vue`, `src/components/AccordionItem.vue`, `src/components/accordion.contracts.ts`, `src/components/accordionContext.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

### AccordionRoot

| Upstream prop   | Upstream ref           | Vue surface                         | Vue ref                | Default     | Verdict    | Note                                               |
| --------------- | ---------------------- | ----------------------------------- | ---------------------- | ----------- | ---------- | -------------------------------------------------- |
| `value`         | `AccordionRoot.tsx:14` | `value` / `v-model`                 | `AccordionRoot.vue:12` | `undefined` | transposed | Two-way model binding in Vue.                      |
| `defaultValue`  | `AccordionRoot.tsx:16` | `defaultValue`                      | `AccordionRoot.vue:10` | `undefined` | ported     | Uncontrolled default state.                        |
| `onValueChange` | `AccordionRoot.tsx:22` | `update:modelValue` / `change` emit | `AccordionRoot.vue:18` | —           | transposed | `onValueChange` callback transposes to Vue emit.   |
| `multiple`      | `AccordionRoot.tsx:24` | `multiple`                          | `AccordionRoot.vue:13` | `false`     | ported     | Allows multiple accordion items open concurrently. |
| `disabled`      | `AccordionRoot.tsx:26` | `disabled`                          | `AccordionRoot.vue:9`  | `false`     | ported     | Disable the whole accordion.                       |
| `children`      | `AccordionRoot.tsx:8`  | default slot                        | `AccordionRoot.vue:90` | —           | transposed | `ReactNode` children transposes to slot.           |

### AccordionItem

| Upstream prop | Upstream ref           | Vue surface          | Vue ref                | Default  | Verdict    | Note                                            |
| ------------- | ---------------------- | -------------------- | ---------------------- | -------- | ---------- | ----------------------------------------------- |
| `value`       | `AccordionItem.tsx:14` | `value`              | `AccordionItem.vue:11` | required | ported     | Unique value identifier for the accordion item. |
| `disabled`    | `AccordionItem.tsx:16` | `disabled`           | `AccordionItem.vue:10` | `false`  | ported     | Dim and disable interaction for the item.       |
| `className`   | `AccordionItem.tsx:12` | `class` via `$attrs` | `AccordionItem.vue:51` | —        | transposed | Forwarded as attribute.                         |
| `children`    | `AccordionItem.tsx:10` | default slot         | `AccordionItem.vue:61` | —        | transposed | `ReactNode` children transposes to slot.        |

## Copied literals

| Value                                      | Upstream ref           | Vue ref                |
| ------------------------------------------ | ---------------------- | ---------------------- |
| AccordionItem class `cladd-accordion-item` | `AccordionItem.tsx:73` | `AccordionItem.vue:51` |

AccordionRoot renders no DOM of its own — it is a stateful context provider only.

## Deviations

None.

## Verification

Compared `AccordionRoot.tsx` and `AccordionItem.tsx` with Vue SFC implementations and contracts. Tested under happy-dom Vitest suite in `tests/components/disclosure.test.ts`.
