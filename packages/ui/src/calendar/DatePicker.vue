<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';

import { buttonIconSizes } from '../components/button.contracts.ts';
import Button from '../components/Button.vue';
import DropdownIcon from '../components/icons/DropdownIcon.vue';
import type {
  PopoverOffset,
  PopoverPosition,
} from '../components/overlay.contracts.ts';
import Popover from '../components/Popover.vue';
import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { cn } from '../shared/cn.ts';
import {
  shouldCloseAfterSelect,
  type CalendarMode,
  type CalendarSize,
  type CalendarValue,
  type DatePickerProps,
  type DatePickerSize,
  type DateRange,
} from './calendar.contracts.ts';
import Calendar from './Calendar.vue';
import CalendarIcon from './CalendarIcon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<DatePickerProps>(), {
  calendarProps: undefined,
  calendarSize: undefined,
  closeOnSelect: undefined,
  color: undefined,
  contentClassName: undefined,
  disabled: undefined,
  dropdownIcon: undefined,
  format: undefined,
  iconClassName: undefined,
  maxDate: undefined,
  minDate: undefined,
  mode: undefined,
  numberOfMonths: undefined,
  outline: undefined,
  placeholder: undefined,
  popoverClassName: undefined,
  popoverColor: undefined,
  popoverOffset: undefined,
  popoverPosition: undefined,
  popoverSurfaceLevel: undefined,
  readOnly: undefined,
  rounded: undefined,
  size: undefined,
});

/** Selected value. A `Date` in single mode, `Date[]` in multiple, a `DateRange` in range. */
const model = defineModel<CalendarValue>({ default: undefined });

/** Controlled popover open state. */
const open = defineModel<boolean>('open', { default: false });

const emit = defineEmits<{
  /** Fires when the selection changes. */
  change: [value: CalendarValue];
}>();

const d = useComponentDefaults('DatePicker', props, {
  calendarSize: 'lg' as CalendarSize,
  closeOnSelect: true,
  dropdownIcon: true,
  mode: 'single' as CalendarMode,
  numberOfMonths: 1,
  placeholder: 'Select date',
  popoverOffset: ['-50%', 4] as PopoverOffset,
  popoverPosition: 'bottom-end' as PopoverPosition,
  size: 'md' as DatePickerSize,
});

const slots = defineSlots<{
  /** Replaces the auto-formatted value in the trigger. */
  default?: () => unknown;
  /** Icon node in the trigger. Defaults to a calendar glyph. */
  icon?: () => unknown;
}>();

const attrs = useAttrs();
const rootAttrs = computed(() => {
  const { class: _consumerClass, ...rest } = attrs;
  return rest;
});

const triggerElement = ref<HTMLElement>();

function setTriggerElement(element: unknown): void {
  triggerElement.value =
    element && typeof element === 'object' && '$el' in element
      ? ((element as { $el: HTMLElement }).$el ?? undefined)
      : ((element as HTMLElement | null) ?? undefined);
}

function defaultFormatDate(value: Date): string {
  return value.toLocaleDateString();
}

const label = computed(() => {
  const value = model.value;
  if (value === undefined) return d.value.placeholder;

  if (d.value.format) {
    return d.value.format(value as Date | Date[] | DateRange);
  }

  if (d.value.mode === 'multiple') {
    const dates = value as Date[];
    return dates.length > 0
      ? dates.map(defaultFormatDate).join(', ')
      : d.value.placeholder;
  }

  if (d.value.mode === 'range') {
    const range = value as DateRange;
    if (!range.from) return d.value.placeholder;
    return range.to
      ? `${defaultFormatDate(range.from)} – ${defaultFormatDate(range.to)}`
      : defaultFormatDate(range.from);
  }

  return defaultFormatDate(value as Date);
});

const isEmpty = computed(() => label.value === d.value.placeholder);
const interactive = computed(() => !d.value.readOnly && !d.value.disabled);

function onCalendarChange(value: CalendarValue): void {
  emit('change', value);
  if (shouldCloseAfterSelect(d.value.mode, d.value.closeOnSelect)) {
    open.value = false;
  }
}

const rootClass = computed(() => cn('cladd-datepicker w-full', attrs.class));
const contentClass = computed(() =>
  cn(
    d.value.dropdownIcon && 'pr-1.5',
    'flex w-full min-w-0 shrink items-center gap-2',
    d.value.contentClassName,
  ),
);
const iconWrapperClass = computed(() =>
  cn('shrink-0', buttonIconSizes[d.value.size], d.value.iconClassName),
);
const valueClass = computed(() =>
  cn('w-full min-w-0 shrink truncate', isEmpty.value && 'text-cladd-fg-softer'),
);
const popoverClass = computed(() => cn('w-auto', d.value.popoverClassName));
</script>

<template>
  <Button
    :ref="setTriggerElement"
    v-bind="rootAttrs"
    :aria-expanded="open"
    aria-haspopup="dialog"
    :class="rootClass"
    :color="d.color"
    :content-class-name="contentClass"
    data-part="trigger"
    :disabled="d.disabled"
    :outline="d.outline"
    :read-only="d.readOnly"
    :rounded="d.rounded"
    :size="d.size"
    @click="open = !open"
  >
    <div :class="iconWrapperClass" data-part="icon">
      <slot name="icon"><CalendarIcon /></slot>
    </div>
    <div :class="valueClass" data-part="value">
      <slot>{{ label }}</slot>
    </div>
    <DropdownIcon
      v-if="d.dropdownIcon"
      class="size-4 shrink-0 text-cladd-fg-softer"
      data-part="dropdown-icon"
    />
  </Button>

  <Popover
    v-if="interactive"
    v-model:open="open"
    :anchor-element="triggerElement"
    :class="popoverClass"
    :color="d.popoverColor ?? d.color"
    content-class-name="p-3"
    :offset="d.popoverOffset"
    :position="d.popoverPosition"
    :surface-level="d.popoverSurfaceLevel"
    @click.stop
  >
    <Calendar
      :size="d.calendarSize"
      v-bind="d.calendarProps"
      v-model="model"
      :color="d.calendarProps?.color ?? d.color"
      :disabled="d.calendarProps?.disabled ?? d.disabled"
      :max-date="d.calendarProps?.maxDate ?? d.maxDate"
      :min-date="d.calendarProps?.minDate ?? d.minDate"
      :mode="d.mode"
      :number-of-months="d.calendarProps?.numberOfMonths ?? d.numberOfMonths"
      :read-only="d.calendarProps?.readOnly ?? d.readOnly"
      @change="onCalendarChange"
    />
  </Popover>
</template>
