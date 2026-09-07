<script setup lang="ts">
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <li aria-hidden="true" data-slot="breadcrumb-separator"><slot>/</slot></li>
</template>
