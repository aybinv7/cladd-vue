<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <span class="cladd-progress-label" data-slot="progress-label">
    <slot />
  </span>
</template>
