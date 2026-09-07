<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '../shared/cn.ts';
import Surface from './Surface.vue';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn('cladd-card rounded-cladd-dialog', attrs.class),
);
</script>
<template>
  <Surface
    v-bind="rootAttrs"
    :class="rootClass"
    content-class-name="flex flex-col gap-4 p-4"
    data-slot="card"
    outline
  >
    <slot />
  </Surface>
</template>
