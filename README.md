# Cladd Vue

A Vue 3 port of [Cladd](https://github.com/cladd-ui/cladd)'s surface, sizing, accent, motion, DOM, and
interaction contracts. This is an independent implementation and is **not an official Cladd package**.

| Workspace         | Package         | What it is                                           |
| ----------------- | --------------- | ---------------------------------------------------- |
| `packages/ui`     | `@cladd-vue/ui` | The component library. ESM, typed, tree-shakeable.   |
| `apps/playground` | `playground`    | Visual acceptance catalog. Private, never published. |

## Requirements

- Node `>=22.18.0`
- The `vp` CLI ([Vite+](https://viteplus.dev)). Bun is the package manager, driven through `vp`.

## Development

```bash
vp install                 # install workspace dependencies
vp run dev                 # playground dev server
vp check                   # format, lint, typecheck
vp run -r test -- --run    # run every workspace test suite once
vp run -r build            # build the library and the playground
vp run ready               # all of the above, in order
```

Focused, per-workspace runs:

```bash
vp run @cladd-vue/ui#test
vp run @cladd-vue/ui#build
vp run playground#dev
```

Never call `npm`, `pnpm`, `npx`, `vitest`, `eslint`, `oxfmt`, or `vue-tsc` directly. Everything goes
through `vp`.

## Porting from upstream

The port is traced to a pinned Cladd commit rather than to published documentation.

```bash
vp run reference:cladd
```

This clones the pinned upstream commit into `reference/cladd/` (gitignored) and verifies the SHA. Read
`packages/ui/CLAUDE.md` before touching the library, and record every copied value in
`packages/ui/docs/port/<Component>.md`.

Roadmap and audits live in `plans/`.

## Consuming the package

```bash
bun add @cladd-vue/ui
```

```ts
import '@cladd-vue/ui/css';
```

```vue
<script setup lang="ts">
import { Button, CladdProvider, Input, Surface } from '@cladd-vue/ui';
</script>

<template>
  <CladdProvider theme="dark" accent-color="brand">
    <Surface :level="1" variant="gradient" outline>
      <Input name="query" placeholder="Filter targets" />
      <Button color="green" variant="gradient-fill">Save</Button>
    </Surface>
  </CladdProvider>
</template>
```

### Calendar subpath

Calendar and DatePicker components are isolated under `@cladd-vue/ui/calendar`:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Calendar, DatePicker } from '@cladd-vue/ui/calendar';

const date = ref(new Date());
</script>

<template>
  <DatePicker v-model="date" placeholder="Select date" />
  <Calendar v-model="date" color="brand" />
</template>
```

Tailwind v4 is a peer dependency. The stylesheet ships as source so Tailwind can scan the package for
the utilities it needs, which is why the published tarball contains both `dist/` and `src/`.

## License

MIT. See `LICENSE` and `packages/ui/THIRD_PARTY_NOTICES.md` for upstream attribution.
