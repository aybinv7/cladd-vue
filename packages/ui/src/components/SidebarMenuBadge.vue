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
    'cladd-sidebar-menu-badge ms-auto text-xs text-cladd-fg-soft',
    attrs.class,
  ),
);
</script>
<template>
  <span
    v-if="!collapsed"
    v-bind="$attrs"
    :class="classes"
    data-slot="sidebar-menu-badge"
    ><slot
  /></span>
</template>
