# UI Playground

This app is the visual acceptance surface for `cladd-vue`. It consumes the package through its public export and never imports files from `packages/ui/src` directly.

## Commands

Run commands from the repository root through Vite+ only.

```bash
vp run playground#dev
vp run playground#check
```

Do not add npm, pnpm, direct Vite, direct TypeScript, or direct test-runner commands.

## Catalog contract

- Add every public component to the catalog in the same change that exports it.
- Show the complete size, accent, variant, interactive, disabled, loading, focus, and reduced-motion contracts that apply to the component.
- Use deterministic local state. This app must not require ADB, CDP, Tauri, a backend, or network data.
- Use `CladdProvider` controls to verify global theme and accent inheritance.
- Import components only from `cladd-vue` and styles only from `cladd-vue/css`.
- Keep catalog sections inside `src/modules/playground/sections` and reusable playground chrome inside `src/modules/playground/components`.
- Do not duplicate package component styles in the playground. Playground CSS may arrange specimens but must not repair a broken package component.
- Native controls are allowed only when the equivalent package primitive has not been implemented. Replace them when that primitive lands.

## Visual review

Review dark and light themes, every accent, keyboard focus, hover, pressed, disabled, loading, narrow viewport, and reduced motion. Compare package specimens to the pinned Cladd source contract documented in `packages/ui/THIRD_PARTY_NOTICES.md`.

The `source` export condition exists only for monorepo development. Published consumers resolve the built `import` and `types` entries.
