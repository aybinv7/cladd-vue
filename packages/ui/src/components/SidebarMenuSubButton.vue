<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '../shared/cn.ts';
import Button from './Button.vue';
defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const classes = computed(() =>
  cn('cladd-sidebar-menu-sub-button w-full justify-start', attrs.class),
);
</script>
<template>
  <Button
    v-bind="$attrs"
    :class="classes"
    size="sm"
    variant="transparent"
    data-slot="sidebar-menu-sub-button"
    ><slot
  /></Button>
</template>
