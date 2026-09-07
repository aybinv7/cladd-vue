# Extension specification: `DropdownMenu`

## Purpose

The Dropdown Menu family provides compact, trigger-anchored action menus. It does not virtualize
large collections or provide command search; consumers own item content and filtering.

## Public API

`DropdownMenuRoot` owns `v-model:open` and accepts `defaultOpen`. `DropdownMenuTrigger` accepts
`as` and `disabled`. `DropdownMenuContent` accepts `className`, `position` (`bottom-start` by
default), and `root`. Items emit `select`; checkbox items expose `v-model:checked`; radio groups
expose `v-model:value`. Items default to closing on selection except checkbox items. The family also
exports group, label, separator, shortcut, and submenu primitives.

## Semantics

Content has `role="menu"`; items use `menuitem`, `menuitemcheckbox`, or `menuitemradio`. Disabled
items expose `aria-disabled` and are excluded from navigation. Triggers expose menu expansion state.

## Keyboard behavior

Arrow keys wrap through enabled items; Home and End go to the edges. Enter and Space activate the
focused item. Printable keys perform local typeahead. Escape closes the menu and restores trigger
focus. A submenu opens with Right, Enter, Space, pointer entry, or click; Left closes it.

## State

Roots, submenus, checkbox items, and radio groups support controlled and uncontrolled usage. A
selection updates its local state, emits its model event, then closes the parent chain when its
`closeOnSelect` setting permits it.

## Composition

`DropdownMenuRoot` provides anchor and open state to its trigger and content. `DropdownMenuSub`
creates nested open state while retaining the parent close chain. Content owns roving focus.

## Styling

The family reuses Cladd surface, foreground, hover, radius, and text-size tokens. It uses dense
28px-scale menu rows and Popover positioning; no external menu runtime is used.

## Performance

Menu content is mounted through Popover only while open. Keyboard typeahead uses a component-local
timer, cleared on unmount. Collections remain consumer-owned.

## Tests

Contract coverage verifies exports and extension specifications. Component tests cover opening,
keyboard navigation, selection, close-and-focus-return, submenu behavior, and context placement.

## Evidence

Validated with package type checking and component tests. Browser viewport, touch, RTL, and zoom
validation remain review requirements.

## Provenance

Cladd extension — not an upstream port. Reuses Cladd tokens, surfaces, density, and Popover motion.
Composition research referenced shadcn inventory only; no shadcn source was copied.
