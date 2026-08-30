<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import type { UiSize } from '../foundations/contracts.ts';
import { cn } from '../shared/cn.ts';
import {
  buildColorValue,
  CHECKER,
  gradientCss,
  isGradientInput,
  parseColor,
  parseGradient,
  type ColorInput,
  type ColorValue,
  type GradientInput,
} from '../shared/color.ts';
import { buttonIconSizes } from './button.contracts.ts';
import Button from './Button.vue';
import type { ColorEditorEmitValue } from './colorEditor.contracts.ts';
import ColorEditor from './ColorEditor.vue';
import {
  colorPickerSwatchSizes,
  type ColorPickerDisplay,
  type ColorPickerProps,
  type ColorPickerStoredValue,
} from './colorPicker.contracts.ts';
import CloseIcon from './icons/CloseIcon.vue';
import DropdownIcon from './icons/DropdownIcon.vue';
import type { PopoverOffset, PopoverPosition } from './overlay.contracts.ts';
import Popover from './Popover.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ColorPickerProps>(), {
  alpha: undefined,
  angleControl: undefined,
  anchorElement: undefined,
  areaClassName: undefined,
  color: undefined,
  contentClassName: undefined,
  controlOutline: undefined,
  controlSize: undefined,
  debounce: undefined,
  defaultValue: undefined,
  disabled: undefined,
  dropdownIcon: undefined,
  editorClassName: undefined,
  format: undefined,
  gradient: undefined,
  gradientLabel: undefined,
  hexInput: undefined,
  iconClassName: undefined,
  inputs: undefined,
  multiline: undefined,
  outline: undefined,
  placeholder: undefined,
  placeholderClassName: undefined,
  popoverClassName: undefined,
  popoverColor: undefined,
  popoverOffset: undefined,
  popoverPosition: undefined,
  popoverSurfaceLevel: undefined,
  readOnly: undefined,
  reverse: undefined,
  rounded: undefined,
  size: undefined,
  surface: undefined,
  swatchClassName: undefined,
  swatches: undefined,
  throttle: undefined,
  valueClassName: undefined,
});

/** Controlled value. A CSS color/gradient string, a channel set, or a gradient object. */
const model = defineModel<ColorInput | GradientInput | undefined>({
  default: undefined,
});

/** Controlled popover open state. */
const popoverOpen = defineModel<boolean>('popoverOpen', { default: false });

const emit = defineEmits<{
  /** Fires on every change with the full color, or a discriminated `solid` / `linear` value in gradient mode. */
  change: [value: ColorEditorEmitValue];
}>();

const d = useComponentDefaults('ColorPicker', props, {
  dropdownIcon: true,
  gradientLabel: 'Gradient',
  placeholder: '',
  popoverOffset: ['-50%', 4] as PopoverOffset,
  popoverPosition: 'bottom-end' as PopoverPosition,
  size: 'md' as UiSize,
});

const slots = defineSlots<{
  /**
   * Custom node rendered in place of the auto-formatted value (hex / gradient label).
   *
   * Rendered as `data-part="value"` — use to show your own value text, a field label, or richer formatting.
   */
  default?: () => unknown;
  /** Content rendered below the editor panel, inside the popover. */
  footer?: () => unknown;
  /** Content rendered above the editor panel, inside the popover. */
  header?: () => unknown;
  /** Icon node rendered at the start of the trigger, before the swatch. */
  icon?: () => unknown;
}>();

const attrs = useAttrs();
const rootAttrs = computed(() => {
  const { class: _consumerClass, ...rest } = attrs;
  return rest;
});

const triggerElement = ref<HTMLElement>();
const stored = ref<ColorPickerStoredValue>(d.value.defaultValue);

function setTriggerElement(element: unknown): void {
  triggerElement.value =
    element && typeof element === 'object' && '$el' in element
      ? ((element as { $el: HTMLElement }).$el ?? undefined)
      : ((element as HTMLElement | null) ?? undefined);
}

/**
 * Resolve a value (input form *or* the rich form the editor emits) into what the
 * trigger shows: a swatch background + label, or the empty/transparent state.
 */
function resolveDisplay(
  input: ColorPickerStoredValue,
  gradientLabel: string,
): ColorPickerDisplay {
  if (input === undefined || input === null || input === '') {
    return { empty: true };
  }

  // Rich emitted value — already carries its own `css`.
  if (typeof input === 'object' && 'css' in input) {
    if ('type' in input && input.type === 'linear') {
      // A gradient whose every stop is fully transparent reads as no color.
      if (input.stops.every((stop) => stop.color.rgb.a === 0)) {
        return { empty: true };
      }
      return { empty: false, background: input.css, text: gradientLabel };
    }

    const value = input as ColorValue;
    if (value.rgb.a === 0) return { empty: true };
    return {
      empty: false,
      background: value.css,
      text: value.hex.toUpperCase(),
    };
  }

  // Gradient input (`linear-gradient(...)` string or `{ stops }`).
  if (isGradientInput(input)) {
    const parsed = parseGradient(input);
    if (parsed) {
      if (parsed.stops.every((stop) => stop.hsva.a === 0))
        return { empty: true };
      const stops = parsed.stops.map((stop) => ({
        color: buildColorValue(stop.hsva),
        position: stop.position,
      }));
      return {
        empty: false,
        background: gradientCss(parsed.angle, stops),
        text: gradientLabel,
      };
    }
  }

  // Solid input (CSS string or a single channel set).
  const hsva = parseColor(input as ColorInput);
  if (hsva.a === 0) return { empty: true };
  const value = buildColorValue(hsva);
  return { empty: false, background: value.css, text: value.hex.toUpperCase() };
}

