<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <div
    class="cladd-empty-header flex flex-col items-center gap-2"
    data-slot="empty-header"
  >
    <slot />
  </div>
</template>
