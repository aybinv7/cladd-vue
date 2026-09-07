<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '../shared/cn.ts';
import Button from './Button.vue';
import type { PaginationLinkProps } from './pagination.contracts.ts';
defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<PaginationLinkProps>(), {
  active: undefined,
  label: undefined,
});
const attrs = useAttrs();
const classes = computed(() =>
  cn('cladd-pagination-link min-w-8', attrs.class),
);
</script>
<template>
  <Button
    data-slot="pagination-link"
    v-bind="$attrs"
    :aria-current="props.active ? 'page' : undefined"
    :aria-label="props.label"
    :class="classes"
    :variant="props.active ? 'solid' : 'transparent'"
    size="sm"
    square
    ><slot
  /></Button>
</template>
