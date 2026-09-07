<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <div
    class="cladd-empty-content flex items-center gap-2"
    data-slot="empty-content"
  >
    <slot />
  </div>
</template>
