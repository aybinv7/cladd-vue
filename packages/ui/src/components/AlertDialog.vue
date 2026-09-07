<script setup lang="ts">
import type { AlertDialogProps } from './alertDialog.contracts.ts';
import Dialog from './Dialog.vue';

defineOptions({ inheritAttrs: false });
defineSlots<{
  actions?: (props: { close: () => void }) => unknown;
  buttons?: (props: { close: () => void }) => unknown;
  default?: (props: { close: () => void }) => unknown;
  text?: () => unknown;
  title?: () => unknown;
  trigger?: () => unknown;
}>();

const props = defineProps<AlertDialogProps>();
const open = defineModel<boolean | undefined>('open', { default: undefined });
</script>

<template>
  <Dialog
    v-bind="{
      ...props,
      ...$attrs,
      'data-initial-focus': 'cancel',
      role: 'alertdialog',
    }"
    v-model:open="open"
  >
    <template v-if="$slots.trigger" #trigger><slot name="trigger" /></template>
    <template v-if="$slots.title" #title><slot name="title" /></template>
    <template v-if="$slots.text" #text><slot name="text" /></template>
    <template #default="slotProps"><slot v-bind="slotProps" /></template>
    <template v-if="$slots.actions" #actions="slotProps"
      ><slot name="actions" v-bind="slotProps"
    /></template>
    <template v-if="$slots.buttons" #buttons="slotProps"
      ><slot name="buttons" v-bind="slotProps"
    /></template>
  </Dialog>
</template>
