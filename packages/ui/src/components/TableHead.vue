<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import Button from './Button.vue';
import DropdownIcon from './icons/DropdownIcon.vue';
import type { TableHeadProps } from './table.contracts.ts';

defineOptions({ inheritAttrs: false });

defineSlots<{
  default?: () => unknown;
}>();

const props = withDefaults(defineProps<TableHeadProps>(), {
  numeric: undefined,
  scope: undefined,
  sortable: undefined,
  sortDirection: undefined,
});

const emit = defineEmits<{
  sort: [];
}>();

const attrs = useAttrs();
const d = useComponentDefaults('TableHead', props, {
  numeric: false,
  scope: 'col',
  sortable: false,
  sortDirection: 'none',
});

const rootAttrs = computed(() => {
  const { class: _consumerClass, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn(
    'cladd-table-head font-semibold',
    d.value.numeric && 'text-right tabular-nums',
    attrs.class,
  ),
);
const sortButtonContentClass =
  'gap-1 px-0 text-cladd-2xs tracking-wide text-cladd-fg-soft uppercase';
const glyphClass = computed(() =>
  cn(
    'size-3 shrink-0 transition-transform duration-200',
    d.value.sortDirection === 'asc' && 'rotate-180',
    d.value.sortDirection === 'none' && 'opacity-40',
  ),
);
</script>

<template>
  <th
    v-bind="rootAttrs"
    :aria-sort="
      d.sortDirection === 'none'
        ? undefined
        : d.sortDirection === 'asc'
          ? 'ascending'
          : 'descending'
    "
    :class="rootClass"
    data-slot="table-head"
    :scope="d.scope"
  >
    <Button
      v-if="d.sortable"
      :content-class-name="sortButtonContentClass"
      data-slot="table-sort-button"
      :outline="false"
      size="xs"
      variant="transparent"
      @click="emit('sort')"
    >
      <slot />
      <DropdownIcon
        aria-hidden="true"
        :class="glyphClass"
        data-slot="table-sort-glyph"
      />
    </Button>
    <slot v-else />
  </th>
</template>
