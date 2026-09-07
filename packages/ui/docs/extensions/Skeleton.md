# Extension specification: `Skeleton`

A layout-preserving loading placeholder. Always `aria-hidden="true"` so it introduces no keyboard
stop and no accessible noise; size and shape are set entirely through the consumer's own `class`.
The shimmer uses Tailwind's built-in `animate-pulse` and disables under `prefers-reduced-motion`
without removing the placeholder itself.
