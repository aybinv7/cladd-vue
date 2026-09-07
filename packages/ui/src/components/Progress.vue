<script setup lang="ts">
import { computed, useSlots } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { useUiContext } from '../contexts/uiContext.ts';
import { cn } from '../shared/cn.ts';
import type { ProgressProps } from './progress.contracts.ts';
import { provideProgressContext } from './progressContext.ts';
import Surface from './Surface.vue';
import SurfaceCut from './SurfaceCut.vue';

defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<ProgressProps>(), {
  ariaLabel: undefined,
  color: undefined,
  indeterminate: undefined,
  max: undefined,
  min: undefined,
  value: undefined,
});
const slots = useSlots();
const ui = useUiContext();
const d = useComponentDefaults('Progress', props, {
  indeterminate: false,
  max: 100,
  min: 0,
});
const effectiveColor = computed(() => d.value.color ?? ui.accentColor.value);
const safeMin = computed(() =>
  Number.isFinite(d.value.min) ? d.value.min : 0,
);
const safeMax = computed(() =>
  Number.isFinite(d.value.max) && d.value.max > safeMin.value
    ? d.value.max
    : safeMin.value + 100,
);
const isIndeterminate = computed(
  () => d.value.indeterminate || !Number.isFinite(props.value),
);
const clampedValue = computed(() => {
  if (isIndeterminate.value) return undefined;
  return Math.min(
    safeMax.value,
    Math.max(safeMin.value, props.value as number),
  );
});
const percent = computed(() => {
  if (clampedValue.value === undefined) return undefined;
  const range = safeMax.value - safeMin.value;
  return range <= 0 ? 0 : ((clampedValue.value - safeMin.value) / range) * 100;
});
provideProgressContext({
  indeterminate: isIndeterminate,
  max: safeMax,
  min: safeMin,
  percent,
  value: clampedValue,
});
const fillClass = computed(() =>
  cn(
    'cladd-progress-fill absolute inset-y-0 start-0 rounded-cladd-xs ease-out',
    isIndeterminate.value
      ? 'w-2/5 animate-pulse motion-reduce:animate-none'
      : 'transition-[width] duration-300',
  ),
);
const fillStyle = computed(() =>
  isIndeterminate.value ? undefined : { width: `${percent.value ?? 0}%` },
);
</script>
<template>
  <div class="cladd-progress flex flex-col gap-1" data-slot="progress">
    <div
      v-if="slots.default"
      class="cladd-progress-header flex items-center justify-between text-cladd-xs"
      data-slot="progress-header"
    >
      <slot />
    </div>
    <div
      :aria-label="d.ariaLabel"
      :aria-valuemax="safeMax"
      :aria-valuemin="safeMin"
      :aria-valuenow="isIndeterminate ? undefined : clampedValue"
      class="relative"
      data-slot="progress-track"
      role="progressbar"
    >
      <SurfaceCut
        class="h-2 w-full rounded-cladd-xs"
        data-part="track-background"
        :wrap-content="false"
      />
      <Surface
        :class="fillClass"
        :color="effectiveColor"
        data-slot="progress-fill"
        level="+2"
        outline
        :style="fillStyle"
        variant="gradient"
        :wrap-content="false"
      />
    </div>
  </div>
</template>
