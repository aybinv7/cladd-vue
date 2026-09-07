<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <nav
    aria-label="Pagination"
    class="cladd-pagination flex justify-center"
    data-slot="pagination"
  >
    <slot />
  </nav>
</template>
