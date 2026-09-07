<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <li data-slot="sidebar-menu-sub-item"><slot /></li>
</template>
