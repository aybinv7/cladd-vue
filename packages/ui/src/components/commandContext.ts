import {
  inject,
  provide,
  shallowRef,
  type ComputedRef,
  type InjectionKey,
  type ShallowRef,
} from 'vue';

export interface CommandContextValue {
  activeId: ShallowRef<string | undefined>;
  filter: ComputedRef<(value: string, query: string) => boolean>;
  list: ShallowRef<HTMLElement | undefined>;
  query: ComputedRef<string>;
  setQuery: (value: string) => void;
}

const commandContextKey: InjectionKey<CommandContextValue> =
  Symbol('cladd-command');

export function provideCommandContext(
  value: CommandContextValue,
): CommandContextValue {
  provide(commandContextKey, value);
  return value;
}

export function useCommandContext(): CommandContextValue {
  const context = inject(commandContextKey, null);
  if (!context)
    throw new Error(
      'cladd-vue: Command components must be inside CommandRoot.',
    );
  return context;
}

export function createCommandContext(options: {
  filter: ComputedRef<(value: string, query: string) => boolean>;
  query: ComputedRef<string>;
  setQuery: (value: string) => void;
}): CommandContextValue {
  return {
    activeId: shallowRef(),
    filter: options.filter,
    list: shallowRef(),
    query: options.query,
    setQuery: options.setQuery,
  };
}

export function commandItems(list: HTMLElement | undefined): HTMLElement[] {
  if (!list) return [];
  return [
    ...list.querySelectorAll<HTMLElement>(
      '[data-command-item]:not([data-disabled])',
    ),
  ];
}

export function commandActiveItem(
  context: CommandContextValue,
): HTMLElement | undefined {
  return context.activeId.value
    ? (context.list.value?.querySelector<HTMLElement>(
        `#${CSS.escape(context.activeId.value)}`,
      ) ?? undefined)
    : undefined;
}

export function ensureCommandActive(context: CommandContextValue): void {
  const items = commandItems(context.list.value);
  if (items.some((item) => item.id === context.activeId.value)) return;
  context.activeId.value = items[0]?.id;
}

export const defaultCommandFilter = (value: string, query: string): boolean =>
  value.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
