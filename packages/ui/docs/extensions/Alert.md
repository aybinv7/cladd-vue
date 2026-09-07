# Extension specification: `Alert`

Alert is a passive, non-modal status region, styled after `Toast`'s surface/icon/copy treatment
(gradient `Surface`, outlined, `rounded-cladd-toast`, the same title/description type scale) rather
than a new visual system. Compose it with `AlertTitle`, `AlertDescription`, and `AlertActions`.
`variant` selects `neutral`, `information`, `success`, `warning`, or `destructive` and drives the
`Surface` accent color, matching how `Toast`'s `color` prop works.

`icon`/`iconProps` mirror `ToastProps` exactly: pass an icon component and it renders before the
title/description column, `[&>svg]:size-5`. Status is not carried by color alone: a non-neutral
variant with no icon falls back to a screen-reader-only status word ("Error"/"Warning"/"Info"/
"Success") so a sighted consumer who supplies an icon gets a real visual cue, and a screen-reader
user always gets one even without an icon.

Static alerts do not force live announcement: `live` defaults to `'off'`. A freshly inserted alert
that should interrupt may opt into `live="assertive"` (`role="alert"`); a routine status update uses
`live="polite"` (`role="status"`).
