<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { CommandSeparatorProps } from './command.contracts.ts';

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<CommandSeparatorProps>(), {
  as: undefined,
});
const attrs = useAttrs();
const d = useComponentDefaults('CommandSeparator', props, {});
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
    data-slot="command-separator"
    role="separator"
  />
</template>
