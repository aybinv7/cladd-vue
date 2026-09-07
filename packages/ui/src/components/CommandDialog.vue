<script setup lang="ts">
import type { CommandRootProps } from './command.contracts.ts';
import CommandRoot from './CommandRoot.vue';
import Dialog from './Dialog.vue';

defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown; trigger?: () => unknown }>();
const props = defineProps<CommandRootProps>();
const open = defineModel<boolean | undefined>('open', { default: undefined });
const query = defineModel<string | undefined>('query', { default: undefined });
</script>

<template>
  <Dialog v-bind="$attrs" v-model:open="open" content-class-name="p-0"
    ><template v-if="$slots.trigger" #trigger><slot name="trigger" /></template
    ><CommandRoot v-bind="props" v-model:query="query"><slot /></CommandRoot
  ></Dialog>
</template>
