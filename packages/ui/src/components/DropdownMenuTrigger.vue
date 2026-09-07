<script setup lang="ts">
import { computed, shallowRef, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { DropdownMenuTriggerProps } from './menu.contracts.ts';
import { useDropdownMenuRoot } from './menuContext.ts';

defineOptions({ inheritAttrs: false });

defineSlots<{
  default?: () => unknown;
}>();

const props = withDefaults(defineProps<DropdownMenuTriggerProps>(), {
  as: undefined,
  disabled: undefined,
});

const attrs = useAttrs();
const d = useComponentDefaults('DropdownMenuTrigger', props, {
  disabled: false,
});

const rootContext = useDropdownMenuRoot();
if (!rootContext) {
  throw new Error(
    'cladd-vue: `DropdownMenuTrigger` must be used inside a `DropdownMenuRoot`.',
  );
}
const root = rootContext;

const triggerElement = shallowRef<HTMLElement | undefined>();
function setTriggerElement(element: unknown): void {
  root.anchor.value = element instanceof HTMLElement ? element : undefined;
  triggerElement.value = root.anchor.value;
}

function toggle(): void {
  if (d.value.disabled) return;
  root.setOpen(!root.open.value);
}

function handleKeydown(event: KeyboardEvent): void {
  if (d.value.disabled) return;
  if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    root.setOpen(true);
  }
}

const rootAttrs = computed(() => {
  const { class: _consumerClass, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() =>
  cn('cladd-dropdown-menu-trigger', attrs.class),
);
</script>

<template>
  <component
    :is="d.as ?? 'button'"
    :ref="setTriggerElement"
    v-bind="rootAttrs"
    :aria-disabled="d.disabled || undefined"
    :aria-expanded="root.open.value"
    :aria-haspopup="'menu'"
    :class="rootClass"
    data-slot="dropdown-menu-trigger"
    :disabled="d.as === undefined && d.disabled ? true : undefined"
    :type="d.as === undefined ? 'button' : undefined"
    @click="toggle"
    @keydown="handleKeydown"
  >
    <slot />
  </component>
</template>
