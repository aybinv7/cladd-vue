<script setup lang="ts">
import {
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from 'cladd-vue';
import type { Color, FieldDensity, FieldOrientation } from 'cladd-vue';
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

const name = ref('');
const orientation = ref<FieldOrientation>('vertical');
const density = ref<FieldDensity>('comfortable');
const invalid = ref(false);
const required = ref(false);
const disabled = ref(false);
const orientations = ['vertical', 'horizontal'] as const;
const densities = ['comfortable', 'compact'] as const;

const code = computed(
  () => `<Field
  density="${density.value}"
  orientation="${orientation.value}"
  ${required.value ? 'required' : ':required="false"'}
  ${invalid.value ? 'invalid' : ':invalid="false"'}
  ${disabled.value ? 'disabled' : ':disabled="false"'}
>
  <FieldLabel>Display name</FieldLabel>
  <input v-model="name" type="text" />
  <FieldDescription>Shown on your public profile.</FieldDescription>${
    invalid.value
      ? `
  <FieldError>Enter a display name.</FieldError>`
      : ''
  }
</Field>`,
);

const fieldSetCode = `<FieldSet legend="Preferences">
  <FieldLegend>Preferences</FieldLegend>
  <Field>
    <FieldLabel>Newsletter</FieldLabel>
    <Checkbox v-model:checked="newsletter" />
    <FieldDescription>One email per month.</FieldDescription>
  </Field>
  <Field>
    <FieldLabel>Product updates</FieldLabel>
    <Checkbox v-model:checked="productUpdates" />
    <FieldDescription>Occasional release notes.</FieldDescription>
  </Field>
</FieldSet>`;

const newsletter = ref(false);
const productUpdates = ref(false);
</script>

<template>
  <CatalogSection
    description="Accessible label/description/error composition with generated IDs and joined `aria-describedby`."
    eyebrow="Extension · Forms"
    id="field"
    title="Field"
  >
    <ComponentPlayground :code="code">
      <template #preview>
        <Field
          :density="density"
          :disabled="disabled || !props.interactionsEnabled"
          :invalid="invalid"
          :orientation="orientation"
          :required="required"
        >
          <FieldLabel>Display name</FieldLabel>
          <input
            v-model="name"
            :disabled="disabled || !props.interactionsEnabled"
            type="text"
          />
          <FieldDescription>Shown on your public profile.</FieldDescription>
          <FieldError v-if="invalid">Enter a display name.</FieldError>
        </Field>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="orientation"
            :items="orientations"
            label="Orientation"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="density"
            :items="densities"
            label="Density"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="invalid" label="invalid" />
          <PlaygroundSwitchControl v-model="required" label="required" />
          <PlaygroundSwitchControl v-model="disabled" label="disabled" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <ComponentPlayground :code="fieldSetCode">
      <template #preview>
        <FieldSet :disabled="!props.interactionsEnabled" legend="Preferences">
          <FieldLegend>Preferences</FieldLegend>
          <Field>
            <FieldLabel>Newsletter</FieldLabel>
            <Checkbox v-model:checked="newsletter" />
            <FieldDescription>One email per month.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Product updates</FieldLabel>
            <Checkbox v-model:checked="productUpdates" />
            <FieldDescription>Occasional release notes.</FieldDescription>
          </Field>
        </FieldSet>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
