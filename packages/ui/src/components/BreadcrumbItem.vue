<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <li data-slot="breadcrumb-item"><slot /></li>
</template>
