# Extension specification: `Avatar`

Avatar is a fixed-size circular identity marker. Compose it from `AvatarImage` and
`AvatarFallback`; group several with `AvatarGroup`. The package owns no identity or network
logic — `src` resolution, retries, and caching remain consumer-owned.

## Fallback without layout shift

`AvatarFallback` always occupies the full container as normal-flow content. `AvatarImage` is
absolutely positioned on top and stays `hidden` until its `load` event fires, switching to
`error` on failure. Because a statically-positioned element paints before a `position: absolute`
sibling in the same stacking context regardless of source order, the image — once visible —
always covers the fallback, and removing it (on error, or before it has loaded) simply reveals
the fallback that was already sitting in place. There is no measurement, no observer, and no
layout shift in any state (missing `src`, loading, loaded, or failed).
