<script setup lang="ts">
import { useSidebar } from './sidebarContext.ts';
const sidebar = useSidebar();
</script>
<template>
  <button
    type="button"
    class="cladd-sidebar-rail group absolute inset-y-0 end-0 z-20 w-4 -translate-x-1/2 cursor-ew-resize touch-none select-none after:absolute after:inset-y-0 after:start-1/2 after:w-px after:bg-cladd-outline after:transition-colors after:duration-200 hover:after:bg-cladd-primary"
    :aria-label="sidebar.open.value ? 'Collapse sidebar' : 'Expand sidebar'"
    data-slot="sidebar-rail"
    @click="sidebar.toggle"
  />
</template>
