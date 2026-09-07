<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <div
    class="cladd-empty-title text-cladd-sm font-semibold"
    data-slot="empty-title"
  >
    <slot />
  </div>
</template>
