<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '../shared/cn.ts';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn('cladd-card-footer flex items-center gap-2', attrs.class),
);
</script>
<template>
  <div v-bind="rootAttrs" :class="rootClass" data-slot="card-footer">
    <slot />
  </div>
</template>
