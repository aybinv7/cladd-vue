<script setup lang="ts">
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundColorControl from '../components/PlaygroundColorControl.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const amount = ref('');
const valid = ref(true);
const disabled = ref(false);
const buttonColor = ref<Color>('neutral');

const code = computed(
  () => `<InputGroup ${disabled.value ? 'disabled' : ':disabled="false"'}>
  <InputGroupAddon side="inline-start">$</InputGroupAddon>
  <InputGroupInput
    v-model="amount"
    placeholder="0.00"
    :valid="${valid.value}"
  />
  <InputGroupAddon side="inline-end">USD</InputGroupAddon>
  <InputGroupButton color="${buttonColor.value}" label="Apply discount">
    Apply
  </InputGroupButton>
</InputGroup>`,
);
</script>

<template>
  <CatalogSection
    description="Addon and inline-action composition around a single control surface."
    eyebrow="Extension · Forms"
    id="input-group"
    title="InputGroup"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <InputGroup :disabled="disabled || !props.interactionsEnabled">
          <InputGroupAddon side="inline-start">$</InputGroupAddon>
          <InputGroupInput v-model="amount" placeholder="0.00" :valid="valid" />
          <InputGroupAddon side="inline-end">USD</InputGroupAddon>
          <InputGroupButton :color="buttonColor" label="Apply discount">
            Apply
          </InputGroupButton>
        </InputGroup>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="valid" label="valid" />
          <PlaygroundSwitchControl v-model="disabled" label="disabled" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="buttonColor" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
