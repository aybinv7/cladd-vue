# Extension specification: `PaginationLink`

A page control built on `Button`. `active` marks the current page with `aria-current="page"` and a
raised surface variant; `label` supplies the accessible name for icon-only rendering. Disabling the
control is the consumer's responsibility through the native `disabled` attribute, which `Button`
already forwards.
