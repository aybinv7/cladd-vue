# Port manifest: `Toolbar` (`Toolbar`, `ToolbarButton`, `ToolbarSeparator`)

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/Toolbar.tsx`, `src/components/ToolbarButton.tsx`, `src/components/ToolbarSeparator.tsx`, `src/components/ToolbarContext.tsx`
- Vue files: `src/components/Toolbar.vue`, `src/components/ToolbarButton.vue`, `src/components/ToolbarSeparator.vue`, `src/components/toolbar.contracts.ts`, `src/components/toolbarContext.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

### Toolbar

| Upstream prop  | Upstream ref     | Vue surface    | Vue ref          | Default | Verdict | Note                    |
| -------------- | ---------------- | -------------- | ---------------- | ------- | ------- | ----------------------- |
| `size`         | `Toolbar.tsx:16` | `size`         | `Toolbar.vue:16` | `'md'`  | ported  | Control size token.     |
| `surfaceLevel` | `Toolbar.tsx:18` | `surfaceLevel` | `Toolbar.vue:17` | `4`     | ported  | Embedded surface level. |
| `rounded`      | `Toolbar.tsx:20` | `rounded`      | `Toolbar.vue:15` | `true`  | ported  | Pill container.         |

## Copied literals

| Value                                  | Upstream ref        | Vue ref                     |
| -------------------------------------- | ------------------- | --------------------------- |
| Toolbar container flex and gap styling | `Toolbar.tsx:28-40` | `toolbar.contracts.ts:5-24` |

## Deviations

None.

## Verification

Tested toolbar composition, button sizing, and separators in `tests/components/actions.test.ts`.
