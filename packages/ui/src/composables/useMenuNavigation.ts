import { onUnmounted, ref, type Ref } from 'vue';

const menuItemSelector =
  '[data-menu-item]:not([data-disabled]):not([aria-disabled="true"])';

function menuItems(container: HTMLElement): HTMLElement[] {
  const root = container.closest('[data-menu-content]');
  const scope = (root ?? container) as HTMLElement;
  return [...scope.querySelectorAll<HTMLElement>(menuItemSelector)].filter(
    (item) => item.closest('[data-menu-content]') === root,
  );
}

function focusItem(item: HTMLElement | undefined): void {
  item?.focus();
}

export interface MenuNavigationOptions {
  close: () => void;
  closeSub?: () => void;
  container: Ref<HTMLElement | undefined>;
  openSub?: () => void;
}

export function useMenuNavigation(options: MenuNavigationOptions): {
  onFocusIn: (event: FocusEvent) => void;
  onKeydown: (event: KeyboardEvent) => void;
} {
  const typeahead = ref('');
  let typeaheadTimer: ReturnType<typeof setTimeout> | undefined;

  function resetTypeahead(): void {
    typeahead.value = '';
    if (typeaheadTimer) clearTimeout(typeaheadTimer);
    typeaheadTimer = undefined;
  }
  function focusByOffset(
    container: HTMLElement,
    current: HTMLElement,
    offset: 1 | -1,
  ): void {
    const items = menuItems(container);
    if (items.length === 0) return;
    const index = items.indexOf(current);
    focusItem(items[(index + offset + items.length) % items.length]);
  }
  function focusEdge(container: HTMLElement, edge: 'first' | 'last'): void {
    const items = menuItems(container);
    focusItem(edge === 'first' ? items[0] : items[items.length - 1]);
  }
  function typeaheadMove(container: HTMLElement, key: string): void {
    typeahead.value += key.toLowerCase();
    if (typeaheadTimer) clearTimeout(typeaheadTimer);
    typeaheadTimer = setTimeout(resetTypeahead, 500);
    const match = menuItems(container).find((item) =>
      (item.textContent ?? '').trim().toLowerCase().startsWith(typeahead.value),
    );
    focusItem(match);
  }
  function onFocusIn(event: FocusEvent): void {
    const container = options.container.value;
    const target = event.target;
    if (
      !container ||
      !(target instanceof HTMLElement) ||
      !target.matches('[data-menu-item]')
    )
      return;
    for (const item of menuItems(container))
      item.tabIndex = item === target ? 0 : -1;
  }
  function onKeydown(event: KeyboardEvent): void {
    const container = options.container.value;
    const target = event.target;
    if (
      !container ||
      !(target instanceof HTMLElement) ||
      !target.matches('[data-menu-item]')
    )
      return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusByOffset(container, target, 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusByOffset(container, target, -1);
        break;
      case 'Home':
        event.preventDefault();
        focusEdge(container, 'first');
        break;
      case 'End':
        event.preventDefault();
        focusEdge(container, 'last');
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (target.dataset.menuSubTrigger === 'true') {
          if (options.openSub) options.openSub();
          else target.click();
        } else target.click();
        break;
      case 'ArrowRight':
        if (target.dataset.menuSubTrigger === 'true') {
          event.preventDefault();
          if (options.openSub) options.openSub();
          else target.click();
        }
        break;
      case 'ArrowLeft':
        if (options.closeSub) {
          event.preventDefault();
          event.stopPropagation();
          options.closeSub();
        }
        break;
      case 'Escape':
        event.preventDefault();
        event.stopPropagation();
        if (options.closeSub) options.closeSub();
        else options.close();
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey)
          typeaheadMove(container, event.key);
    }
  }
  onUnmounted(resetTypeahead);
  return { onFocusIn, onKeydown };
}

export function focusFirstMenuItem(container: HTMLElement | undefined): void {
  if (!container) return;
  const items = menuItems(container);
  for (const [index, item] of items.entries())
    item.tabIndex = index === 0 ? 0 : -1;
  focusItem(items[0]);
}
