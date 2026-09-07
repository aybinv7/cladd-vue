<script setup lang="ts">
import type { ComboboxChipProps } from './combobox.contracts.ts';
import { useComboboxContext } from './comboboxContext.ts';

defineSlots<{ default?: () => unknown }>();
const props = defineProps<ComboboxChipProps>();
const combobox = useComboboxContext();
</script>

<template>
  <span
    class="cladd-combobox-chip inline-flex items-center gap-1 rounded-cladd-xs bg-cladd-surface-highlight px-1.5 py-0.5 text-cladd-2xs"
    data-slot="combobox-chip"
    ><slot>{{ props.value }}</slot
    ><button
      aria-label="Remove selection"
      type="button"
      @click="combobox.remove(props.value)"
    >
      ×
    </button></span
  >
</template>
