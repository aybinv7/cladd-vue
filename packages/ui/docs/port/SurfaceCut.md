# Port manifest: `SurfaceCut` (`SurfaceCut`, `SurfaceCutContent`)

- Upstream commit: `fadd8efe935111f31d7c933238db5ce5d3a55d71` (`@cladd-ui/react` 0.18.5)
- Upstream files: `src/components/SurfaceCut.tsx`, `src/components/SurfaceCutContent.tsx`
- Vue files: `src/components/SurfaceCut.vue`, `src/components/SurfaceCutContent.vue`, `src/components/surface.contracts.ts`
- Diffed: 2026-09-01, upstream read from `reference/cladd/`

Read upstream paths as `reference/cladd/<path>`. Vue paths relative to `packages/ui/`.

## Props

### SurfaceCut

| Upstream prop | Upstream ref        | Vue surface   | Vue ref             | Default     | Verdict | Note                                |
| ------------- | ------------------- | ------------- | ------------------- | ----------- | ------- | ----------------------------------- |
| `as`          | `SurfaceCut.tsx:39` | `as`          | `SurfaceCut.vue:15` | `'div'`     | ported  | Polymorphic root element.           |
| `outline`     | `SurfaceCut.tsx:18` | `outline`     | `SurfaceCut.vue:20` | `true`      | ported  | Inset outline.                      |
| `color`       | `SurfaceCut.tsx:19` | `color`       | `SurfaceCut.vue:17` | `undefined` | ported  | Accent color token.                 |
| `hoverable`   | `SurfaceCut.tsx:25` | `hoverable`   | `SurfaceCut.vue:18` | `false`     | ported  | Hover layer.                        |
| `clickable`   | `SurfaceCut.tsx:35` | `clickable`   | `SurfaceCut.vue:16` | `false`     | ported  | Press layer.                        |
| `wrapContent` | `SurfaceCut.tsx:46` | `wrapContent` | `SurfaceCut.vue:23` | `true`      | ported  | Wrap children in SurfaceCutContent. |

## Copied literals

| Value                                    | Upstream ref           | Vue ref                      |
| ---------------------------------------- | ---------------------- | ---------------------------- |
| SurfaceCut background and outline styles | `SurfaceCut.tsx:50-80` | `surface.contracts.ts:15-60` |

## Deviations

None.

## Verification

Tested surface layering and inner cuts in `tests/components/surfaces.test.ts`.
