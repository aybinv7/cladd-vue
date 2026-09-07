<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue';

import { cn } from '../shared/cn.ts';
import { useAvatarContext } from './avatarContext.ts';

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<{ src?: string }>(), {
  src: undefined,
});
const attrs = useAttrs();
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const avatar = useAvatarContext();
watch(
  () => props.src,
  (src) => {
    avatar.status.value = src ? 'loading' : 'idle';
  },
  { immediate: true },
);
const rootClass = computed(() =>
  cn(
    'cladd-avatar-image absolute inset-0 size-full object-cover',
    avatar.status.value === 'loaded' ? 'block' : 'hidden',
    attrs.class,
  ),
);
</script>
<template>
  <img
    v-bind="rootAttrs"
    :class="rootClass"
    data-slot="avatar-image"
    :src="props.src"
    @error="avatar.status.value = 'error'"
    @load="avatar.status.value = 'loaded'"
  />
</template>
