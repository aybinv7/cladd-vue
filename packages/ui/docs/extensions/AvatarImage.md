# Extension specification: `AvatarImage`

The identity image inside `Avatar`. Hidden until it loads successfully; removed from view (but
not the DOM) on error so `AvatarFallback` shows through. See `Avatar.md` for why this introduces
no layout shift.
