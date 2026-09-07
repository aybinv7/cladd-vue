<script setup lang="ts">
defineProps<{ label?: string }>();
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <nav
    :aria-label="label ?? 'Breadcrumb'"
    class="cladd-breadcrumb"
    data-slot="breadcrumb"
  >
    <ol class="flex items-center gap-2 text-cladd-xs">
      <slot />
    </ol>
  </nav>
</template>
