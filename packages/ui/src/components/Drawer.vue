<script setup lang="ts">
import type { SheetProps } from './sheet.contracts.ts';
import Sheet from './Sheet.vue';

defineOptions({ inheritAttrs: false });
defineSlots<{
  default?: (props: { close: () => void }) => unknown;
  description?: () => unknown;
  footer?: (props: { close: () => void }) => unknown;
  header?: () => unknown;
  title?: () => unknown;
}>();

const props = defineProps<Omit<SheetProps, 'side'>>();
const open = defineModel<boolean | undefined>('open', { default: undefined });
</script>

<template>
  <Sheet v-bind="props" v-model:open="open" drag-to-close side="bottom">
    <template v-if="$slots.header" #header><slot name="header" /></template>
    <template v-if="$slots.title" #title><slot name="title" /></template>
    <template v-if="$slots.description" #description
      ><slot name="description"
    /></template>
    <template #default="slotProps"><slot v-bind="slotProps" /></template>
    <template v-if="$slots.footer" #footer="slotProps"
      ><slot name="footer" v-bind="slotProps"
    /></template>
  </Sheet>
</template>
