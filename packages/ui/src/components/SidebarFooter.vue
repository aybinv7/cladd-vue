<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <footer class="cladd-sidebar-footer shrink-0 p-2" data-slot="sidebar-footer">
    <slot />
  </footer>
</template>
