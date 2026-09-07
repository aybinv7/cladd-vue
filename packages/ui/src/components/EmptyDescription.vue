<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <div
    class="cladd-empty-description text-cladd-xs text-cladd-fg-soft"
    data-slot="empty-description"
  >
    <slot />
  </div>
</template>
