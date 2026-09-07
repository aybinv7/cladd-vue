import {
  inject,
  provide,
  type InjectionKey,
  type Ref,
  type ShallowRef,
} from 'vue';

export interface MenuChain {
  closeChain: () => void;
  open: Readonly<Ref<boolean>>;
  setOpen: (open: boolean) => void;
}
const menuChainKey: InjectionKey<MenuChain> = Symbol('cladd-menu-chain');
export function provideMenuChain(value: MenuChain): MenuChain {
  provide(menuChainKey, value);
  return value;
}
export function useMenuChain(): MenuChain | null {
  return inject(menuChainKey, null);
}

export interface DropdownMenuRootContext {
  anchor: ShallowRef<HTMLElement | undefined>;
  open: Readonly<Ref<boolean>>;
  setOpen: (open: boolean) => void;
}
const dropdownMenuRootKey: InjectionKey<DropdownMenuRootContext> = Symbol(
  'cladd-dropdown-menu-root',
);
export function provideDropdownMenuRoot(
  value: DropdownMenuRootContext,
): DropdownMenuRootContext {
  provide(dropdownMenuRootKey, value);
  return value;
}
export function useDropdownMenuRoot(): DropdownMenuRootContext | null {
  return inject(dropdownMenuRootKey, null);
}

export interface DropdownMenuSubContext {
  anchor: ShallowRef<HTMLElement | undefined>;
  open: Readonly<Ref<boolean>>;
  setOpen: (open: boolean) => void;
}
const dropdownMenuSubKey: InjectionKey<DropdownMenuSubContext> = Symbol(
  'cladd-dropdown-menu-sub',
);
export function provideDropdownMenuSub(
  value: DropdownMenuSubContext,
): DropdownMenuSubContext {
  provide(dropdownMenuSubKey, value);
  return value;
}
export function useDropdownMenuSub(): DropdownMenuSubContext | null {
  return inject(dropdownMenuSubKey, null);
}

export interface ContextMenuRootContext {
  anchorRect: Readonly<Ref<DOMRectReadOnly | undefined>>;
  open: Readonly<Ref<boolean>>;
  setAnchorRect: (rect: DOMRectReadOnly | undefined) => void;
  setOpen: (open: boolean) => void;
  trigger: ShallowRef<HTMLElement | undefined>;
}
const contextMenuRootKey: InjectionKey<ContextMenuRootContext> = Symbol(
  'cladd-context-menu-root',
);
export function provideContextMenuRoot(
  value: ContextMenuRootContext,
): ContextMenuRootContext {
  provide(contextMenuRootKey, value);
  return value;
}
export function useContextMenuRoot(): ContextMenuRootContext | null {
  return inject(contextMenuRootKey, null);
}

export interface MenuRadioGroupContext {
  onSelect: (value: string) => void;
  value: Readonly<Ref<string>>;
}
const menuRadioGroupKey: InjectionKey<MenuRadioGroupContext> = Symbol(
  'cladd-menu-radio-group',
);
export function provideMenuRadioGroup(
  value: MenuRadioGroupContext,
): MenuRadioGroupContext {
  provide(menuRadioGroupKey, value);
  return value;
}
export function useMenuRadioGroup(): MenuRadioGroupContext | null {
  return inject(menuRadioGroupKey, null);
}
