<script setup lang="ts">
import PaginationLink from './PaginationLink.vue';
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <PaginationLink label="Go to next page" data-slot="pagination-next"
    ><slot>Next</slot></PaginationLink
  >
</template>
