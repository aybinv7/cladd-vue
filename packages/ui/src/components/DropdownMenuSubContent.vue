<script setup lang="ts">
import { computed, shallowRef, useAttrs, watch } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import {
  focusFirstMenuItem,
  useMenuNavigation,
} from '../composables/useMenuNavigation.ts';
import { cn } from '../shared/cn.ts';
import type { DropdownMenuSubContentProps } from './menu.contracts.ts';
import { useDropdownMenuSub } from './menuContext.ts';
import Popover from './Popover.vue';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();

const props = withDefaults(defineProps<DropdownMenuSubContentProps>(), {
  className: undefined,
  position: undefined,
});
const attrs = useAttrs();
const d = useComponentDefaults('DropdownMenuSubContent', props, {
  className: '',
  position: 'right-start',
});
const context = useDropdownMenuSub();
if (!context)
  throw new Error(
    'cladd-vue: `DropdownMenuSubContent` must be used inside `DropdownMenuSub`.',
  );
const sub = context;
const content = shallowRef<HTMLElement>();
const open = computed({
  get: () => sub.open.value,
  set: (value: boolean) => sub.setOpen(value),
});
const navigation = useMenuNavigation({
  container: content,
  close: () => sub.setOpen(false),
  closeSub: () => sub.setOpen(false),
});
watch(open, (value, previous) => {
  if (previous && !value) sub.anchor.value?.focus();
});
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const surfaceClass = computed(() =>
  cn('cladd-dropdown-menu-content w-56 p-1', d.value.className, attrs.class),
);
</script>

<template>
  <Popover
    v-bind="rootAttrs"
    v-model:open="open"
    :anchor-element="sub.anchor.value"
    :class="surfaceClass"
    content-class-name="p-1"
    data-slot="menu-sub-content"
    :position="d.position"
    role="menu"
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
