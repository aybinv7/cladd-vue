# Extension specification: `Sidebar`

## Purpose

Sidebar is the persistent, responsive application-navigation shell. It exposes logical inline-side
placement, controlled desktop and mobile state, and an accessible collapsed mode.

## Composition

Use `SidebarProvider` around `Sidebar`, `SidebarInset`, and `SidebarTrigger`. Compose navigation
with `SidebarGroup`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, and their sub-menu
counterparts. Header, footer, separator, rail, group action, item action, and badge are optional.

`SidebarProvider` is `h-full`: it is the flex row that holds `Sidebar` and `SidebarInset`
side by side, so it must fill whatever height its own parent gives it for `Sidebar`'s
`h-full`/`flex-col` column (and `SidebarFooter` sitting at the bottom of it) to resolve to a real
height instead of collapsing to content size. A consumer embedding `SidebarProvider` needs to give
its parent an explicit height (a fixed height, `h-screen`, or a flex/grid cell) — same requirement
any `height: 100%` chain has.

## Semantics

The mobile presentation delegates focus containment, Escape, and inert-page behavior to Sheet.
Desktop Ctrl/Cmd+B toggles only outside editable controls. `SidebarMenuButton` uses
`aria-current="page"` for an active item.

### Icon-collapsed mode actually collapses to icons

`SidebarMenuButton` exposes a dedicated `#icon` slot alongside its default (label) slot. While the
desktop sidebar is icon-collapsed, the button becomes square (`aspect-square`, matching the rail
width) and shows only the `#icon` slot content — the label is not removed from the DOM (so the
accessible name is never lost even without a `tooltip`), it becomes `sr-only`, and a `Tooltip`
wraps the trigger so a sighted user still gets the label on hover/focus (`tooltip` prop). Before
this pass, the button had no icon slot at all: collapsing the rail to `w-14` (56px) just squeezed
the full text label into a 56px-wide button with no icon — a real, visible bug, not a cosmetic
one. `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarMenuAction`, `SidebarMenuBadge`, and
`SidebarMenuSub` all read `useSidebar()` directly and hide entirely while collapsed (group
labels and nested sub-navigation don't fit a 56px rail, and real desktop icon rails don't attempt
to show them) rather than rendering broken partial content.

`SidebarMenuAction`, `SidebarGroupAction`, `SidebarMenuSub`, and `SidebarMenuSubButton` compose
ordinary Button/DropdownMenu primitives; the package does not own item-action menu content.

### `variant="inset"` is a real visual variant, not just a name

`SidebarInset` reads the shared `variant` from `useSidebar()`. `'inset'` gives both `Sidebar` and
`SidebarInset` matching margin, `rounded-cladd-dialog`, an outline border, and an outline shadow, so
they render as two separate floating cards over the page canvas — before this pass `SidebarInset`
never read `variant` at all, so switching the demo's variant control only changed `Sidebar`'s own
corners and did nothing to the main content pane. `SidebarRail` anchors to `Sidebar`'s own edge
(`Sidebar` is `relative`, another prerequisite that was missing) with a wide invisible hit target
straddling the border and a 1px line that only becomes visible on hover — clicking it, like
`SidebarTrigger`, toggles `useSidebar().toggle()`.

### `SidebarTrigger` defaults to an icon, not literal "Toggle sidebar" text

Its default slot fallback used to be the literal string "Toggle sidebar", rendered as plain
unstyled text — a real, visible defect next to any icon-only sibling control. It now defaults to
a small inline "panel" icon (and real hover/size/rounding chrome) while `aria-label="Toggle
sidebar"` keeps the accessible name; a consumer can still override the default slot with anything
else. `SidebarSeparator` and `SidebarMenuSub` also got more breathing room (`my-3` and
`mt-1`/`mb-1` respectively) so a group separator never visually crowds the sub-navigation above
it.

### `SidebarGroup` and `SidebarMenuItem` are `relative`

`SidebarGroupAction` and `SidebarMenuAction` are `absolute`-positioned to sit in the corner of
their own group/item. Making `Sidebar` itself `relative` (for `SidebarRail`, above) without also
making `SidebarGroup` and `SidebarMenuItem` relative was a real regression introduced by that same
change: with no positioned container of their own, both actions escaped all the way up to
`Sidebar`'s new positioning context and rendered stacked in the sidebar's top-right corner instead
of next to their own group label / menu item. Both containers are `relative` now, so each action
anchors to the element it's actually meant to sit on top of.

## Evidence

Validated by static package checks and focused interaction tests covering desktop/mobile state,
nested sub-navigation, item action-menu composition, and — critically — the actual rendered
markup of the collapsed icon rail (square button, `sr-only` label, hidden group label/action/
sub-menu), not just the `aria-label` fallback. Browser responsive, RTL, zoom, and screen-reader
verification remain review work.
