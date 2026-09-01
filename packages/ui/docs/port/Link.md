# Port manifest: `Link`

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Link.tsx`
- Vue files: `src/components/Link.vue`, `src/components/link.contracts.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

| Upstream prop | Upstream ref  | Vue surface  | Vue ref       | Default     | Verdict    | Note                                                                                 |
| ------------- | ------------- | ------------ | ------------- | ----------- | ---------- | ------------------------------------------------------------------------------------ |
| `as`          | `Link.tsx:29` | `as`         | `Link.vue:12` | `undefined` | ported     | Polymorphic link element.                                                            |
| `href`        | `Link.tsx:35` | `href`       | `Link.vue:16` | `undefined` | ported     | Native `href`. When provided, polymorphic default switches from `'button'` to `'a'`. |
| `color`       | `Link.tsx:17` | `color`      | `Link.vue:13` | `undefined` | ported     | Accent color token.                                                                  |
| `disabled`    | `Link.tsx:23` | `disabled`   | `Link.vue:14` | `false`     | ported     | Native `disabled` attribute.                                                         |
| `readOnly`    | `Link.tsx:25` | `readOnly`   | `Link.vue:17` | `false`     | ported     | Native `readOnly` attribute.                                                         |
| `focusable`   | `Link.tsx:31` | `focusable`  | `Link.vue:15` | `true`      | ported     | Renders a `FocusRing` on keyboard focus.                                             |
| `children`    | `Link.tsx:19` | default slot | `Link.vue:69` | —           | transposed | `ReactNode` children transposes to slot.                                             |

## Copied literals

| Value                | Upstream ref     | Vue ref          |
| -------------------- | ---------------- | ---------------- |
| Link utility classes | `Link.tsx:81-90` | `Link.vue:44-54` |

## Deviations

None.

## Verification

Verified polymorphic rendering and click events in `tests/components/actions.test.ts`.
