<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <span aria-current="page" data-slot="breadcrumb-page"><slot /></span>
</template>
