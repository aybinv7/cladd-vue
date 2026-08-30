<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker';
import { computed, useAttrs } from 'vue';

import '@vuepic/vue-datepicker/dist/main.css';
import './calendar.css';

import type { ButtonSize } from '../components/button.contracts.ts';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon.vue';
import Toolbar from '../components/Toolbar.vue';
import ToolbarButton from '../components/ToolbarButton.vue';
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
  weekStart: 0,
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
    d.value.disabled && 'pointer-events-none opacity-50',
    attrs.class,
  ),
);

function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function isSelected(date: Date): boolean {
  const value = model.value;
  if (value === undefined) return false;
  if (value instanceof Date) return isSameDay(value, date);
  if (Array.isArray(value))
    return value.some((entry) => isSameDay(entry, date));

  const range = value as DateRange;
  return Boolean(
    (range.from && isSameDay(range.from, date)) ||
    (range.to && isSameDay(range.to, date)),
  );
}

/**
 * Upstream colours the day button only when it is selected or today
 * (`Calendar.tsx:285`), leaving the caption, weekday row and the other days on
 * the theme foreground. Scoping the accent per cell keeps that, where putting
 * `cladd-color-*` on the panel would tint the whole thing.
 */
function dayClass(date: Date): string {
  if (!currentColor.value) return '';
  const today = d.value.showToday && isSameDay(date, new Date());
  return isSelected(date) || today ? `cladd-color-${currentColor.value}` : '';
}

/**
 * The dependency types its header slot as a union across date, month and year
 * pickers. This wrapper only ever renders the date picker, so narrow to that arm.
 */
interface MonthYearHeader {
  handleMonthYearChange: (isNext: boolean, fromNav?: boolean) => void;
  isDisabled: (next: boolean) => boolean;
  month: number;
  year: number;
}

function asHeader(slotProps: unknown): MonthYearHeader {
  return slotProps as MonthYearHeader;
}

const monthFormatter = new Intl.DateTimeFormat(undefined, { month: 'long' });

function monthLabel(month: number): string {
  return monthFormatter.format(new Date(2000, month, 1));
}

const captionClass = computed(() =>
  cn('pl-2 font-semibold text-cladd-fg', tokens.value.captionText),
);

const ui = computed(() => ({
  menu: cn('cladd-calendar__menu', tokens.value.captionText),
  calendar: 'cladd-calendar__grid',
  calendarCell: cn(
    'cladd-calendar__cell',
    tokens.value.box,
    tokens.value.dayText,
  ),
  dayClass,
  navBtnPrev: 'cladd-calendar__nav',
  navBtnNext: 'cladd-calendar__nav',
}));
</script>

<template>
  <div
    v-bind="rootAttrs"
    :class="rootClass"
    data-part="calendar"
    :data-show-today="d.showToday"
    :data-size="d.size"
  >
    <div
      v-if="slots.header"
      :class="cn('mb-2', d.headerClassName)"
      data-part="header"
    >
      <slot name="header" />
    </div>

    <VueDatePicker
      v-model="pickerValue"
      :action-row="{
        showCancel: false,
        showNow: false,
        showPreview: false,
        showSelect: false,
      }"
      auto-apply
      :dark="theme === 'dark'"
      :disabled="d.disabled"
      :enable-time-picker="false"
      hide-input-icon
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
      <!-- Upstream's caption sits left with the nav grouped on the right
           (Calendar.tsx:355-364); the dependency's default splits the arrows
           either side of the label, so the header is rendered here instead. -->
      <template #month-year="slotProps">
        <div class="flex min-h-8 w-full items-center" data-part="caption">
          <span :class="captionClass">
            {{ monthLabel(asHeader(slotProps).month) }}
            {{ asHeader(slotProps).year }}
          </span>
          <Toolbar class="ml-auto" :size="d.controlSize">
            <ToolbarButton
              aria-label="Previous month"
              :disabled="asHeader(slotProps).isDisabled(false)"
              square
              @click="asHeader(slotProps).handleMonthYearChange(false, true)"
            >
              <ChevronLeftIcon />
            </ToolbarButton>
            <ToolbarButton
              aria-label="Next month"
              :disabled="asHeader(slotProps).isDisabled(true)"
              square
              @click="asHeader(slotProps).handleMonthYearChange(true, true)"
            >
              <ChevronLeftIcon class="rotate-180" />
            </ToolbarButton>
          </Toolbar>
        </div>
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
