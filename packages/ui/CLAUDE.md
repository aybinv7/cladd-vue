# CLAUDE.md

This file governs all work inside `packages/ui`.

## Mission

Reproduce the pinned Cladd package in Vue. Not "inspired by", not "adapted": the same names, the same
selectors, the same tokens, the same code shape, the same values. The only permitted change is the
framework, React to Vue.

## The first test is the upstream diff

Before any other consideration, ask what upstream does and match it. This outranks every convention
below, every convention in the repository root, and every instinct to improve something.

- A file that exists upstream must diff clean against `reference/cladd/` apart from framework
  transposition. `tests/upstreamParity.test.ts` enforces this for stylesheets; extend it as more
  surfaces reach parity.
- Upstream's literal tables stay literal. Do not replace a hand-written list with a generator, a
  `.map()`, or a shared helper, even when the output is identical. `shared/cn.ts` is the cautionary
  example: the port turned flat upstream arrays into `sizeScale.map()` and `radiusVariant()` and made
  the file undiffable for no benefit.
- Upstream's duplicated, redundant, or plainly odd lines are ported as they are. A harmless duplicate
  selector is cheaper than a diff you have to explain on every future review.
- Upstream's JSDoc on public props is part of the port. Copy it verbatim. This is the one exception to
  the repository's no-comments rule, and it is not optional.
- Deviating requires a recorded reason in `docs/port/<Component>.md`, and an allowance entry in the
  parity test where one applies. An unrecorded deviation is a defect regardless of whether it looks
  better.

The one thing upstream cannot decide is Vue file idiom, because upstream has no opinion about Vue.
Settled: directory and filename style transposes along with the framework. `hooks/use-theme.ts`
becomes `composables/useTheme.ts`, `shared/rounded-classes.ts` becomes `shared/roundedClasses.ts`.
File _contents_ still port verbatim. Do not reopen this.

Read these files before implementation:

1. `docs/architecture.md`
2. `../../plans/vue-ui-package.md`
3. `THIRD_PARTY_NOTICES.md`
4. Relevant Cladd source in `reference/cladd/` at the repo root, the pinned upstream baseline
5. `docs/port/README.md`, then the manifest for the component under change

- Run `vp run reference:cladd` before porting. It clones the pinned commit into `reference/cladd/`, verifies the checked-out SHA, and prints the path.
- Never port from memory, from a temporary directory, or from published Cladd documentation. Read `reference/cladd/`.
- Cite `reference/cladd/<file>:<lines>` for every copied value in the implementing change and in `docs/port/<Component>.md`.

## Hard boundaries

- Depend directly on Vue only for UI runtime behavior.
- Never add React, React DOM, Reka UI, shadcn-vue, Radix Vue, Pinia, Tauri, or application packages.
- Styling mirrors the pinned Cladd baseline, which is Tailwind v4 with `clsx` and `tailwind-merge`. Copy upstream utility strings, `@theme` blocks, and custom variants instead of re-authoring them. See `../../plans/tailwind-realignment.md`.
- Never import from `apps/*` or from another `packages/*` workspace. This package is the root of the dependency graph.
- Never copy consumer application feature behavior into this package.
- Pinned Cladd source decides the DOM. Where upstream uses a native element, use it; where upstream uses custom interaction, port that instead of substituting a native element. Every choice must be traced to upstream and locked by contract tests.
- Never introduce a general headless component runtime.
- Never add inline code comments of your own. Upstream's own comments, including CSS block comments and JSDoc on public props, are ported verbatim.
- Never place unrelated primitives in one file. One component family, composable, contract, or style concern per file.
- Never use `npm`, `pnpm`, `npx`, Vitest, ESLint, Oxfmt, or Vue TSC directly. Use `vp` commands.
- Never run a dev server or application build from this package task unless the user explicitly requests it.

## Public API

- Export consumers' API only through `src/index.ts` and documented subpath exports.
- Component names, prop names, type names, and slot names are upstream's. `color`, not `accent`.
  `CladdProvider`, not `CladdProvider`. Do not add an alias "for clarity"; an alias is a second public
  contract to keep in sync forever.
- Do not add compound sub-components upstream does not ship. If upstream exposes `Dialog` as one
  component, the port exposes one component.
- CSS classes, data attributes, keyframes, and custom properties keep upstream's exact spelling,
  including the `cladd-` prefix and including the handful upstream leaves unprefixed, such as
  `.safe-areas` and `.no-safe-areas`.
