<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '../shared/cn.ts';
import Button from './Button.vue';
import type { SidebarMenuButtonProps } from './sidebar.contracts.ts';
import { useSidebar } from './sidebarContext.ts';
import Tooltip from './Tooltip.vue';
defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown; icon?: () => unknown }>();
const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
  active: undefined,
  tooltip: undefined,
});
const attrs = useAttrs();
const sidebar = useSidebar();
const collapsed = computed(() => !sidebar.mobile.value && !sidebar.open.value);
const classes = computed(() =>
  cn(
    'cladd-sidebar-menu-button w-full',
    collapsed.value ? 'justify-center' : 'justify-start',
    props.active && 'bg-cladd-surface-highlight text-cladd-fg',
    attrs.class,
  ),
);
const contentClass = computed(() =>
  cn('gap-2', collapsed.value ? 'justify-center px-0' : 'justify-start'),
);
</script>
<template>
  <Tooltip v-if="collapsed && props.tooltip" :tooltip="props.tooltip">
    <template #trigger>
      <Button
        v-bind="$attrs"
        :aria-current="props.active ? 'page' : undefined"
        :aria-label="props.tooltip"
        :class="classes"
        :content-class-name="contentClass"
        :square="collapsed"
        size="sm"
        variant="transparent"
        data-slot="sidebar-menu-button"
      >
        <span
          v-if="$slots.icon"
          class="flex shrink-0 items-center [&>svg]:size-4"
          data-part="icon"
          ><slot name="icon"
        /></span>
        <span :class="collapsed ? 'sr-only' : 'truncate'" data-part="label"
          ><slot
        /></span>
      </Button>
    </template>
  </Tooltip>
  <Button
    v-else
    v-bind="$attrs"
    :aria-current="props.active ? 'page' : undefined"
    :class="classes"
    :content-class-name="contentClass"
    :square="collapsed"
    size="sm"
    variant="transparent"
    data-slot="sidebar-menu-button"
  >
    <span
      v-if="$slots.icon"
      class="flex shrink-0 items-center [&>svg]:size-4"
      data-part="icon"
      ><slot name="icon"
    /></span>
    <span :class="collapsed ? 'sr-only' : 'truncate'" data-part="label"
      ><slot
    /></span>
  </Button>
</template>
