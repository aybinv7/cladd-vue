<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>

<template>
  <span
    class="cladd-command-shortcut ml-auto text-cladd-2xs text-cladd-fg-softer"
    data-slot="command-shortcut"
    ><slot
  /></span>
</template>
