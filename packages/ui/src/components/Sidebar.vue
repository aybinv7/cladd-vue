<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '../shared/cn.ts';
import Sheet from './Sheet.vue';
import type { SidebarProps } from './sidebar.contracts.ts';
import { useSidebar } from './sidebarContext.ts';
defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: undefined,
  side: undefined,
  variant: undefined,
});
const attrs = useAttrs();
const sidebar = useSidebar();
const mobileOpen = computed({
  get: () => sidebar.mobileOpen.value,
  set: (value: boolean) => sidebar.setMobileOpen(value),
});
const classes = computed(() =>
  cn(
    'cladd-sidebar relative flex h-full shrink-0 flex-col border-cladd-outline bg-cladd-surface transition-[width,transform] duration-200',
    (props.side ?? sidebar.side.value) === 'inline-end'
      ? 'border-s'
      : 'border-e',
    (props.variant ?? sidebar.variant.value) === 'floating' &&
      'm-2 rounded-cladd-popup border',
    (props.variant ?? sidebar.variant.value) === 'inset' &&
      'm-2 rounded-cladd-dialog',
    props.collapsible && !sidebar.open.value ? 'w-14' : 'w-64',
    attrs.class,
  ),
);
</script>
<template>
  <Sheet
    v-if="sidebar.mobile.value"
    v-model:open="mobileOpen"
    :side="props.side ?? sidebar.side.value"
  >
    <aside v-bind="$attrs" :class="classes" data-slot="sidebar"><slot /></aside>
  </Sheet>
  <aside v-else v-bind="$attrs" :class="classes" data-slot="sidebar">
    <slot />
  </aside>
</template>
