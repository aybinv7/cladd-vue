<script setup lang="ts">
import PaginationLink from './PaginationLink.vue';
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <PaginationLink label="Go to previous page" data-slot="pagination-previous"
    ><slot>Previous</slot></PaginationLink
  >
</template>
