<script setup lang="ts">
import type { Color } from '@cladd-vue/ui';
import { Calendar, DatePicker } from '@cladd-vue/ui/calendar';
import type {
  CalendarMode,
  CalendarSize,
  CalendarValue,
  DateRange,
} from '@cladd-vue/ui/calendar';
import { computed, ref, watch } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundColorControl from '../components/PlaygroundColorControl.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
const modes = ['single', 'multiple', 'range'] as const;

const color = ref<Color>('brand');
const size = ref<CalendarSize>('md');
const mode = ref<CalendarMode>('single');

const value = ref<CalendarValue>(new Date());
const pickerValue = ref<CalendarValue>(undefined);
const rangeValue = ref<CalendarValue>(undefined);

// `value`'s shape has to track `mode`: a bare Date is invalid the moment
// `mode` becomes `'multiple'`, which is a real crash in the dependency
// (`vue-datepicker.js` throws synchronously if `multi-dates` is on and it
// doesn't receive an array), not merely a cosmetic mismatch. Calendar now
// reshapes defensively too, but the demo shouldn't rely on that safety net.
watch(mode, () => {
  value.value = undefined;
});

const selectionLabel = computed(() => {
  const current = value.value;
  if (current === undefined) return 'nothing selected';
  if (Array.isArray(current)) {
    return `${current.length} date${current.length === 1 ? '' : 's'}`;
  }
  if (current instanceof Date) return current.toLocaleDateString();

  const range = current as DateRange;
  if (!range.from) return 'nothing selected';
  return range.to
    ? `${range.from.toLocaleDateString()} – ${range.to.toLocaleDateString()}`
    : range.from.toLocaleDateString();
});

const code = computed(
  () => `<Calendar
  v-model="value"
  color="${color.value}"
  mode="${mode.value}"
  size="${size.value}"
/>`,
);
</script>

<template>
  <CatalogSection
    description="The one surface that is not a verbatim port: upstream styles react-day-picker, so the Vue build styles @vuepic/vue-datepicker the same way. The public props, the accent cascade and the DateRange shape stay upstream's."
    eyebrow="04 · Forms"
    id="calendar"
    title="Calendar and date picker"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <div class="calendar-frame">
          <Calendar
            :key="mode"
            v-model="value"
            :color="color"
            :disabled="!props.interactionsEnabled"
            :mode="mode"
            :number-of-months="mode === 'range' ? 2 : 1"
            :size="size"
          />
        </div>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <span class="playground-hint">{{ selectionLabel }}</span>
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSegmented v-model="mode" :items="modes" label="Mode" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSegmented v-model="size" :items="sizes" label="Size" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="color" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Date picker</span>
        <code>Button trigger · Popover</code>
      </div>
      <div class="specimen-row">
        <div class="date-picker-slot">
          <DatePicker
            v-model="pickerValue"
            :disabled="!props.interactionsEnabled"
          />
        </div>
        <div class="date-picker-slot">
          <DatePicker
            v-model="rangeValue"
            :disabled="!props.interactionsEnabled"
            mode="range"
            :number-of-months="2"
            placeholder="Select range"
          />
        </div>
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Trigger sizes</span>
        <code>sm · md · lg</code>
      </div>
      <div class="specimen-row">
        <div
          v-for="triggerSize in ['sm', 'md', 'lg']"
          :key="triggerSize"
          class="date-picker-slot"
        >
          <DatePicker
            :disabled="!props.interactionsEnabled"
            :size="triggerSize as 'lg' | 'md' | 'sm'"
          />
        </div>
      </div>
    </div>
  </CatalogSection>
</template>
