<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <li data-slot="pagination-item"><slot /></li>
</template>
