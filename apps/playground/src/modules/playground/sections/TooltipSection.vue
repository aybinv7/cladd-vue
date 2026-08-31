<script setup lang="ts">
import { Button, NumberField, Tooltip } from '@cladd-vue/ui';
import type { Color, TooltipPosition } from '@cladd-vue/ui';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import OverlayEventLog from '../components/OverlayEventLog.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const tooltipPosition = ref<TooltipPosition>('top');
const tooltipPositions = ['top', 'bottom'] as const;
const tooltipOffset = ref(4);
const tooltipTimeout = ref(false);
const events = ref<string[]>([]);

function record(event: string): void {
  events.value = [...events.value.slice(-3), event];
}

const tooltipCode = computed(
  () => `<Tooltip
  position="${tooltipPosition.value}"
  :offset="${tooltipOffset.value}"
  :timeout="${tooltipTimeout.value}"
>
  <template #trigger>
    <Button>Hover me</Button>
  </template>
  Forwards the CDP port for this target
</Tooltip>`,
);
</script>

<template>
  <CatalogSection
    description="A portalled hover/focus label with a delayed show and matching position contract."
    eyebrow="05 · Overlays"
    id="tooltip"
    title="Tooltip"
  >
    <ComponentPlayground :code="tooltipCode" preview-surface>
      <template #preview>
        <Tooltip
          :offset="tooltipOffset"
          :position="tooltipPosition"
          :timeout="tooltipTimeout"
          @closed="record('closed')"
          @closing="record('closing')"
          @opened="record('opened')"
          @opening="record('opening')"
        >
          <template #trigger>
            <Button :disabled="!props.interactionsEnabled">Hover me</Button>
          </template>
          Forwards the CDP port for this target
        </Tooltip>
        <OverlayEventLog :events="events" @clear="events = []" />
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <NumberField
            v-model="tooltipOffset"
            aria-label="Tooltip offset"
            :max="32"
            :min="0"
            :step="1"
          />
          <PlaygroundSwitchControl v-model="tooltipTimeout" label="delay" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="tooltipPosition"
            :items="tooltipPositions"
            label="Tooltip position"
          />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
