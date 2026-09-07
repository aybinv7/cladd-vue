# Extension specification: `ScrollArea`

ScrollArea enhances native overflow scrolling with a themed thin scrollbar — it does not replace
native scrolling with a custom thumb. `orientation` (default `'vertical'`) scopes overflow to one
axis or `'both'`. Scrollbar styling uses `scrollbar-width`/`scrollbar-color` (Firefox and other
modern engines) and the `::-webkit-scrollbar` pseudo-elements (Chromium/WebKit) — both are plain
CSS, so keyboard scrolling (arrow keys, Page Up/Down, Home/End on a focused scrollable region),
touch, zoom, and forced-colors mode all keep their native behavior untouched.

No `ScrollBar` sub-component is exported. A Radix/shadcn-style draggable custom thumb needs a
`ResizeObserver` to keep its size and position in sync with content, which the package's
performance rules discourage ("avoid eager … observers" ) when a CSS-only alternative covers the
same need. The native scrollbar, restyled, is the scroll bar.
