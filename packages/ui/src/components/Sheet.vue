<script setup lang="ts">
import { computed, onBeforeUnmount, shallowRef, useAttrs, useSlots } from 'vue';

import { useComponentDefaults } from '../composables/useComponentDefaults.ts';
import { useFocusTrap } from '../composables/useFocusTrap.ts';
import { useOverlayDismiss } from '../composables/useOverlayDismiss.ts';
import { useOverlayLifecycle } from '../composables/useOverlayLifecycle.ts';
import { useOverlayPhase } from '../composables/useOverlayPhase.ts';
import { provideSurfaceColorReset } from '../contexts/surfaceContext.ts';
import { useUiContext } from '../contexts/uiContext.ts';
import { cn } from '../shared/cn.ts';
import Backdrop from './Backdrop.vue';
import {
  dialogInertHoldSelector,
  resolveOverlayElement,
} from './overlay.contracts.ts';
import {
  sheetRootContextKey,
  useOverlayRootContext,
} from './overlayRootContext.ts';
import type { SheetProps } from './sheet.contracts.ts';
import Surface from './Surface.vue';

defineOptions({ inheritAttrs: false });
defineSlots<{
  default?: (props: { close: () => void }) => unknown;
  description?: () => unknown;
  footer?: (props: { close: () => void }) => unknown;
  header?: () => unknown;
  title?: () => unknown;
}>();

const props = withDefaults(defineProps<SheetProps>(), {
  ariaDescribedby: undefined,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  closeOnBackdropClick: undefined,
  closeOnEscape: undefined,
  contentClassName: undefined,
  dragToClose: undefined,
  inertContainer: undefined,
  lazy: undefined,
  root: undefined,
  side: undefined,
});
const emit = defineEmits<{
  closed: [];
  closing: [];
  opened: [];
  opening: [];
}>();

const modelOpen = defineModel<boolean | undefined>('open', {
  default: undefined,
});
const attrs = useAttrs();
const slots = useSlots();
const ui = useUiContext();
const root = useOverlayRootContext(sheetRootContextKey);
const container = shallowRef<HTMLElement>();
const panel = shallowRef<HTMLElement>();
const dragOffset = shallowRef(0);
let dragStartY: number | undefined;
const d = useComponentDefaults('Sheet', props, {
  closeOnBackdropClick: true,
  closeOnEscape: true,
  dragToClose: false,
  inertContainer: '.app-container',
  lazy: false,
  side: 'inline-end' as NonNullable<SheetProps['side']>,
});
const model = computed<boolean>({
  get: () => modelOpen.value ?? root?.open.value ?? false,
  set: (value) => {
    if (modelOpen.value !== undefined || !root) modelOpen.value = value;
    else root.setOpen(value);
  },
});
const { phase, setPhase } = useOverlayPhase(model);
const mounted = computed(() => phase.value !== 'closed');
const teleportTarget = computed(() => {
  if (d.value.root === false) return undefined;
  return (
    (d.value.root as string | HTMLElement | undefined) ?? ui.overlaysRoot.value
  );
});
const isInline = computed(() => d.value.root === false);
const id = `cladd-sheet-${Math.random().toString(36).slice(2)}`;
const titleId = `${id}-title`;
const descriptionId = `${id}-description`;
const labelledby = computed(
  () => d.value.ariaLabelledby ?? (slots.title ? titleId : undefined),
);
const describedby = computed(
  () =>
    d.value.ariaDescribedby ?? (slots.description ? descriptionId : undefined),
);
const containerAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const sideClasses = computed(() => {
  const side = d.value.side;
  if (side === 'inline-start') {
    return 'inset-y-0 inset-s-0 h-full w-full max-w-md -translate-x-full rtl:translate-x-full data-[open=true]:translate-x-0';
  }
  if (side === 'top')
    return 'inset-x-0 top-0 w-full -translate-y-full data-[open=true]:translate-y-0';
  if (side === 'bottom')
    return 'inset-x-0 bottom-0 w-full translate-y-full data-[open=true]:translate-y-0';
  return 'inset-y-0 inset-e-0 h-full w-full max-w-md translate-x-full rtl:-translate-x-full data-[open=true]:translate-x-0';
});
const panelClass = computed(() =>
  cn(
    'cladd-sheet fixed z-50 flex flex-col transition-transform duration-200 motion-reduce:transition-none',
    sideClasses.value,
    attrs.class,
  ),
);
const panelStyle = computed(() =>
  dragStartY === undefined
    ? undefined
    : { transform: `translateY(${dragOffset.value}px)` },
);

