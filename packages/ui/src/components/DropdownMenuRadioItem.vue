<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import type { DropdownMenuRadioItemProps } from './menu.contracts.ts';
import { useMenuChain, useMenuRadioGroup } from './menuContext.ts';

defineOptions({ inheritAttrs: false });

defineSlots<{
  default?: () => unknown;
}>();

const props = withDefaults(defineProps<DropdownMenuRadioItemProps>(), {
  closeOnSelect: undefined,
  disabled: undefined,
  value: undefined,
});

const emit = defineEmits<{
  select: [value: string];
}>();

const attrs = useAttrs();
const d = useComponentDefaults('DropdownMenuRadioItem', props, {
  closeOnSelect: true,
  disabled: false,
  value: '',
});

const groupContext = useMenuRadioGroup();
if (!groupContext) {
  throw new Error(
    'cladd-vue: `DropdownMenuRadioItem` must be used inside a `DropdownMenuRadioGroup`.',
  );
}
const group = groupContext;

const chain = useMenuChain();
const checked = computed(() => group.value.value === d.value.value);

function select(event: MouseEvent): void {
  if (d.value.disabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  group.onSelect(d.value.value);
  emit('select', d.value.value);
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
    :aria-checked="checked"
    :aria-disabled="d.disabled || undefined"
    :class="rootClass"
    :data-disabled="d.disabled || undefined"
    data-menu-item="true"
    data-slot="menu-item"
    :data-state="checked ? 'checked' : 'unchecked'"
    role="menuitemradio"
    :tabindex="-1"
    @click="select"
  >
    <span class="flex size-4 items-center justify-center" aria-hidden="true">
      <span v-if="checked" class="size-1.5 rounded-full bg-cladd-primary" />
    </span>
    <slot />
  </div>
</template>
