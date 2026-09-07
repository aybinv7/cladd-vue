<script setup lang="ts">
import { computed } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import {
  alertColors,
  alertStatusWords,
  type AlertProps,
} from './alert.contracts.ts';
import Surface from './Surface.vue';

defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<AlertProps>(), {
  icon: undefined,
  iconProps: undefined,
  live: undefined,
  variant: undefined,
});
const d = useComponentDefaults('Alert', props, {
  live: 'off' as const,
  variant: 'neutral' as const,
});
const role = computed(() => {
  if (d.value.live === 'assertive') return 'alert';
  if (d.value.live === 'polite') return 'status';
  return undefined;
});
const ariaLive = computed(() => {
  if (d.value.live === 'assertive') return 'assertive';
  if (d.value.live === 'polite') return 'polite';
  return undefined;
});
const statusWord = computed(() => alertStatusWords[d.value.variant]);
const contentClass = computed(() =>
  cn('flex items-start gap-3 py-3 pr-4 pl-4'),
);
</script>

<template>
  <Surface
    :aria-live="ariaLive"
    class="cladd-alert rounded-cladd-toast"
    :color="alertColors[d.variant]"
    :content-class-name="contentClass"
    data-slot="alert"
    outline
    :role="role"
    variant="gradient"
  >
    <div
      v-if="d.icon"
      class="flex shrink-0 items-center pt-0.5 [&>svg]:size-5 [&>svg]:shrink-0"
      data-part="icon"
    >
      <component :is="d.icon" v-bind="d.iconProps" />
    </div>
    <span v-else-if="statusWord" class="sr-only">{{ statusWord }}: </span>
    <div class="flex flex-1 flex-col gap-1" data-part="content">
      <slot />
    </div>
  </Surface>
</template>
