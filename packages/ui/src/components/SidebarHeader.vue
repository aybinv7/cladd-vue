<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <header class="cladd-sidebar-header shrink-0 p-2" data-slot="sidebar-header">
    <slot />
  </header>
</template>
