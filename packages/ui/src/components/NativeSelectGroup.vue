<script setup lang="ts">
defineOptions({ inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
</script>
<template>
  <optgroup v-bind="$attrs" data-slot="native-select-group">
    <slot />
  </optgroup>
</template>
