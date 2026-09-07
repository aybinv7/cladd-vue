<script setup lang="ts">
import { computed, shallowRef, useAttrs } from 'vue';

import { cn } from '../shared/cn.ts';
import { provideAvatarContext, type AvatarStatus } from './avatarContext.ts';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn(
    'cladd-avatar relative inline-flex size-8 shrink-0 overflow-hidden rounded-full bg-cladd-surface-highlight',
    attrs.class,
  ),
);
const status = shallowRef<AvatarStatus>('idle');
provideAvatarContext({ status });
</script>
<template>
  <span v-bind="rootAttrs" :class="rootClass" data-slot="avatar">
    <slot />
  </span>
</template>
