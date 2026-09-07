<script setup lang="ts">
import { computed, shallowRef, useAttrs, watch } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import {
  focusFirstMenuItem,
  useMenuNavigation,
} from '../composables/useMenuNavigation.ts';
import { cn } from '../shared/cn.ts';
import type { DropdownMenuContentProps } from './menu.contracts.ts';
import { useDropdownMenuRoot } from './menuContext.ts';
import Popover from './Popover.vue';

defineOptions({ inheritAttrs: false });

defineSlots<{
  default?: () => unknown;
}>();

const props = withDefaults(defineProps<DropdownMenuContentProps>(), {
  className: undefined,
  position: undefined,
  root: undefined,
});

const attrs = useAttrs();
const d = useComponentDefaults('DropdownMenuContent', props, {
  className: '',
  position: 'bottom-start',
});

const menu = useDropdownMenuRoot();
if (!menu) {
  throw new Error(
    'cladd-vue: `DropdownMenuContent` must be used inside a `DropdownMenuRoot`.',
  );
}

const open = computed({
  get: () => menu.open.value,
  set: (next: boolean) => menu.setOpen(next),
});

const contentElement = shallowRef<HTMLElement | undefined>();
const navigation = useMenuNavigation({
  close: () => menu.setOpen(false),
  container: contentElement,
});

watch(open, (next, previous) => {
  if (previous && !next) {
    menu.anchor.value?.focus();
  }
});

function handleOpened(): void {
  focusFirstMenuItem(contentElement.value);
}

const rootAttrs = computed(() => {
  const { class: _consumerClass, ...rest } = attrs;
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
    :anchor-element="menu.anchor.value"
    :class="surfaceClass"
    content-class-name="p-1"
    data-slot="dropdown-menu-content"
    :position="d.position"
    role="menu"
    :root="d.root"
    @opened="handleOpened"
  >
    <div
      :ref="
        (element) => {
          contentElement = element as HTMLElement | undefined;
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
