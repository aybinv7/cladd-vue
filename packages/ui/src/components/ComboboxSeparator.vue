<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { ComboboxSeparatorProps } from './combobox.contracts.ts';

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<ComboboxSeparatorProps>(), {
  as: undefined,
});
const attrs = useAttrs();
const d = useComponentDefaults('ComboboxSeparator', props, {});
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <component
    :is="d.as ?? 'div'"
    v-bind="rootAttrs"
    :class="cn('my-1 h-px bg-cladd-outline', attrs.class)"
    data-slot="combobox-separator"
    role="separator"
  />
</template>
