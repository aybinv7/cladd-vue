<script setup lang="ts">
import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import type { ComboboxGroupProps } from './combobox.contracts.ts';

defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<ComboboxGroupProps>(), {
  heading: undefined,
});
const d = useComponentDefaults('ComboboxGroup', props, { heading: '' });
</script>

<template>
  <div
    class="cladd-combobox-group py-1"
    data-slot="combobox-group"
    role="group"
  >
    <div
      v-if="d.heading"
      class="px-2 py-1 text-cladd-2xs font-semibold text-cladd-fg-softer"
    >
      {{ d.heading }}
    </div>
    <slot />
  </div>
</template>
