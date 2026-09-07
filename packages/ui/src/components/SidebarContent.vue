<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <div
    class="cladd-sidebar-content min-h-0 flex-1 overflow-auto"
    data-slot="sidebar-content"
  >
    <slot />
  </div>
</template>