const display = computed(() =>
  resolveDisplay(model.value ?? stored.value, d.value.gradientLabel),
);
const showPlaceholder = computed(() => !slots.default && display.value.empty);
const interactive = computed(() => !d.value.readOnly && !d.value.disabled);

function onEditorChange(next: ColorEditorEmitValue): void {
  stored.value = next;
  emit('change', next);
}

function toggleOpen(): void {
  popoverOpen.value = !popoverOpen.value;
}

const rootClass = computed(() => cn('cladd-colorpicker w-full', attrs.class));
const triggerContentClass = computed(() =>
  cn(
    d.value.dropdownIcon && 'pr-1.5',
    'flex w-full min-w-0 shrink items-center gap-2',
    d.value.reverse && 'flex-row-reverse',
    d.value.contentClassName,
  ),
);
const iconWrapperClass = computed(() =>
  cn('shrink-0', buttonIconSizes[d.value.size], d.value.iconClassName),
);
const emptySwatchClass = computed(() =>
  cn(
    'flex shrink-0 items-center justify-center rounded-cladd-2xs border border-cladd-outline text-cladd-fg-softer',
    colorPickerSwatchSizes[d.value.size],
    d.value.swatchClassName,
  ),
);
const filledSwatchClass = computed(() =>
  cn(
    'relative shrink-0 rounded-cladd-2xs',
    colorPickerSwatchSizes[d.value.size],
    d.value.swatchClassName,
  ),
);
const swatchCheckerStyle = computed(() => ({
  background: CHECKER.background.replaceAll('12px', '16px'),
}));
const valueClass = computed(() =>
  cn(
    'w-full min-w-0 shrink truncate',
    showPlaceholder.value && 'text-cladd-fg-softer',
    d.value.placeholderClassName,
    d.value.valueClassName,
  ),
);
const popoverClass = computed(() => cn('w-64', d.value.popoverClassName));
</script>

<template>
  <Button
    v-if="!d.anchorElement"
    :ref="setTriggerElement"
    v-bind="rootAttrs"
    :aria-disabled="d.disabled || undefined"
    :aria-expanded="popoverOpen"
    aria-haspopup="dialog"
    :aria-readonly="d.readOnly || undefined"
    :class="rootClass"
    :color="d.color"
    :content-class-name="triggerContentClass"
    data-part="trigger"
    :disabled="d.disabled"
    :multiline="d.multiline"
    :outline="d.outline"
    :read-only="d.readOnly"
    :rounded="d.rounded"
    :size="d.size"
    :surface="d.surface"
    @click="toggleOpen"
  >
    <div v-if="slots.icon" :class="iconWrapperClass" data-part="icon">
      <slot name="icon" />
    </div>

    <div v-if="display.empty" :class="emptySwatchClass" data-part="swatch">
      <CloseIcon class="size-3" />
    </div>
    <div
      v-else
      :class="filledSwatchClass"
      data-part="swatch"
      :style="swatchCheckerStyle"
    >
      <span
        class="absolute inset-0 rounded-cladd-2xs shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] light:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
        :style="{ background: display.background }"
      />
    </div>

    <div :class="valueClass" data-part="value">
      <slot>{{ display.empty ? d.placeholder : display.text }}</slot>
    </div>

    <DropdownIcon
      v-if="d.dropdownIcon"
      class="size-4 shrink-0 text-cladd-fg-softer"
      data-part="dropdown-icon"
    />
  </Button>

  <Popover
    v-if="interactive"
    v-model:open="popoverOpen"
    :anchor-element="d.anchorElement ?? triggerElement"
    :class="popoverClass"
    :color="d.popoverColor"
    content-class-name="p-4"
    :offset="d.popoverOffset"
    :position="d.popoverPosition"
    :surface-level="d.popoverSurfaceLevel"
    @click.stop
  >
    <ColorEditor
      :alpha="d.alpha"
      :angle-control="d.angleControl"
      :area-class-name="d.areaClassName"
      :class="d.editorClassName"
      :control-outline="d.controlOutline"
      :control-size="d.controlSize"
      :debounce="d.debounce"
      :default-value="d.defaultValue"
      :format="d.format"
      :gradient="d.gradient"
      :hex-input="d.hexInput"
      :inputs="d.inputs"
      :model-value="model"
      :swatches="d.swatches"
      :throttle="d.throttle"
      @change="onEditorChange"
      @update:model-value="model = $event"
    >
      <template v-if="slots.header" #header><slot name="header" /></template>
      <template v-if="slots.footer" #footer><slot name="footer" /></template>
    </ColorEditor>
  </Popover>
</template>
