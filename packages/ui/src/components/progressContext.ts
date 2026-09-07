import { inject, provide, type ComputedRef, type InjectionKey } from 'vue';

export interface ProgressContextValue {
  indeterminate: ComputedRef<boolean>;
  max: ComputedRef<number>;
  min: ComputedRef<number>;
  percent: ComputedRef<number | undefined>;
  value: ComputedRef<number | undefined>;
}

const progressContextKey: InjectionKey<ProgressContextValue> =
  Symbol('cladd-progress');

export function provideProgressContext(
  value: ProgressContextValue,
): ProgressContextValue {
  provide(progressContextKey, value);
  return value;
}

export function useProgressContext(): ProgressContextValue {
  const context = inject(progressContextKey, null);
  if (!context)
    throw new Error('cladd-vue: Progress components must be inside Progress.');
  return context;
}
