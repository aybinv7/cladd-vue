<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { ContextMenuTriggerProps } from './menu.contracts.ts';
import { useContextMenuRoot } from './menuContext.ts';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();

const props = withDefaults(defineProps<ContextMenuTriggerProps>(), {
  as: undefined,
  disabled: undefined,
});
const attrs = useAttrs();
const d = useComponentDefaults('ContextMenuTrigger', props, {
  disabled: false,
});
const context = useContextMenuRoot();
if (!context)
  throw new Error(
    'cladd-vue: `ContextMenuTrigger` must be used inside `ContextMenuRoot`.',
  );
const root = context;
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const rootClass = computed(() => cn('cladd-context-menu-trigger', attrs.class));
function setTrigger(value: unknown): void {
  root.trigger.value = value instanceof HTMLElement ? value : undefined;
}
function openAt(clientX: number, clientY: number): void {
  root.setAnchorRect(new DOMRect(clientX, clientY, 0, 0));
  root.setOpen(true);
}
function onContextMenu(event: MouseEvent): void {
  if (d.value.disabled) return;
  event.preventDefault();
  openAt(event.clientX, event.clientY);
}
function onKeydown(event: KeyboardEvent): void {
  if (
    d.value.disabled ||
    !(event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10'))
  )
    return;
  event.preventDefault();
  const rect = root.trigger.value?.getBoundingClientRect();
  if (rect) openAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
}
</script>

<template>
  <component
    :is="d.as ?? 'div'"
    :ref="setTrigger"
    v-bind="rootAttrs"
    :aria-disabled="d.disabled || undefined"
    :aria-expanded="root.open.value"
    aria-haspopup="menu"
    :class="rootClass"
    data-slot="context-menu-trigger"
    :tabindex="d.as === undefined ? 0 : undefined"
    @contextmenu="onContextMenu"
    @keydown="onKeydown"
    ><slot
  /></component>
</template>
