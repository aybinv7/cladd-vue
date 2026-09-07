<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import type { CommandRootProps } from './command.contracts.ts';
import {
  createCommandContext,
  defaultCommandFilter,
  provideCommandContext,
} from './commandContext.ts';

defineSlots<{ default?: () => unknown }>();

const props = withDefaults(defineProps<CommandRootProps>(), {
  defaultQuery: undefined,
  filter: undefined,
  query: undefined,
});
const modelQuery = defineModel<string | undefined>('query', {
  default: undefined,
});
const d = useComponentDefaults('CommandRoot', props, { defaultQuery: '' });
const uncontrolledQuery = shallowRef(d.value.defaultQuery);
const query = computed(
  () => modelQuery.value ?? props.query ?? uncontrolledQuery.value,
);
const filter = computed(() => props.filter ?? defaultCommandFilter);

function setQuery(value: string): void {
  if (modelQuery.value !== undefined || props.query === undefined)
    modelQuery.value = value;
  uncontrolledQuery.value = value;
}

provideCommandContext(createCommandContext({ filter, query, setQuery }));
</script>

<template>
  <div class="cladd-command flex min-h-0 flex-col" data-slot="command">
    <slot />
  </div>
</template>
