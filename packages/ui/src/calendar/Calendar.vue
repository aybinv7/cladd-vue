<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker';
import { computed, useAttrs } from 'vue';

import '@vuepic/vue-datepicker/dist/main.css';

import type { ButtonSize } from '../components/button.contracts.ts';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon.vue';
import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { useTheme, useAccentColor } from '../contexts/uiContext.ts';
import { cn } from '../shared/cn.ts';
import {
  calendarSizes,
  type CalendarMode,
  type CalendarProps,
  type CalendarSize,
  type CalendarValue,
  type DateRange,
} from './calendar.contracts.ts';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<CalendarProps>(), {
  color: undefined,
  controlSize: undefined,
  disabled: undefined,
  footerClassName: undefined,
  headerClassName: undefined,
  hideNavigation: undefined,
  maxDate: undefined,
  minDate: undefined,
  mode: undefined,
  readOnly: undefined,
  showToday: undefined,
  size: undefined,
  weekStart: undefined,
});

/** Selected value. A `Date` in single mode, `Date[]` in multiple, a `DateRange` in range. */
const model = defineModel<CalendarValue>({ default: undefined });

const emit = defineEmits<{
  /** Fires when the selection changes. */
  change: [value: CalendarValue];
}>();

const d = useComponentDefaults('Calendar', props, {
  controlSize: 'sm' as ButtonSize,
  disabled: false,
  hideNavigation: false,
  mode: 'single' as CalendarMode,
  readOnly: false,
  showToday: true,
  size: 'md' as CalendarSize,
  weekStart: 1,
});

const slots = defineSlots<{
  /** Rendered below the grid, inside the calendar container. */
  footer?: () => unknown;
  /** Rendered above the grid, inside the calendar container. */
  header?: () => unknown;
}>();

const attrs = useAttrs();
const rootAttrs = computed(() => {
  const { class: _consumerClass, ...rest } = attrs;
  return rest;
});

const theme = useTheme();
const accentColor = useAccentColor();
const tokens = computed(() => calendarSizes[d.value.size]);
const currentColor = computed(() => d.value.color ?? accentColor.value);

/**
 * The Vue picker models a range as `[start, end]`; upstream's public contract is
 * `{ from, to }`. Convert on the way in and out so callers see upstream's shape.
 */
const pickerValue = computed({
  get(): Date | Date[] | null {
    const value = model.value;
    if (value === undefined) return null;
    if (d.value.mode !== 'range') return value as Date | Date[];

    const range = value as DateRange;
    return range.from
      ? ([range.from, range.to].filter(Boolean) as Date[])
      : null;
  },
  set(next: Date | Date[] | null) {
    let value: CalendarValue;

    if (next === null) {
      value = undefined;
    } else if (d.value.mode === 'range') {
      const [from, to] = next as Date[];
      value = { from, to };
    } else {
      value = next;
    }

    model.value = value;
    emit('change', value);
  },
});

const rootClass = computed(() =>
  cn(
    'cladd-calendar',
    currentColor.value && `cladd-color-${currentColor.value}`,
    d.value.disabled && 'pointer-events-none opacity-50',
    attrs.class,
  ),
);

const ui = computed(() => ({
  menu: cn('cladd-calendar__menu', tokens.value.captionText),
  calendar: 'cladd-calendar__grid',
  calendarCell: cn(
    'cladd-calendar__cell',
    tokens.value.box,
    tokens.value.dayText,
  ),
  navBtnPrev: 'cladd-calendar__nav',
  navBtnNext: 'cladd-calendar__nav',
}));
</script>

<template>
  <div v-bind="rootAttrs" :class="rootClass" data-part="calendar">
    <div
      v-if="slots.header"
      :class="cn('mb-2', d.headerClassName)"
      data-part="header"
    >
      <slot name="header" />
    </div>

    <VueDatePicker
      v-model="pickerValue"
      auto-apply
      :dark="theme === 'dark'"
      :disabled="d.disabled"
      :enable-time-picker="false"
      :hide-navigation="d.hideNavigation ? ['month', 'year'] : []"
      inline
      :max-date="d.maxDate"
      :min-date="d.minDate"
      :multi-dates="d.mode === 'multiple'"
      :range="d.mode === 'range'"
      :readonly="d.readOnly"
      :ui="ui"
      :week-start="d.weekStart"
    >
      <template #arrow-left>
        <ChevronLeftIcon />
      </template>
      <template #arrow-right>
        <ChevronLeftIcon class="rotate-180" />
      </template>
    </VueDatePicker>

    <div
      v-if="slots.footer"
      :class="cn('mt-2 text-cladd-xs text-cladd-fg-soft', d.footerClassName)"
      data-part="footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
