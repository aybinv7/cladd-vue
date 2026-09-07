# Extension specification: `Combobox`

## Purpose

Combobox is an editable, consumer-owned entity selector. It is distinct from Command: it selects
values rather than executes actions.

## Public API

`ComboboxRoot` supports controlled `value`, `query`, and `open` state; initial values; multiple,
disabled, invalid, and busy modes; and a small-list filter callback. Input, content, list, group,
item, empty, separator, chip, and clear components compose the family.

## Semantics

The input retains DOM focus with `role="combobox"` and owns expanded, controls, autocomplete,
busy, invalid, and active-descendant state. Options are rendered as `role="option"` in a listbox.

## Keyboard behavior

Arrow keys, Home, End, and Enter move and select through active descendant state. Escape closes.
Backspace removes the last selected value only in multiple mode with an empty query.

## State

Single selection closes after selection; multiple selection stays open. Fetching, debouncing,
cancellation, and large-list virtualization remain consumer-owned.

## Composition

Content is anchored to the input using Popover. Chips and clear actions modify only the root-owned
selection state.

## Styling

The family reuses Cladd Popover, foreground, hover, radius, typography, and density foundations.

## Performance

It does not clone or deeply watch item lists. Its default filter is explicitly limited to small local
lists.

## Tests

Focused tests cover active-descendant selection, input focus retention, and multiple-value Backspace
removal.

## Evidence

Validated by static package checks and DOM tests. Browser IME, RTL, and accessibility-tool checks
remain review work.

## Provenance

Cladd extension — not an upstream port. Reuses Cladd Popover and input foundations. No third-party
source was copied.
