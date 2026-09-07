# Extension specification: `Command`

## Purpose

Command provides keyboard-first action discovery for small, consumer-owned action lists. It does
not fetch, debounce, cancel requests, or virtualize results.

## Public API

`CommandRoot` owns controlled or uncontrolled query state and an optional local-list filter.
`CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`, `CommandEmpty`, `CommandSeparator`,
`CommandShortcut`, and `CommandDialog` compose the family. Items require a stable `value` and emit
`select`.

## Semantics

Input is a `role="combobox"` controlling a `role="listbox"`; items are `role="option"`. The input
keeps focus and publishes the active item through `aria-activedescendant`.

## Keyboard behavior

Arrow keys wrap enabled items; Home and End move to the edges; Enter activates the active item.

## State

Query supports `v-model:query` and `defaultQuery`. Visibility is derived without cloning the
consumer list. Command Dialog delegates modal focus and restore behavior to Dialog.

## Composition

CommandRoot provides a typed local context to its children. Filter callbacks remain consumer-owned
and are documented as suitable for small local lists only.

## Styling

The family reuses Cladd foreground, hover, radius, density, and Surface-backed Dialog foundations.

## Performance

No observer, network request, deep watcher, or list cloning is introduced. Consumers own large-list
filtering and virtualization.

## Tests

Component tests cover filtering, active-descendant state, Enter selection, empty state, disabled
item navigation, and Command Dialog focus return plus controlled-query preservation across
open/close.

## Evidence

Validated by static package checks and focused DOM tests. Browser IME and accessibility-tool checks
remain review work.

## Provenance

Cladd extension — not an upstream port. Reuses Cladd input, dialog, surface, and density
foundations. No third-party source was copied.
