import { inject, provide, type ComputedRef, type InjectionKey } from 'vue';

import type { SidebarSide, SidebarVariant } from './sidebar.contracts.ts';

export interface SidebarContextValue {
  mobile: ComputedRef<boolean>;
  mobileOpen: ComputedRef<boolean>;
  open: ComputedRef<boolean>;
  side: ComputedRef<SidebarSide>;
  variant: ComputedRef<SidebarVariant>;
  setMobileOpen: (open: boolean) => void;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}
const sidebarContextKey: InjectionKey<SidebarContextValue> =
  Symbol('cladd-sidebar');
export function provideSidebarContext(
  value: SidebarContextValue,
): SidebarContextValue {
  provide(sidebarContextKey, value);
  return value;
}
export function useSidebar(): SidebarContextValue {
  const context = inject(sidebarContextKey, null);
  if (!context)
    throw new Error(
      'cladd-vue: Sidebar components must be inside SidebarProvider.',
    );
  return context;
}
