<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <div
    aria-hidden="true"
    class="cladd-empty-media text-cladd-fg-softer [&>svg]:size-10"
    data-slot="empty-media"
  >
    <slot />
  </div>
</template>
