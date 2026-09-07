<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import Surface from './Surface.vue';
import type { TableProps } from './table.contracts.ts';
import { provideTableContext } from './tableContext.ts';

defineOptions({ inheritAttrs: false });

defineSlots<{
  default?: () => unknown;
}>();

const props = withDefaults(defineProps<TableProps>(), {
  density: undefined,
  hoverable: undefined,
  stickyHeader: undefined,
  wrapperClassName: undefined,
});

const attrs = useAttrs();
const d = useComponentDefaults('Table', props, {
  density: 'comfortable' as const,
  hoverable: false,
  stickyHeader: false,
  wrapperClassName: '',
});

const density = computed(() => d.value.density);
const hoverable = computed(() => d.value.hoverable);
provideTableContext({ density, hoverable });

const rootAttrs = computed(() => {
  const { class: _consumerClass, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn(
    'cladd-table-container rounded-cladd-dialog',
    d.value.wrapperClassName,
    attrs.class,
  ),
);
const contentClass = computed(() => 'w-full overflow-x-auto');
const tableClass = computed(() =>
  cn(
    'cladd-table w-full border-collapse text-left text-cladd-xs text-cladd-fg',
    d.value.density === 'compact'
      ? '[&_td]:px-2 [&_td]:py-1 [&_th]:px-2 [&_th]:py-1'
      : '[&_td]:px-3 [&_td]:py-2 [&_th]:px-3 [&_th]:py-2',
  ),
);
</script>

<template>
  <Surface
    v-bind="rootAttrs"
    :class="rootClass"
    :content-class-name="contentClass"
    data-slot="table-container"
    outline
  >
    <table :class="tableClass" :data-density="d.density" data-slot="table">
      <slot />
    </table>
  </Surface>
</template>
