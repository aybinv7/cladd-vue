<script setup lang="ts">
import {
  ComboboxChip,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxRoot,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{ accent: Color; interactionsEnabled: boolean }>();

const multiple = ref(true);
const busy = ref(false);
const selectedMultiple = ref<string[]>(['dz']);
const selectedSingle = ref('');

const code = computed(
  () => `<ComboboxRoot
  v-model:value="selected"
  :multiple="${multiple.value}"
  :busy="${busy.value}"
>
  <ComboboxInput placeholder="Add destination" />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxItem label="Algeria" value="dz">Algeria</ComboboxItem>
      <ComboboxItem label="Tunisia" value="tn">Tunisia</ComboboxItem>
      <ComboboxItem label="Saudi Arabia" value="sa">Saudi Arabia</ComboboxItem>
    </ComboboxList>
    <ComboboxEmpty>No destination found.</ComboboxEmpty>
  </ComboboxContent>
</ComboboxRoot>`,
);
</script>

<template>
  <CatalogSection
    description="Editable single and multiple entity selection with a consumer-owned local list."
    eyebrow="Extension · Discovery"
    id="combobox"
    title="Combobox"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <ComboboxRoot
          v-if="multiple"
          v-model:value="selectedMultiple"
          :busy="busy"
          multiple
        >
          <div
            class="flex flex-wrap items-center gap-1 rounded-cladd-xs border border-cladd-outline p-1"
          >
            <ComboboxChip
              v-for="value in selectedMultiple"
              :key="value"
              :value="value"
              >{{ value.toUpperCase() }}</ComboboxChip
            >
            <ComboboxInput
              :disabled="!props.interactionsEnabled"
              placeholder="Add destination"
            />
            <ComboboxClear />
          </div>
          <ComboboxContent>
            <ComboboxList>
              <ComboboxItem label="Algeria" value="dz">Algeria</ComboboxItem>
              <ComboboxItem label="Tunisia" value="tn">Tunisia</ComboboxItem>
              <ComboboxItem label="Saudi Arabia" value="sa"
                >Saudi Arabia</ComboboxItem
              >
            </ComboboxList>
            <ComboboxEmpty>No destination found.</ComboboxEmpty>
          </ComboboxContent>
        </ComboboxRoot>
        <ComboboxRoot v-else v-model:value="selectedSingle" :busy="busy">
          <div
            class="flex items-center gap-1 rounded-cladd-xs border border-cladd-outline p-1"
          >
            <ComboboxInput
              :disabled="!props.interactionsEnabled"
              placeholder="Choose a destination"
            />
            <ComboboxClear />
          </div>
          <ComboboxContent>
            <ComboboxList>
              <ComboboxItem label="Algeria" value="dz">Algeria</ComboboxItem>
              <ComboboxItem label="Tunisia" value="tn">Tunisia</ComboboxItem>
              <ComboboxItem label="Saudi Arabia" value="sa"
                >Saudi Arabia</ComboboxItem
              >
            </ComboboxList>
            <ComboboxEmpty>No destination found.</ComboboxEmpty>
          </ComboboxContent>
        </ComboboxRoot>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="multiple" label="multiple" />
          <PlaygroundSwitchControl v-model="busy" label="busy" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
