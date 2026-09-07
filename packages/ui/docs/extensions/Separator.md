# Extension specification: `Separator`

A horizontal or vertical rule. `decorative` (default `true`) renders `role="none"`, since most
separators are purely visual; set it `false` for a semantic `role="separator"` with
`aria-orientation`. `orientation="vertical"` renders at `height: 100%` and therefore requires the
parent to establish an explicit height — it does not invent one.

This is independent of the package's existing specialized separators (`ToolbarSeparator`,
`TabsList`'s implicit divisions, `DropdownMenuSeparator`, `ContextMenuSeparator`,
`CommandSeparator`, `ComboboxSeparator`, `SidebarSeparator`, `BreadcrumbSeparator`,
`PaginationEllipsis`'s neighbors): none of those change, and `Separator` does not replace them.
It exists for ad hoc layout dividers such as inside a `Card` or a plain content column.
