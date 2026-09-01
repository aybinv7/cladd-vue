import type { CalendarProps, DatePickerProps } from '../src/calendar/index.ts';
import type { DialogProps, SearchFieldProps } from '../src/index.ts';

export const searchFieldConsumerProps = {
  clearButton: true,
  color: 'brand',
  disabled: false,
  inputId: 'pilgrim-search',
  name: 'query',
  placeholder: 'Search pilgrims',
  readOnly: false,
  rounded: true,
  size: 'lg',
  type: 'search',
} satisfies SearchFieldProps;

export const dialogConsumerProps = {
  ariaLabel: 'Cancel booking',
  cancelButtonColor: 'neutral',
  cancelButtonText: 'Keep booking',
  confirmButtonColor: 'red',
  confirmButtonText: 'Cancel booking',
  requireConfirmText: 'BK-2048',
  root: '#app',
  surfaceLevel: 2,
  title: 'Cancel booking?',
  variant: 'solid',
} satisfies DialogProps;

export const calendarConsumerProps = {
  color: 'brand',
  disabled: (date: Date) => date.getDay() === 5,
  locale: arDZ,
  mode: 'range',
  numberOfMonths: 2,
  showOutsideDays: true,
  size: 'lg',
  weekStart: 6,
} satisfies CalendarProps;

export const datePickerConsumerProps = {
  calendarProps: calendarConsumerProps,
  closeOnSelect: false,
  format: (value) => {
    if (Array.isArray(value)) return `${value.length} dates`;
    if (value instanceof Date) return value.toISOString();
    return `${value.from?.toISOString() ?? ''}:${value.to?.toISOString() ?? ''}`;
  },
  mode: 'range',
  placeholder: 'Select travel dates',
  popoverOffset: ['-50%', 4],
  popoverPosition: 'bottom-end',
} satisfies DatePickerProps;
import { arDZ } from 'date-fns/locale';
