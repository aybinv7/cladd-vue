# Extension specification: `Table` family

Cladd extension — not an upstream port. Reuses Cladd design tokens, text and foreground tones,
outline color, density scale, and motion roles. Composition research: WAI-ARIA table pattern and
shadcn table inventory (inventory only, no source copied).

## Purpose

Fast native table primitives plus a consumer-owned data-table recipe. Covers tabular data with
captions, headers, footers, dense rows, sticky headers, hoverable rows, selection, and numeric
alignment.

Non-goals: a stateful grid framework. Loading, empty, error, selection, pagination, filtering,
virtualization, and row actions are consumer composition. The primitives never clone data into
internal reactive state and never deeply watch row collections.

## Public API

| Name           | Kind                    | Props                                                      | Defaults                                                                 |
| -------------- | ----------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| `Table`        | component               | `density`, `hoverable`, `stickyHeader`, `wrapperClassName` | `density 'comfortable'`, `hoverable false`, `stickyHeader false`         |
| `TableHeader`  | component               | `sticky`                                                   | `sticky false`                                                           |
| `TableBody`    | component               | `empty`                                                    | `empty false`                                                            |
| `TableFooter`  | component               | `sticky`                                                   | `sticky false`                                                           |
| `TableRow`     | component               | `selected`, `hoverable`                                    | `selected false`                                                         |
| `TableHead`    | component, emits `sort` | `scope`, `numeric`, `sortable`, `sortDirection`            | `scope 'col'`, `numeric false`, `sortable false`, `sortDirection 'none'` |
| `TableCell`    | component               | `numeric`                                                  | `numeric false`                                                          |
| `TableCaption` | component               | `visuallyHidden`                                           | `visuallyHidden false`                                                   |

Slots: `default` everywhere, plus `empty` on `TableBody`. Recipe types: `TableColumn`,
`TableSortState`, `TableSortDirection`, `TableDensity`, matching `*DefaultProps`. Sorting state
is consumer-owned; header buttons emit `sort` and consumers flip their own state. All Vue-only
idioms.

## Semantics

`Table` wraps a `Surface` (`data-slot="table-container"`, outlined, same engine `Card` uses — no
separate visual-token system) whose content region owns horizontal overflow, containing
`table[data-slot="table"]`. Header, body, footer, rows, header cells, cells, and captions render
their native elements with matching `data-slot` hooks. Header cells preserve native `scope`.
`TableRow[selected]` exposes `data-selected` and `data-state="selected"`. `TableHead[sortable]`
renders the header content through the package `Button` (`variant="transparent"`, `size="xs"`,
`data-slot="table-sort-button"`) instead of a bare native button, so it gets the same focus ring,
hover, and press treatment as every other interactive control. A sortable-but-unsorted column
still renders the button with a dimmed, symmetric glyph (`sortDirection: 'none'`) rather than
disappearing — `sortable` and `sortDirection` are independent so "this column can be sorted" and
"this column is currently sorted" are two different, both-visible states. `aria-sort` is set on
the `th` only once a direction is chosen. The `empty` body row renders a full-width cell with the
`empty` slot. No `grid` roles are claimed: this is a semantic table, not an interactive ARIA grid.

## Keyboard behavior

No key bindings of its own. Sort buttons are native buttons reachable by Tab and activated by
Enter/Space. Sticky regions scroll with the container.

## State

Stateless primitives. `Table` provides density and hoverable flags to rows through injection.
`TableRow` selects through its `selected` prop and may override hover. Sorting, filtering,
selection, pagination, and visibility live in consumer state per the recipe below.

## Composition

Valid table ancestry is preserved: caption, header, body, footer, rows, and cells compose in
native order. Consumer row keys stay stable because rows render supplied cells linearly without
internal cloning.

Data-table recipe: keep a `ref` of rows plus `sort`, `filter`, `page`, and `selection` state in
the consumer; derive visible rows with a computed; render `TableHead` sort buttons that emit
`sort` into the consumer toggle; render selection with native `Checkbox` cells; render
pagination with package buttons. Optional consumer-side `@tanstack/vue-table` integration is
documented in the playground without adding it to the package.

## Styling

The container is a `Surface` (`outline`, default `variant="solid"`), the same primitive `Card`
composes, rather than a hand-rolled bordered `div` — its content region owns `overflow-x-auto` so
wide tables never expand the page. Header uses `text-cladd-2xs uppercase` over `bg-cladd-surface`
(kept opaque and explicit so content scrolling under a sticky header never shows through).
`density: 'compact'` uses tighter cell padding, `'comfortable'` (default) the standard padding,
matching the same two-value vocabulary `Field`'s `density` prop already uses. Hoverable rows use
plain `hover:bg-cladd-surface-hover`, matching the same pattern `DropdownMenuItem` and
`BreadcrumbLink` already use for row/item hover (not the `cladd-surface-hover:` custom variant,
which is wired to `Surface`'s own background/overlay child structure, not a generic hover
utility). Selected rows use `bg-cladd-surface` with `data-state` for consumer styling. Numeric
cells use right alignment with tabular numbers. Header/cell motion is limited to the 200ms color
role with reduced-motion collapse.

## Performance

Linear render cost in supplied cells. No watchers on row collections, no virtualization, no
timers. Large datasets stay consumer-owned; the recipe paginates or windows before rendering.

## Tests

`tests/components/table.test.ts` covers ancestry, caption announcement, scope, numeric
alignment, overflow containment, sticky headers, density/selected/hover styling hooks, sort
button emission with `aria-sort`, the sortable-but-unsorted neutral state, the non-sortable
plain-header state, empty rows, and linear rendering without state cloning.

## Evidence

Validated with `vp run cladd-vue#check` and `vp run cladd-vue#test -- --run`. Sticky and
overflow behavior are unit-asserted through classes; no recorded browser capture yet. Reconcile
recipe composition with Menu, Pagination, Skeleton, and Empty after those families merge.

## Provenance

Cladd extension — not an upstream port. Reuses Cladd text/foreground/outline tokens, surface
tones, density scale, and the 200ms motion role. Composition research: WAI-ARIA table pattern
and shadcn table inventory (inventory only, no source copied).
