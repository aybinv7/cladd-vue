<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import { roundedClasses } from '../shared/roundedClasses.ts';
import { rootSizeClasses } from '../shared/sizeClasses.ts';
import FocusRing from './FocusRing.vue';
import DropdownIcon from './icons/DropdownIcon.vue';
import type { NativeSelectProps } from './nativeSelect.contracts.ts';
import SurfaceCut from './SurfaceCut.vue';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<NativeSelectProps>(), {
  disabled: undefined,
  invalid: undefined,
  multiple: undefined,
  required: undefined,
  size: undefined,
});
const model = defineModel<string | string[]>();
const attrs = useAttrs();
const controlAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const d = useComponentDefaults('NativeSelect', props, {
  disabled: false,
  invalid: false,
  multiple: false,
  required: false,
  size: 'lg' as const,
});
const radii = computed(() => roundedClasses(d.value.size, false, false));
const controlClass = computed(() =>
  cn(
    'w-full appearance-none border-none bg-transparent px-3 font-medium outline-none',
    !d.value.multiple && rootSizeClasses(d.value.size, 'height'),
    !d.value.multiple && 'pe-8',
    d.value.multiple && 'py-1',
    radii.value.itemRoundedClasses,
    d.value.disabled && 'text-cladd-fg-softer',
  ),
);
</script>
<template>
  <SurfaceCut
    :class="
      cn(
        'cladd-native-select relative',
        d.disabled && 'opacity-50',
        radii.itemRoundedClasses,
        attrs.class,
      )
    "
    :data-disabled="d.disabled || undefined"
    :data-invalid="d.invalid || undefined"
    data-slot="native-select"
    :wrap-content="false"
  >
    <FocusRing
      v-if="!d.disabled"
      :class="radii.focusRoundedClasses"
      :color="d.invalid ? 'red' : undefined"
      :force="d.invalid"
      group="input"
    />
    <select
      v-bind="controlAttrs"
      v-model="model"
      :class="controlClass"
      data-part="control"
      :disabled="d.disabled"
      :multiple="d.multiple"
      :required="d.required"
    >
      <slot />
    </select>
    <DropdownIcon
      v-if="!d.multiple"
      class="pointer-events-none absolute end-2.5 top-1/2 size-4 -translate-y-1/2 text-cladd-fg-soft"
    />
  </SurfaceCut>
</template>
