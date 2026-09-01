# cladd-vue

Reusable Vue 3 UI primitives for dense application interfaces.

This package ports Cladd's surface, sizing, accent, motion, DOM, and interaction contracts into a Vue-native library. Styling follows the pinned Cladd baseline, which is Tailwind v4. It does not depend on React, Reka UI, shadcn-vue, Pinia, Tauri, or application code.

## Status

Every pinned upstream value and type export has a Vue counterpart: surface, action, data-display,
feedback, form, overlay, dense-navigation, color, number, OTP, and calendar families. `Calendar` and
`DatePicker` ship from `cladd-vue/calendar`. Export coverage does not yet mean full browser-level
visual, motion, or interaction parity for every family.

## Boundaries

- Vue 3.5 and TypeScript public API
- Native DOM semantics with package-owned Vue interaction composables
- Tailwind v4 styling ported from upstream, namespaced under `cladd-`
- Dark-first theme with light-theme support
- Five contextual surface levels
- Seven control sizes with nested controls eight pixels smaller
- Eleven scoped accent regions
- CSS-driven motion with reduced-motion support
- No imports from applications or other workspace packages

This is an independent Vue implementation and is not an official Cladd package.

## Install

```bash
bun add cladd-vue
```

`vue@^3.5` and `tailwindcss@^4.2` are peer dependencies. Inside this repository, workspaces depend on
it as `"cladd-vue": "workspace:*"` and resolve the development-only `source` export condition, so
no build is required before running the playground.

## Usage

```ts
import 'cladd-vue/css';
```

```vue
<script setup lang="ts">
import { Button, Checkbox, Input, Surface, CladdProvider } from 'cladd-vue';
import 'cladd-vue/css';
</script>

<template>
  <CladdProvider theme="dark" accent="brand">
    <Surface :level="1" variant="gradient" outline>
      <Input name="query" placeholder="Filter targets" />
      <Checkbox name="offline" value="yes" />
      <Button accent="green" variant="gradient-fill">Save</Button>
    </Surface>
  </CladdProvider>
</template>
```

## Packaging

`vp pack` emits ESM and declarations to `dist/`. The published tarball also contains `src/`, because
the `./css` entry is Tailwind v4 source and its `@source "../"` directive must be able to scan the
package's own components for the utilities they use.

## Commands

Use Vite+ from the repository root.

```bash
vp run cladd-vue#check
vp run cladd-vue#test
vp run cladd-vue#build
```

Do not run package-manager binaries or underlying tools directly.

## Governance

Implementation rules live in [`CLAUDE.md`](./CLAUDE.md). Durable architecture lives in [`docs/architecture.md`](./docs/architecture.md). Cladd attribution and upstream baseline live in [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).
