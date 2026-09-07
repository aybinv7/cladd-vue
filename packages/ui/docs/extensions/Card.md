# Extension specification: `Card`

Card composes `Surface` and adds semantic structure — it is not another visual-token system.
Compose it with `CardHeader` (a plain flex row: default slot for `CardTitle`/`CardDescription`,
`#action` slot for an optional `CardAction`), `CardContent`, and `CardFooter`. Heading level for
`CardTitle` stays consumer-controlled since a card can appear at any depth of a page outline.

`CardHeader` uses an ordinary flex row with a named `#action` slot rather than a CSS Grid
placement trick — the same named-slot composition style already used by `Toast` (`#title`/`#text`)
and `Field`'s family, not a one-off pattern invented for this component.
