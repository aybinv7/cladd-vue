<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { DropdownMenuSubTriggerProps } from './menu.contracts.ts';
import { useDropdownMenuSub } from './menuContext.ts';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown; indicator?: () => unknown }>();

const props = withDefaults(defineProps<DropdownMenuSubTriggerProps>(), {
  disabled: undefined,
});
const attrs = useAttrs();
const d = useComponentDefaults('DropdownMenuSubTrigger', props, {
  disabled: false,
});
const context = useDropdownMenuSub();
if (!context)
  throw new Error(
    'cladd-vue: `DropdownMenuSubTrigger` must be used inside `DropdownMenuSub`.',
  );
const sub = context;
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn(
    'cladd-menu-item flex w-full items-center gap-2 rounded-cladd-xs px-2 py-1.5 text-cladd-xs text-cladd-fg outline-none select-none',
    'hover:bg-cladd-surface-hover focus-visible:bg-cladd-surface-hover',
    d.value.disabled && 'pointer-events-none opacity-50',
    attrs.class,
  ),
);
function setAnchor(value: unknown): void {
  sub.anchor.value = value instanceof HTMLElement ? value : undefined;
}
function open(): void {
  if (!d.value.disabled) sub.setOpen(true);
}
</script>

<template>
  <div
    :ref="setAnchor"
    v-bind="rootAttrs"
    :aria-disabled="d.disabled || undefined"
    :aria-expanded="sub.open.value"
    aria-haspopup="menu"
    :class="rootClass"
    :data-disabled="d.disabled || undefined"
    data-menu-item="true"
    data-menu-sub-trigger="true"
    data-slot="menu-sub-trigger"
    role="menuitem"
    tabindex="-1"
    @click="open"
    @pointerenter="open"
  >
    <slot />
    <span class="ml-auto" aria-hidden="true"
      ><slot name="indicator">›</slot></span
    >
  </div>
</template>
