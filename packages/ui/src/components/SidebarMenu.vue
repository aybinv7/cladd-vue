<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <ul class="cladd-sidebar-menu flex flex-col gap-1" data-slot="sidebar-menu">
    <slot />
  </ul>
</template>
