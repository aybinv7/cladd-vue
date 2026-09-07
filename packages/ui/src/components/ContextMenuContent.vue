<script setup lang="ts">
import { computed, shallowRef, useAttrs, watch } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import {
  focusFirstMenuItem,
  useMenuNavigation,
} from '../composables/useMenuNavigation.ts';
import { cn } from '../shared/cn.ts';
import type { ContextMenuContentProps } from './menu.contracts.ts';
import { useContextMenuRoot } from './menuContext.ts';
import Popover from './Popover.vue';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();

const props = withDefaults(defineProps<ContextMenuContentProps>(), {
  className: undefined,
  position: undefined,
  root: undefined,
});
const attrs = useAttrs();
const d = useComponentDefaults('ContextMenuContent', props, {
  className: '',
  position: 'bottom-start',
});
const context = useContextMenuRoot();
if (!context)
  throw new Error(
    'cladd-vue: `ContextMenuContent` must be used inside `ContextMenuRoot`.',
  );
const menu = context;
const content = shallowRef<HTMLElement>();
const open = computed({
  get: () => menu.open.value,
  set: (value: boolean) => menu.setOpen(value),
});
const navigation = useMenuNavigation({
  container: content,
  close: () => menu.setOpen(false),
});
watch(open, (value, previous) => {
  if (previous && !value) menu.trigger.value?.focus();
});
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const surfaceClass = computed(() =>
  cn('cladd-context-menu-content w-56 p-1', d.value.className, attrs.class),
);
</script>

<template>
  <Popover
    v-bind="rootAttrs"
    v-model:open="open"
    :anchor-rect="menu.anchorRect.value"
    :class="surfaceClass"
    content-class-name="p-1"
    data-slot="context-menu-content"
    :position="d.position"
    role="menu"
    :root="d.root"
    @opened="focusFirstMenuItem(content)"
  >
    <div
      :ref="
        (value) => {
          content = value as HTMLElement | undefined;
        }
      "
      data-menu-content="true"
      @focusin="navigation.onFocusIn"
      @keydown="navigation.onKeydown"
    >
      <slot />
    </div>
  </Popover>
</template>
