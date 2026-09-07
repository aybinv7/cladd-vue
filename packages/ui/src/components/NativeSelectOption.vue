<script setup lang="ts">
defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <option v-bind="$attrs" data-slot="native-select-option">
    <slot />
  </option>
</template>
