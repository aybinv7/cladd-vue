<script setup lang="ts">
import { computed, onMounted, onUnmounted, shallowRef } from 'vue';

import type { SidebarProviderProps } from './sidebar.contracts.ts';
import { provideSidebarContext } from './sidebarContext.ts';

defineSlots<{ default?: () => unknown }>();
const props = withDefaults(defineProps<SidebarProviderProps>(), {
  collapsible: undefined,
  defaultMobileOpen: undefined,
  defaultOpen: undefined,
  keyboardShortcut: undefined,
  mobile: undefined,
  mobileOpen: undefined,
  open: undefined,
  side: undefined,
  variant: undefined,
});
const emit = defineEmits<{
  'update:mobileOpen': [value: boolean];
  'update:open': [value: boolean];
}>();
const desktop = shallowRef(props.defaultOpen ?? true);
const mobile = shallowRef(props.defaultMobileOpen ?? false);
const open = computed(() => props.open ?? desktop.value);
const mobileOpen = computed(() => props.mobileOpen ?? mobile.value);
function setOpen(value: boolean): void {
  if (props.open === undefined) desktop.value = value;
  emit('update:open', value);
}
function setMobileOpen(value: boolean): void {
  if (props.mobileOpen === undefined) mobile.value = value;
  emit('update:mobileOpen', value);
}
function toggle(): void {
  setOpen(!open.value);
}
function onKeydown(event: KeyboardEvent): void {
  const target = event.target;
  if (
    !props.keyboardShortcut ||
    !(event.metaKey || event.ctrlKey) ||
    event.key.toLowerCase() !== 'b' ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  )
    return;
  event.preventDefault();
  toggle();
}
onMounted(() => document.addEventListener('keydown', onKeydown));
onUnmounted(() => document.removeEventListener('keydown', onKeydown));
provideSidebarContext({
  mobile: computed(() => props.mobile ?? false),
  mobileOpen,
  open,
  side: computed(() => props.side ?? 'inline-start'),
  variant: computed(() => props.variant ?? 'sidebar'),
  setMobileOpen,
  setOpen,
  toggle,
});
</script>
<template>
  <div
    class="cladd-sidebar-provider flex h-full min-h-0"
    data-slot="sidebar-provider"
  >
    <slot />
  </div>
</template>
