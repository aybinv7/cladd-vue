<script setup lang="ts">
import { computed, useSlots } from 'vue';

import {
  sheetRootContextKey,
  useOverlayRootContext,
} from './overlayRootContext.ts';
import { cloneTriggerNode } from './overlayTrigger.ts';
import VNodeRenderer from './VNodeRenderer.ts';

defineSlots<{ default?: () => unknown }>();

const slots = useSlots();
const root = useOverlayRootContext(sheetRootContextKey);
const triggerNode = computed(() =>
  root
    ? cloneTriggerNode(slots.default?.(), {
        onClick: () => root.setOpen(!root.open.value),
      })
    : undefined,
);
</script>

<template>
  <VNodeRenderer v-if="triggerNode" :node="triggerNode" /><slot v-else />
</template>
