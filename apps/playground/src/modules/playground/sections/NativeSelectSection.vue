<script setup lang="ts">
import { NativeSelect, NativeSelectGroup, NativeSelectOption } from 'cladd-vue';
import type { Color, NativeSelectProps } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const country = ref('dz');
const size = ref<NonNullable<NativeSelectProps['size']>>('lg');
const invalid = ref(false);
const multiple = ref(false);
const required = ref(false);
const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

const code = computed(
  () => `<NativeSelect
  v-model="country"
  size="${size.value}"
  ${invalid.value ? 'invalid' : ':invalid="false"'}
  ${multiple.value ? 'multiple' : ':multiple="false"'}
  ${required.value ? 'required' : ':required="false"'}
>
  <NativeSelectGroup label="Maghreb">
    <NativeSelectOption value="dz">Algeria</NativeSelectOption>
    <NativeSelectOption value="tn">Tunisia</NativeSelectOption>
    <NativeSelectOption value="ma">Morocco</NativeSelectOption>
  </NativeSelectGroup>
</NativeSelect>`,
);
</script>

<template>
  <CatalogSection
    description="A themed passthrough to a real <select>/<option>/<optgroup> — native form submission, the OS mobile picker, and constraint validation all keep working exactly as they do for a bare <select>."
    eyebrow="Extension · Data display"
    id="native-select"
    title="NativeSelect"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <NativeSelect
          v-model="country"
          class="max-w-56"
          :disabled="!props.interactionsEnabled"
          :invalid="invalid"
          :multiple="multiple"
          name="country"
          :required="required"
          :size="size"
        >
          <NativeSelectGroup label="Maghreb">
            <NativeSelectOption value="dz">Algeria</NativeSelectOption>
            <NativeSelectOption value="tn">Tunisia</NativeSelectOption>
            <NativeSelectOption value="ma">Morocco</NativeSelectOption>
          </NativeSelectGroup>
        </NativeSelect>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="size"
            :items="sizes"
            label="NativeSelect size"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="invalid" label="invalid" />
          <PlaygroundSwitchControl v-model="multiple" label="multiple" />
          <PlaygroundSwitchControl v-model="required" label="required" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
