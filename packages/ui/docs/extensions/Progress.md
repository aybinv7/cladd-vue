# Extension specification: `Progress`

Progress renders a `role="progressbar"` track and reports `aria-valuemin`/`aria-valuemax`/
`aria-valuenow`. Compose an optional header row from `ProgressLabel` and `ProgressValue`.

## Determinate vs. indeterminate

`value` is clamped into `[min, max]` (default `0`/`100`). A non-finite `value` (missing, `NaN`, or
explicit `indeterminate`) always falls back to the indeterminate sweep rather than exposing a broken
`aria-valuenow` — invalid input is handled consistently, not silently rendered wrong. The
indeterminate fill keeps a static 40%-width bar with Tailwind's built-in `animate-pulse`, so it
stays visible under `prefers-reduced-motion`; only the pulse animation is removed, never the bar
itself. (The port's `src/cladd.css` and `src/styles/*.css` are a locked, line-for-line mirror of
upstream and cannot host a new keyframe, so this family only uses Tailwind's stock utilities.)

## Composition

`ProgressValue` reads the computed percentage from context and renders it formatted (`"42%"`) by
default; pass its own content to override. `ProgressLabel` is a plain visible label with no implied
text. Neither depends on the other.
