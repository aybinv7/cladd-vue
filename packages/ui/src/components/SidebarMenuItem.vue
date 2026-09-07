<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <li class="cladd-sidebar-menu-item relative" data-slot="sidebar-menu-item">
    <slot />
  </li>
</template>
