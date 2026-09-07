import { expect, test } from 'vite-plus/test';
import { defineComponent, h, nextTick, ref } from 'vue';

import {
  Sidebar,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '../../src/index.ts';
import { byTestId, click, mountTree } from '../support/mountTree.ts';

test('the trigger falls back to an icon glyph, not literal "Toggle sidebar" text', () => {
  const mounted = mountTree(h(SidebarProvider, null, () => h(SidebarTrigger)));

  const trigger = mounted.root.querySelector('[data-slot="sidebar-trigger"]');
  expect(trigger?.getAttribute('aria-label')).toBe('Toggle sidebar');
  expect(trigger?.textContent?.trim()).toBe('');
  expect(trigger?.querySelector('svg')).not.toBeNull();

  mounted.app.unmount();
  mounted.root.remove();
});

test('the trigger still accepts custom slot content', () => {
  const mounted = mountTree(
    h(SidebarProvider, null, () =>
      h(SidebarTrigger, null, () => 'Custom label'),
    ),
  );

  expect(
    mounted.root.querySelector('[data-slot="sidebar-trigger"]')?.textContent,
  ).toBe('Custom label');

  mounted.app.unmount();
  mounted.root.remove();
});

test('group and item actions anchor to their own container, not the whole Sidebar', () => {
  const mounted = mountTree(
    h(SidebarProvider, null, () =>
      h(Sidebar, null, () => [
        h(SidebarGroup, { 'data-testid': 'group' }, () => [
          h(SidebarGroupAction, { 'data-testid': 'group-action' }, () => '+'),
          h(SidebarGroupContent, null, () => [
            h(SidebarMenu, null, () => [
              h(SidebarMenuItem, { 'data-testid': 'item' }, () => [
                h(SidebarMenuButton, null, () => 'Reports'),
                h(
                  SidebarMenuAction,
                  { 'data-testid': 'item-action' },
                  () => '⋯',
                ),
              ]),
            ]),
          ]),
        ]),
      ]),
    ),
  );

  const group = byTestId(mounted.root, 'group');
  const item = byTestId(mounted.root, 'item');
  expect(group.className).toContain('relative');
  expect(item.className).toContain('relative');
  // The action's own absolute-positioned ancestor must be its immediate container, not
  // something further up the tree (Sidebar) that would place it in the wrong corner.
  expect(byTestId(mounted.root, 'group-action').closest('.relative')).toBe(
    group,
  );
  expect(byTestId(mounted.root, 'item-action').closest('.relative')).toBe(item);

  mounted.app.unmount();
  mounted.root.remove();
});

test('the provider fills its parent height so Sidebar and Inset can stretch', () => {
  const { app, root } = mountTree(
    h(SidebarProvider, null, () => h(Sidebar, null, () => 'Nav')),
  );

  expect(
    root.querySelector('[data-slot="sidebar-provider"]')?.className,
  ).toContain('h-full');

  app.unmount();
  root.remove();
});

test('inset variant floats both Sidebar and SidebarInset as separate cards', () => {
  const flat = mountTree(
    h(SidebarProvider, { variant: 'sidebar' }, () => [
      h(Sidebar, null, () => 'Nav'),
      h(SidebarInset, null, () => 'Page'),
    ]),
  );
  expect(
    flat.root.querySelector('[data-slot="sidebar-inset"]')?.className,
  ).not.toContain('rounded-cladd-dialog');
  flat.app.unmount();
  flat.root.remove();

  const inset = mountTree(
    h(SidebarProvider, { variant: 'inset' }, () => [
      h(Sidebar, null, () => 'Nav'),
      h(SidebarInset, null, () => 'Page'),
    ]),
  );
  const sidebarEl = inset.root.querySelector('[data-slot="sidebar"]');
  const insetEl = inset.root.querySelector('[data-slot="sidebar-inset"]');
  expect(sidebarEl?.className).toContain('rounded-cladd-dialog');
  expect(insetEl?.className).toContain('rounded-cladd-dialog');
  expect(insetEl?.className).toContain('border');
  inset.app.unmount();
  inset.root.remove();
});

test('the rail toggles open state and anchors to the sidebar edge', async () => {
  const open = ref(true);
  const harness = defineComponent({
    setup() {
      return () =>
        h(
          SidebarProvider,
          {
            'onUpdate:open': (value: boolean) => (open.value = value),
            open: open.value,
          },
          () => h(Sidebar, null, () => [h(SidebarRail)]),
        );
    },
  });
  const mounted = mountTree(h(harness));

  const sidebarEl = mounted.root.querySelector('[data-slot="sidebar"]');
  expect(sidebarEl?.className).toContain('relative');
  const rail = mounted.root.querySelector<HTMLButtonElement>(
    '[data-slot="sidebar-rail"]',
  );
  expect(rail?.getAttribute('aria-label')).toBe('Collapse sidebar');

  await click(rail!);
  expect(open.value).toBe(false);

  mounted.app.unmount();
  mounted.root.remove();
});

test('controls desktop state and ignores its shortcut while typing', async () => {
  const open = ref(true);
  const harness = defineComponent({
    setup() {
      return () =>
        h(
          SidebarProvider,
          {
            keyboardShortcut: true,
            'onUpdate:open': (value: boolean) => (open.value = value),
            open: open.value,
          },
          {
            default: () => [
              h(Sidebar, { collapsible: true }, () => 'Navigation'),
              h(SidebarTrigger),
            ],
          },
        );
    },
  });
  const mounted = mountTree(h(harness));
  document.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, ctrlKey: true, key: 'b' }),
  );
  await nextTick();
  expect(open.value).toBe(false);
  const input = document.createElement('input');
  document.body.append(input);
  input.focus();
  input.dispatchEvent(
    new KeyboardEvent('keydown', { bubbles: true, ctrlKey: true, key: 'b' }),
  );
  await nextTick();
  expect(open.value).toBe(false);
  input.remove();
  mounted.app.unmount();
  mounted.root.remove();
});

