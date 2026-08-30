<script setup lang="ts">
import {
  useOverlayRoot,
  type OverlayRootProps,
} from '../overlays/overlayRoot.ts';
import { toastRootContextKey } from '../overlays/overlayRootContext.ts';

const props = withDefaults(defineProps<OverlayRootProps>(), {
  defaultOpen: false,
  open: undefined,
});

const emit = defineEmits<{
  'update:open': [open: boolean];
}>();

defineSlots<{
  default?: () => unknown;
}>();

useOverlayRoot(toastRootContextKey, props, (open) => emit('update:open', open));
</script>

<template>
  <slot />
</template>
