<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { DropdownMenuGroupProps } from './menu.contracts.ts';

defineOptions({ inheritAttrs: false });

defineSlots<{
  default?: () => unknown;
}>();

const props = withDefaults(defineProps<DropdownMenuGroupProps>(), {
  label: undefined,
});

const attrs = useAttrs();
const d = useComponentDefaults('DropdownMenuGroup', props, {
  label: '',
});

const groupId = useId();
const rootAttrs = computed(() => {
  const { class: _consumerClass, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() => cn('cladd-menu-group', attrs.class));
</script>

<template>
  <div
    v-bind="rootAttrs"
    :aria-labelledby="d.label ? `${groupId}-label` : undefined"
    :class="rootClass"
    data-slot="menu-group"
    role="group"
  >
    <div
      v-if="d.label"
      :id="`${groupId}-label`"
      class="px-2 py-1 text-cladd-2xs font-semibold text-cladd-fg-softer"
      data-slot="menu-label"
      aria-hidden="true"
    >
      {{ d.label }}
    </div>
    <slot />
  </div>
</template>