function mountNav(open: boolean) {
  return mountTree(
    h(
      SidebarProvider,
      { open },
      {
        default: () => [
          h(Sidebar, null, () => [
            h(SidebarGroup, null, () => [
              h(SidebarGroupLabel, null, () => 'Workspace'),
              h(SidebarMenu, null, () => [
                h(SidebarMenuItem, null, () => [
                  h(
                    SidebarMenuButton,
                    {
                      active: true,
                      'data-testid': 'reports-button',
                      tooltip: 'Reports',
                    },
                    () => 'Reports',
                  ),
                  h(
                    SidebarMenuAction,
                    { 'data-testid': 'reports-action' },
                    () => 'Menu',
                  ),
                  h(SidebarMenuSub, null, () => [
                    h(SidebarMenuSubItem, null, () => [
                      h(
                        SidebarMenuSubButton,
                        { 'data-testid': 'reports-quarterly' },
                        () => 'Quarterly',
                      ),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ],
      },
    ),
  );
}

test('nested navigation renders sub-items and an item action menu', () => {
  const mounted = mountNav(true);

  const button = byTestId(mounted.root, 'reports-button');
  expect(button.getAttribute('aria-current')).toBe('page');
  expect(
    mounted.root.querySelector('[data-slot="sidebar-menu-sub"]'),
  ).not.toBeNull();
  expect(byTestId(mounted.root, 'reports-quarterly').textContent).toBe(
    'Quarterly',
  );
  expect(byTestId(mounted.root, 'reports-action').textContent).toBe('Menu');

  mounted.app.unmount();
  mounted.root.remove();
});

test('collapsed desktop sidebar exposes the item label through a Tooltip trigger', () => {
  const mountedOpen = mountNav(true);
  const openButton = byTestId(mountedOpen.root, 'reports-button');
  expect(openButton.getAttribute('aria-label')).toBeNull();
  mountedOpen.app.unmount();
  mountedOpen.root.remove();

  const mounted = mountNav(false);
  const button = byTestId(mounted.root, 'reports-button');
  expect(button.getAttribute('aria-label')).toBe('Reports');
  expect(button.getAttribute('aria-current')).toBe('page');

  mounted.app.unmount();
  mounted.root.remove();
});

test('collapsed desktop sidebar actually renders icon-only, not squeezed text', () => {
  const expanded = mountNav(true);
  const expandedLabel = expanded.root.querySelector('[data-part="label"]');
  expect(expandedLabel?.className).toContain('truncate');
  expect(expandedLabel?.className).not.toContain('sr-only');
  expect(
    expanded.root.querySelector('[data-slot="sidebar-group-label"]')?.className,
  ).not.toContain('sr-only');
  expect(
    expanded.root.querySelector('[data-slot="sidebar-menu-action"]'),
  ).not.toBeNull();
  expanded.app.unmount();
  expanded.root.remove();

  const collapsed = mountNav(false);
  const label = collapsed.root.querySelector('[data-part="label"]');
  expect(label?.textContent).toBe('Reports');
  expect(label?.className).toContain('sr-only');
  expect(
    collapsed.root.querySelector('[data-slot="sidebar-group-label"]')
      ?.className,
  ).toContain('sr-only');
  expect(
    collapsed.root.querySelector('[data-slot="sidebar-menu-action"]'),
  ).toBeNull();
  expect(
    collapsed.root.querySelector('[data-slot="sidebar-menu-sub"]'),
  ).toBeNull();
  const button = byTestId(collapsed.root, 'reports-button');
  expect(button.className).toContain('aspect-square');
  collapsed.app.unmount();
  collapsed.root.remove();
});

test('mobile presentation renders the sidebar through Sheet without collapsing to icons', () => {
  const mounted = mountTree(
    h(
      SidebarProvider,
      { defaultMobileOpen: true, mobile: true },
      {
        default: () => [
          h(Sidebar, null, () => [
            h(
              SidebarMenuButton,
              { 'data-testid': 'mobile-button', tooltip: 'Reports' },
              () => 'Reports',
            ),
          ]),
        ],
      },
    ),
  );

  const button = byTestId(mounted.root, 'mobile-button');
  expect(button.getAttribute('aria-label')).not.toBe('Reports');
  expect(mounted.root.querySelector('[role="dialog"]')).not.toBeNull();

  mounted.app.unmount();
  mounted.root.remove();
});
