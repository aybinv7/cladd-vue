<script setup lang="ts">
import { computed, shallowRef, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import CheckIcon from './icons/CheckIcon.vue';
import type { DropdownMenuCheckboxItemProps } from './menu.contracts.ts';
import { useMenuChain } from './menuContext.ts';

defineOptions({ inheritAttrs: false });

defineSlots<{
  default?: () => unknown;
}>();

const props = withDefaults(defineProps<DropdownMenuCheckboxItemProps>(), {
  checked: undefined,
  closeOnSelect: undefined,
  defaultChecked: undefined,
  disabled: undefined,
});

const emit = defineEmits<{
  select: [checked: boolean];
  'update:checked': [checked: boolean];
}>();

const modelChecked = defineModel<boolean | undefined>('checked', {
  default: undefined,
});

const attrs = useAttrs();
const d = useComponentDefaults('DropdownMenuCheckboxItem', props, {
  closeOnSelect: false,
  defaultChecked: false,
  disabled: false,
});

const uncontrolled = shallowRef(d.value.defaultChecked);
const checked = computed(
  () => modelChecked.value ?? props.checked ?? uncontrolled.value,
);

const chain = useMenuChain();

function toggle(event: MouseEvent): void {
  if (d.value.disabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  const next = !checked.value;
  if (modelChecked.value !== undefined || props.checked === undefined) {
    modelChecked.value = next;
  }
  uncontrolled.value = next;
  emit('update:checked', next);
  emit('select', next);
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
    role="menuitemcheckbox"
    :tabindex="-1"
    @click="toggle"
  >
    <span class="flex size-4 items-center justify-center" aria-hidden="true">
      <CheckIcon v-if="checked" class="size-3" />
    </span>
    <slot />
  </div>
</template>
