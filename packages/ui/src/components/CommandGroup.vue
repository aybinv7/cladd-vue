<script setup lang="ts">
import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import type { CommandGroupProps } from './command.contracts.ts';

defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<CommandGroupProps>(), {
  heading: undefined,
});
const d = useComponentDefaults('CommandGroup', props, { heading: '' });
</script>

<template>
  <div class="cladd-command-group py-1" data-slot="command-group" role="group">
    <div
      v-if="d.heading"
      class="px-2 py-1 text-cladd-2xs font-semibold text-cladd-fg-softer"
    >
      {{ d.heading }}
    </div>
    <slot />
  </div>
</template>
