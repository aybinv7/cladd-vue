<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { AvatarGroupProps } from './avatar.contracts.ts';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<AvatarGroupProps>(), {
  overlap: undefined,
});
const attrs = useAttrs();
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const d = useComponentDefaults('AvatarGroup', props, { overlap: 8 });
const rootClass = computed(() =>
  cn(
    'cladd-avatar-group flex items-center [&>*]:ring-2 [&>*]:ring-cladd-bg [&>*:not(:first-child)]:ms-[var(--cladd-avatar-group-overlap)]',
    attrs.class,
  ),
);
const rootStyle = computed(() => ({
  '--cladd-avatar-group-overlap': `-${d.value.overlap}px`,
}));
</script>
<template>
  <div
    v-bind="rootAttrs"
    :class="rootClass"
    data-slot="avatar-group"
    :style="rootStyle"
  >
    <slot />
  </div>
</template>
