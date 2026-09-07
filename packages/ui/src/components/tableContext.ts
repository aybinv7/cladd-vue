import { inject, provide, type ComputedRef, type InjectionKey } from 'vue';

import type { TableDensity } from './table.contracts.ts';

export interface TableContextValue {
  density: ComputedRef<TableDensity>;
  hoverable: ComputedRef<boolean>;
}

const tableContextKey: InjectionKey<TableContextValue> = Symbol('cladd-table');

export function provideTableContext(
  value: TableContextValue,
): TableContextValue {
  provide(tableContextKey, value);
  return value;
}

export function useTableContext(): TableContextValue | null {
  return inject(tableContextKey, null);
}
