<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <div
    class="cladd-empty flex flex-col items-center gap-4 p-8 text-center"
    data-slot="empty"
  >
    <slot />
  </div>
</template>
