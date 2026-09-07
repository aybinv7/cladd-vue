<script setup lang="ts">
import { computed } from 'vue';

import { cn } from '../shared/cn.ts';
import { useSidebar } from './sidebarContext.ts';

defineSlots<{ default?: () => unknown }>();
const sidebar = useSidebar();
const classes = computed(() =>
  cn(
    'cladd-sidebar-inset relative flex min-w-0 flex-1 flex-col bg-cladd-bg',
    sidebar.variant.value === 'inset' &&
      'm-2 overflow-hidden rounded-cladd-dialog border border-cladd-outline shadow-cladd-outline',
  ),
);
</script>
<template>
  <main :class="classes" data-slot="sidebar-inset">
    <slot />
  </main>
</template>
