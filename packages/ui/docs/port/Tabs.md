# Port manifest: `Tabs` (`Tabs`, `TabsList`, `Tab`, `TabPanel`)

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Tabs.tsx`, `src/components/TabsList.tsx`, `src/components/Tab.tsx`, `src/components/TabPanel.tsx`, `src/components/TabsContext.tsx`
- Vue files: `src/components/Tabs.vue`, `src/components/TabsList.vue`, `src/components/Tab.vue`, `src/components/TabPanel.vue`, `src/components/tabs.contracts.ts`, `src/components/tabsContext.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

### Tabs

| Upstream prop   | Upstream ref  | Vue surface              | Vue ref       | Default     | Verdict    | Note                      |
| --------------- | ------------- | ------------------------ | ------------- | ----------- | ---------- | ------------------------- |
| `value`         | `Tabs.tsx:14` | `modelValue` / `v-model` | `Tabs.vue:22` | `undefined` | transposed | Active tab value.         |
| `defaultValue`  | `Tabs.tsx:16` | `defaultValue`           | `Tabs.vue:15` | `undefined` | ported     | Uncontrolled default tab. |
| `onValueChange` | `Tabs.tsx:18` | `change` emit            | `Tabs.vue:25` | —           | transposed | Value change emit.        |

### Tab

| Upstream prop | Upstream ref | Vue surface | Vue ref      | Default  | Verdict | Note            |
| ------------- | ------------ | ----------- | ------------ | -------- | ------- | --------------- |
| `value`       | `Tab.tsx:12` | `value`     | `Tab.vue:14` | required | ported  | Tab identifier. |
| `disabled`    | `Tab.tsx:14` | `disabled`  | `Tab.vue:13` | `false`  | ported  | Dim tab.        |

### TabPanel

| Upstream prop | Upstream ref      | Vue surface | Vue ref           | Default  | Verdict | Note                       |
| ------------- | ----------------- | ----------- | ----------------- | -------- | ------- | -------------------------- |
| `value`       | `TabPanel.tsx:10` | `value`     | `TabPanel.vue:12` | required | ported  | Matching panel identifier. |

## Copied literals

| Value                               | Upstream ref     | Vue ref                  |
| ----------------------------------- | ---------------- | ------------------------ |
| Tabs container and indicator styles | `Tabs.tsx:28-40` | `tabs.contracts.ts:5-25` |

## Deviations

None.

## Verification

Tested tab switching, panel mounting/unmounting, and ARIA roles in `tests/components/navigation.test.ts`.