- Keep Vue as the only UI peer dependency to prevent duplicate runtimes.
- Keep imports tree-shakeable. Avoid registration of every component through a global plugin.
- Treat changes to exported props, events, slots, types, tokens, and CSS selectors as API changes.
- Add a migration note before removing or renaming a public contract.

## Vue rules

- Use Vue 3 Composition API with `<script setup lang="ts">`.
- Prefer templates over render functions.
- Use typed props, emits, slots, and `defineModel` where two-way state is part of the component contract.
- Preserve controlled and uncontrolled usage when the component category needs both.
- Forward native attributes deliberately; do not leak implementation-only attributes.
- Use typed symbol injection keys for contextual surface, theme, accent, and size state.
- Prefer `shallowRef` for DOM nodes, external instances, and large opaque values.
- Derive state with `computed`; avoid deep watchers and hidden composable side effects.
- Clean up global listeners, observers, animation frames, and timers during unmount.

## Component rules

- Use native elements and focused Vue composables for dialogs, popovers, tooltips, menus, selects, tabs, accordions, collapsibles, checkboxes, radios, switches, sliders, calendars, and focus management.
- Keep visual styling and animation owned by this package.
- Support keyboard, pointer, and touch interaction from first implementation.
- Preserve focus visibility and accessible names in every state.
- Expose named slots for meaningful composition points instead of Boolean-prop explosions.
- Avoid component abstraction inside very large repeated lists when it creates measurable render cost.
- Do not add global state for local component behavior.

## Styling rules

- Styling is ported from the pinned Cladd source: utility strings from the upstream component, `@theme` token blocks, and custom variants, copied by value.
- Record the upstream file and lines for every copied style in the implementing change.
- Class hooks and custom properties keep upstream's spelling exactly. Nothing is renamed, and nothing
  gains a prefix upstream does not have.
- Formatting follows upstream's `.oxfmtrc.json`, mirrored into the root `vite.config.ts` `fmt` block:
  80 column width, single quotes outside CSS, two-space indent, trailing commas. This exists so files
  diff cleanly against `reference/cladd/`; do not retune it for taste.
- Surfaces use contextual levels one through five and scoped accent inheritance.
- Default control height is 28 pixels. Nested controls are eight pixels smaller at the same size token.
- Prefer inset outlines and surface contrast over decorative drop shadows.
- Animate `transform` and `opacity` where possible. Layout animation requires measurement evidence and cleanup.
- Dragging and scrubbing must disable transition latency while pointer movement is active.
- Every motion path must honor `prefers-reduced-motion`.

## Performance rules

- Do not add a general animation runtime for effects achievable with CSS and Vue transitions.
- Avoid eager portals, observers, event listeners, and timers.
- Mount expensive overlay content only while needed and preserve exit motion safely.
- Keep dependencies minimal and justify every new runtime dependency in the implementation plan.
- Validate tree shaking and ensure Vue is externalized from published output.
- Long lists remain consumer-owned; this package may provide primitives but must not silently render unbounded collections.

## Accessibility rules

- Pinned Cladd behavior and native platform semantics are the baseline.
- Test keyboard navigation, focus return, escape handling, outside interaction, labeling, disabled state, and screen-reader semantics.
- Do not remove focus outlines without an equally visible replacement.
- Do not use color alone to communicate state.
- Touch targets may be visually dense but must retain an adequate interaction target where the platform allows it.

## Testing and validation

- Add contract tests with each public component.
- Test controlled and uncontrolled state where supported.
- Test emitted values and cancellation behavior.
- Test keyboard interaction and focus restoration for overlays.
- Test reduced-motion behavior for animated components.
- Test package exports and consumer-style imports.
- Run `vp run @cladd-vue/ui#check` and `vp run @cladd-vue/ui#test` for focused validation.
- Run `git diff --check` before handoff.
- Do not claim build, browser, accessibility-tool, or device evidence unless that validation actually ran.

## Licensing

- Cladd is MIT licensed and is a design and implementation reference.
- Keep `THIRD_PARTY_NOTICES.md` current when copying or substantially adapting Cladd code.
- Record upstream file paths and pinned commit in the implementing change.
- The package name acknowledges the port. Keep Cladd branding out of component names, CSS selectors, custom properties, and data attributes, which stay under `cladd-`.
- Keep the "not an official Cladd package" disclaimer in `README.md` and `THIRD_PARTY_NOTICES.md`.

## Delivery discipline

- Work phase-by-phase from `../../plans/vue-ui-package.md`.
- Each phase must produce a usable, testable consumer path.
- Do not implement the full catalog in one change.
- Keep commits feature-focused and request user permission before committing.
- Update plan checkboxes only with evidence.
