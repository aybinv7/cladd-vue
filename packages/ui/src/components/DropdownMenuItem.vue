<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { DropdownMenuItemProps } from './menu.contracts.ts';
import { useMenuChain } from './menuContext.ts';

defineOptions({ inheritAttrs: false });

defineSlots<{
  default?: () => unknown;
}>();

const props = withDefaults(defineProps<DropdownMenuItemProps>(), {
  closeOnSelect: undefined,
  disabled: undefined,
});

const emit = defineEmits<{
  select: [];
}>();

const attrs = useAttrs();
const d = useComponentDefaults('DropdownMenuItem', props, {
  closeOnSelect: true,
  disabled: false,
});

const chain = useMenuChain();

function select(event: MouseEvent): void {
  if (d.value.disabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  emit('select');
  if (d.value.closeOnSelect) chain?.closeChain();
}

const rootAttrs = computed(() => {
  const { class: _consumerClass, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn(
    'cladd-menu-item flex w-full cursor-pointer items-center gap-2 rounded-cladd-xs px-2 py-1.5 text-cladd-xs text-cladd-fg outline-none select-none',
    'hover:bg-cladd-surface-hover focus-visible:bg-cladd-surface-hover',
    d.value.disabled && 'pointer-events-none opacity-50',
    attrs.class,
  ),
);
</script>

<template>
  <div
    v-bind="rootAttrs"
    :aria-disabled="d.disabled || undefined"
    :class="rootClass"
    :data-disabled="d.disabled || undefined"
    data-menu-item="true"
    data-slot="menu-item"
    role="menuitem"
    :tabindex="-1"
    @click="select"
  >
    <slot />
  </div>
</template>
