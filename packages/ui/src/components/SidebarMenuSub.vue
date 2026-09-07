<script setup lang="ts">
import { computed } from 'vue';

import { useSidebar } from './sidebarContext.ts';
defineSlots<{ default?: () => unknown }>();
const sidebar = useSidebar();
const collapsed = computed(() => !sidebar.mobile.value && !sidebar.open.value);
</script>
<template>
  <ul
    v-if="!collapsed"
    class="cladd-sidebar-menu-sub ms-4 mt-1 mb-1 flex flex-col gap-1 border-s border-cladd-outline ps-2"
    data-slot="sidebar-menu-sub"
  >
    <slot />
  </ul>
</template>
