import { inject, provide, type InjectionKey, type ShallowRef } from 'vue';

export type AvatarStatus = 'error' | 'idle' | 'loaded' | 'loading';

export interface AvatarContextValue {
  status: ShallowRef<AvatarStatus>;
}

const avatarContextKey: InjectionKey<AvatarContextValue> =
  Symbol('cladd-avatar');

export function provideAvatarContext(
  value: AvatarContextValue,
): AvatarContextValue {
  provide(avatarContextKey, value);
  return value;
}

export function useAvatarContext(): AvatarContextValue {
  const context = inject(avatarContextKey, null);
  if (!context)
    throw new Error('cladd-vue: Avatar components must be inside Avatar.');
  return context;
}
