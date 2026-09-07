<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '../shared/cn.ts';
defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const classes = computed(() =>
  cn(
    'cladd-breadcrumb-link text-cladd-fg-soft hover:text-cladd-fg focus-visible:ring-2 focus-visible:ring-cladd-primary focus-visible:outline-none',
    attrs.class,
  ),
);
</script>
<template>
  <a v-bind="$attrs" :class="classes" data-slot="breadcrumb-link"><slot /></a>
</template>
