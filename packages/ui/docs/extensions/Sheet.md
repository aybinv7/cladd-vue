# Extension specification: `Sheet`

## Purpose

Sheet provides a modal panel that enters from a logical inline edge or a block edge. It is intended
for focused supporting workflows, not persistent application navigation.

## Public API

`SheetRoot` owns `v-model:open` and `defaultOpen`; `SheetTrigger` and `SheetClose` compose native
interactive children. `Sheet` supports controlled `v-model:open`, `side`, dismissal policies,
portal root, lazy mounting, accessible labels, and title, description, header, default, and footer
slots.

## Semantics

The panel is a modal `role="dialog"` with `aria-modal="true"`. A title and description slot wire
their generated ids to the dialog. The app container becomes inert while the panel is open.

## Keyboard behavior

Focus is contained while open, restored on close, and Escape closes unless disabled. Backdrop clicks
close unless disabled. A bottom Sheet with `dragToClose` accepts touch dragging and closes only once
the downward distance crosses its threshold.

## State

The root and component both support controlled and uncontrolled open state. Lifecycle callbacks
cover opening, opened, closing, and closed phases.

## Composition

Root, trigger, Sheet, and close use the existing typed overlay context. Slots receive `close` where
an action may dismiss the panel.

## Styling

The component reuses Cladd Backdrop, Surface, contextual level one, density, motion, and logical
inset tokens. Inline edges flip under RTL.

## Performance

No separate overlay runtime is introduced. Existing lifecycle, focus-trap, and dismissal composables
own timers and document listeners, cleaning them up on unmount.

## Tests

Component tests cover modal semantics, focus, inert background, Escape dismissal, Drawer placement,
and Alert Dialog semantics.

## Evidence

Validated by package static checks and focused component tests, including a synthetic touch drag.
Browser touch, RTL, and zoom validation remain pending.

## Provenance

Cladd extension — not an upstream port. Reuses Cladd overlay, surface, density, and motion
foundations. No third-party source was copied.
