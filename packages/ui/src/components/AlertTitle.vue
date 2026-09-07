<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <div class="cladd-alert-title font-semibold" data-slot="alert-title">
    <slot />
  </div>
</template>
