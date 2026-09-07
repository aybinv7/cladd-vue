<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '../shared/cn.ts';
import { useSidebar } from './sidebarContext.ts';
defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const sidebar = useSidebar();
const collapsed = computed(() => !sidebar.mobile.value && !sidebar.open.value);
const classes = computed(() =>
  cn(
    'cladd-sidebar-group-label px-2 text-xs font-medium text-cladd-fg-soft',
    collapsed.value && 'sr-only',
    attrs.class,
  ),
);
</script>
<template>
  <div v-bind="$attrs" :class="classes" data-slot="sidebar-group-label">
    <slot />
  </div>
</template>
