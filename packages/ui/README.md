# @cladd-vue/ui

Reusable Vue 3 UI primitives for dense application interfaces.

This package ports Cladd's surface, sizing, accent, motion, DOM, and interaction contracts into a Vue-native library. Styling follows the pinned Cladd baseline, which is Tailwind v4. It does not depend on React, Reka UI, shadcn-vue, Pinia, Tauri, or application code.

## Status

Surface, action, data-display, feedback, form, and overlay foundations are available. The package includes `UiProvider`, surface primitives, dense controls, native form families, `Dialog`, `Popover`, and `Tooltip`. Native elements and focused Vue composables own keyboard, pointer, focus, form, positioning, and dismissal behavior.

## Boundaries

- Vue 3.5 and TypeScript public API
- Native DOM semantics with package-owned Vue interaction composables
- Tailwind v4 styling ported from upstream, namespaced under `cui-`
- Dark-first theme with light-theme support
- Five contextual surface levels
- Seven control sizes with nested controls eight pixels smaller
- Eleven scoped accent regions
- CSS-driven motion with reduced-motion support
- No imports from applications or other workspace packages

This is an independent Vue implementation and is not an official Cladd package.

## Install

```bash
bun add @cladd-vue/ui
```

`vue@^3.5` and `tailwindcss@^4.2` are peer dependencies. Inside this repository, workspaces depend on
it as `"@cladd-vue/ui": "workspace:*"` and resolve the development-only `source` export condition, so
no build is required before running the playground.

## Usage

```ts
import "@cladd-vue/ui/styles.css";
```

```vue
<script setup lang="ts">
import { Button, Checkbox, Input, Surface, UiProvider } from "@cladd-vue/ui";
import "@cladd-vue/ui/styles.css";
</script>

<template>
  <UiProvider theme="dark" accent="brand">
    <Surface :level="1" variant="gradient" outline>
      <Input name="query" placeholder="Filter targets" />
      <Checkbox name="offline" value="yes" />
      <Button accent="green" variant="gradient-fill">Save</Button>
    </Surface>
  </UiProvider>
</template>
```

## Packaging

`vp pack` emits ESM and declarations to `dist/`. The published tarball also contains `src/`, because
`styles.css` is Tailwind v4 source and its `@source "../"` directive must be able to scan the package's
own components for the utilities they use.

## Commands

Use Vite+ from the repository root.

```bash
vp run @cladd-vue/ui#check
vp run @cladd-vue/ui#test
vp run @cladd-vue/ui#build
```

Do not run package-manager binaries or underlying tools directly.

## Governance

Implementation rules live in [`CLAUDE.md`](./CLAUDE.md). Durable architecture lives in [`docs/architecture.md`](./docs/architecture.md). Cladd attribution and upstream baseline live in [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).
