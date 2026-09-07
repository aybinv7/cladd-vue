<script setup lang="ts">
import { useSidebar } from './sidebarContext.ts';
defineSlots<{ default?: () => unknown }>();
const sidebar = useSidebar();
</script>
<template>
  <button
    aria-label="Toggle sidebar"
    class="cladd-sidebar-trigger inline-flex size-7 shrink-0 items-center justify-center rounded-cladd-xs text-cladd-fg-soft transition-colors duration-200 hover:bg-cladd-surface-highlight"
    data-slot="sidebar-trigger"
    type="button"
    @click="sidebar.toggle()"
  >
    <slot>
      <svg
        aria-hidden="true"
        class="size-4"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
      >
        <rect height="18" rx="2" width="18" x="3" y="3" />
        <path d="M9 3v18" />
      </svg>
    </slot>
  </button>
</template>
