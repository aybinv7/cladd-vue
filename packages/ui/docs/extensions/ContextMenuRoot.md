# Extension specification: `ContextMenu`

## Purpose

The Context Menu family opens the Dropdown Menu item contracts from a pointer location or the
platform context-menu keyboard command. It does not replace browser context menus outside its
trigger.

## Public API

`ContextMenuRoot` accepts `v-model:open` and `defaultOpen`; `ContextMenuTrigger` accepts `as` and
`disabled`; `ContextMenuContent` accepts `className`, `position`, and `root`. Context item, group,
label, checkbox, radio, separator, and shortcut exports share their Dropdown Menu contracts.

## Semantics

The trigger exposes menu state and opens a `role="menu"` at the recorded pointer rectangle.

## Keyboard behavior

Context Menu and Shift+F10 open at the trigger center. Content uses the Dropdown Menu keyboard map,
including local typeahead and Escape focus return.

## State

The root provides controlled and uncontrolled open state and stores only the current anchor
rectangle.

## Composition

The root provides the same menu selection chain used by the Dropdown Menu item contracts.

## Styling

Content uses the same Cladd token-backed surface and row styling as Dropdown Menu content.

## Performance

Popover content mounts only while open; no document-level context-menu listener is installed.

## Tests

Component tests cover pointer and keyboard opening plus the shared selection and navigation rules.

## Evidence

Validated with package type checking and component tests. Browser viewport, touch, RTL, and zoom
validation remain review requirements.

## Provenance

Cladd extension — not an upstream port. Reuses Cladd tokens, surfaces, density, and Popover motion.
Composition research referenced shadcn inventory only; no shadcn source was copied.
