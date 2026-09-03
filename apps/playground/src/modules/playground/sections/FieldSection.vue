<script setup lang="ts">
import {
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const name = ref('');
const amount = ref('');
const agreed = ref(false);
const showError = ref(true);
</script>

<template>
  <CatalogSection
    description="Accessible field composition with generated IDs, joined descriptions, and input groups."
    eyebrow="04 · Forms"
    title="Field"
  >
    <FieldGroup label="Account">
      <Field :invalid="showError">
        <FieldLabel>Name</FieldLabel>
        <InputGroup>
          <InputGroupAddon side="inline-start">@</InputGroupAddon>
          <InputGroupInput v-model="name" placeholder="Ada Lovelace" />
        </InputGroup>
        <FieldDescription>Shown on invoices and receipts.</FieldDescription>
        <FieldError v-if="showError">Enter a display name.</FieldError>
      </Field>

      <Field :invalid="false">
        <FieldLabel>Amount</FieldLabel>
        <InputGroup>
          <InputGroupAddon side="inline-start">$</InputGroupAddon>
          <InputGroupInput v-model="amount" placeholder="0.00" />
          <InputGroupAddon side="inline-end">USD</InputGroupAddon>
          <InputGroupButton label="Apply discount">Apply</InputGroupButton>
        </InputGroup>
        <FieldDescription>Charged in USD.</FieldDescription>
      </Field>

      <FieldSet :disabled="!props.interactionsEnabled">
        <FieldLegend>Preferences</FieldLegend>
        <Field>
          <FieldLabel>Newsletter</FieldLabel>
          <Checkbox v-model:checked="agreed" />
          <FieldDescription>One email per month.</FieldDescription>
        </Field>
      </FieldSet>
    </FieldGroup>
  </CatalogSection>
</template>
