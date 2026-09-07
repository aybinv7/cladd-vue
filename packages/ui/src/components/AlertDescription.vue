<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <div
    class="cladd-alert-description text-cladd-xs text-cladd-fg-soft"
    data-slot="alert-description"
  >
    <slot />
  </div>
</template>
