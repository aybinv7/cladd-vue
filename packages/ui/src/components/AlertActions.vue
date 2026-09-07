<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <div
    class="cladd-alert-actions flex items-center gap-2 pt-1"
    data-slot="alert-actions"
  >
    <slot />
  </div>
</template>
