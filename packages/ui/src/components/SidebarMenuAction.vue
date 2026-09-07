<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '../shared/cn.ts';
import Button from './Button.vue';
import { useSidebar } from './sidebarContext.ts';
defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const sidebar = useSidebar();
const collapsed = computed(() => !sidebar.mobile.value && !sidebar.open.value);
const classes = computed(() =>
  cn('cladd-sidebar-menu-action absolute end-1 top-1', attrs.class),
);
</script>
<template>
  <Button
    v-if="!collapsed"
    v-bind="$attrs"
    :class="classes"
    size="xs"
    square
    variant="transparent"
    data-slot="sidebar-menu-action"
    ><slot
  /></Button>
</template>
