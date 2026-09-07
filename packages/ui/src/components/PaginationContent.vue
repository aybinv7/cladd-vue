<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <ul
    class="cladd-pagination-content flex items-center gap-1"
    data-slot="pagination-content"
  >
    <slot />
  </ul>
</template>
