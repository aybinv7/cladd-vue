<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '../shared/cn.ts';
defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const classes = computed(() =>
  cn('cladd-sidebar-group relative px-2 py-2', attrs.class),
);
</script>
<template>
  <section v-bind="$attrs" :class="classes" data-slot="sidebar-group">
    <slot />
  </section>
</template>