function close(): void {
  model.value = false;
}

function setPanel(value: unknown): void {
  panel.value = resolveOverlayElement(value);
}

function onPointerDown(event: PointerEvent): void {
  if (
    !d.value.dragToClose ||
    d.value.side !== 'bottom' ||
    event.pointerType === 'mouse'
  )
    return;
  dragStartY = event.clientY;
  dragOffset.value = 0;
  panel.value?.setPointerCapture(event.pointerId);
}

function onPointerMove(event: PointerEvent): void {
  if (dragStartY === undefined) return;
  dragOffset.value = Math.max(0, event.clientY - dragStartY);
}

function onPointerUp(event: PointerEvent): void {
  if (dragStartY === undefined) return;
  const threshold = Math.max(96, (panel.value?.clientHeight ?? 0) * 0.2);
  const shouldClose = dragOffset.value >= threshold;
  dragStartY = undefined;
  dragOffset.value = 0;
  if (panel.value?.hasPointerCapture(event.pointerId)) {
    panel.value.releasePointerCapture(event.pointerId);
  }
  if (shouldClose) close();
}

function inertTarget(): HTMLElement | null {
  return document.querySelector<HTMLElement>(d.value.inertContainer);
}

function setInert(value: boolean): void {
  const target = inertTarget();
  if (!target) return;
  if (
    !value &&
    [...document.querySelectorAll(dialogInertHoldSelector)].some(
      (overlay) => !container.value?.contains(overlay),
    )
  )
    return;
  target.inert = value;
}

onBeforeUnmount(() => setInert(false));

const { opened } = useOverlayLifecycle({
  closeOnEscape: () => d.value.closeOnEscape,
  element: panel,
  lazy: () => d.value.lazy,
  onClose: () => {
    setInert(false);
    emit('closing');
  },
  onClosed: () => emit('closed'),
  onOpen: () => emit('opening'),
  onOpened: () => {
    setInert(true);
    emit('opened');
  },
  phase,
  setPhase,
});

useOverlayDismiss({
  closeOnOutsideClick: () => d.value.closeOnBackdropClick,
  container,
  onClose: close,
  opened,
});
useFocusTrap({ active: opened, container });
provideSurfaceColorReset();
</script>

<template>
  <Teleport :disabled="isInline" :to="teleportTarget ?? 'body'">
    <div
      v-if="mounted"
      v-bind="containerAttrs"
      ref="container"
      :aria-describedby="describedby"
      :aria-label="d.ariaLabel"
      :aria-labelledby="labelledby"
      aria-modal="true"
      class="cladd-sheet-container fixed inset-0 z-50"
      role="dialog"
    >
      <Backdrop
        class="duration-200"
        @click="d.closeOnBackdropClick && close()"
      />
      <Surface
        :ref="setPanel"
        :class="panelClass"
        :content-class-name="
          cn('flex min-h-0 flex-1 flex-col gap-4 p-4', d.contentClassName)
        "
        :data-open="opened"
        :level="1"
        outline
        :style="panelStyle"
        variant="gradient"
        @pointercancel="onPointerUp"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
      >
        <header
          v-if="$slots.header || $slots.title || $slots.description"
          class="flex flex-col gap-1"
        >
          <slot name="header" />
          <div
            v-if="$slots.title"
            :id="titleId"
            class="text-cladd-sm font-semibold"
          >
            <slot name="title" />
          </div>
          <div
            v-if="$slots.description"
            :id="descriptionId"
            class="text-cladd-xs text-cladd-fg-soft"
          >
            <slot name="description" />
          </div>
        </header>
        <slot :close="close" />
        <footer v-if="$slots.footer">
          <slot name="footer" :close="close" />
        </footer>
      </Surface>
    </div>
  </Teleport>
</template>
