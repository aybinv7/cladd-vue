# Extension specification: `AlertDialog`

## Purpose

Alert Dialog confirms a consequential action. It is not a replacement for a neutral dialog.

## Public API

`AlertDialogRoot` and `AlertDialogTrigger` reuse the Dialog compound state contract. `AlertDialog`
accepts the Dialog public props, including title, text, action labels, controlled open state, and
slots.

## Semantics

It renders `role="alertdialog"`, `aria-modal="true"`, and derives title and description ids from the
underlying Dialog contract.

## Keyboard behavior

Focus is contained, Escape follows the configured Dialog policy, and the cancel action receives
initial focus when present.

## State

Controlled and uncontrolled state comes from the existing Dialog root context.

## Composition

The component reuses Dialog actions, buttons, title, text, and default-content slots.

## Styling

Alert Dialog retains the Cladd Dialog Surface, backdrop, elevation, and motion contract.

## Performance

It reuses the existing Dialog overlay engine and adds no runtime dependency.

## Tests

Component tests assert alert-dialog role, title/description linkage, and least-destructive focus.

## Evidence

Validated by package static checks and focused component tests. Browser accessibility inspection
remains pending.

## Provenance

Cladd extension — not an upstream port. Reuses Cladd Dialog foundations. No third-party source was
copied.
