# Extension specification: `AvatarGroup`

A row of overlapping `Avatar` instances with a themed ring between them. `overlap` (default `8`
pixels) controls the negative margin between adjacent avatars. `AvatarGroup` performs no
slicing or identity logic: pass exactly the avatars to display, and compose an overflow count
yourself with `Chip` (for example `<Chip size="xs">+3</Chip>`) as the last child — this keeps
counting and truncation policy consumer-owned rather than baked into a generic primitive.
