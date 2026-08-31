<script setup lang="ts">
import { Button } from '@cladd-vue/ui';

const props = defineProps<{
  events: readonly string[];
}>();

const emit = defineEmits<{
  clear: [];
}>();
</script>

<template>
  <output class="overlay-event-log" aria-live="polite">
    <span class="overlay-event-log__label">Lifecycle</span>
    <span class="overlay-event-log__events">
      {{
        props.events.length
          ? props.events.join(' · ')
          : 'Waiting for interaction'
      }}
    </span>
    <Button
      v-if="props.events.length"
      aria-label="Clear lifecycle events"
      size="xs"
      variant="transparent"
      @click="emit('clear')"
    >
      Clear
    </Button>
  </output>
</template>
