<script setup lang="ts">
import { OTPField, OTPFieldInput, OTPFieldSeparator } from '@cladd-vue/ui';
import type { Color } from '@cladd-vue/ui';
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

const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
const size = ref<'2xl' | 'lg' | 'md' | 'sm' | 'xl'>('lg');
const valid = ref(true);
const readOnly = ref(false);

const otp = ref('');
const grouped = ref('');
const letters = ref('');

const code = computed(
  () => `<OTPField v-model="value" :max-length="6" :valid="${valid.value}" size="${size.value}">
  <OTPFieldInput v-for="i in 6" :key="i" />
</OTPField>`,
);
</script>

<template>
  <CatalogSection
    description="One character per cell, with focus that advances as you type, steps back on backspace, and spreads a pasted code across the remaining cells."
    eyebrow="04 · Forms"
    id="otp"
    title="OTP field"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <OTPField
          v-model="otp"
          :disabled="!props.interactionsEnabled"
          :max-length="6"
          :read-only="readOnly"
          :size="size"
          :valid="valid"
        >
          <OTPFieldInput v-for="cell in 6" :key="cell" />
        </OTPField>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="size"
            :items="sizes"
            label="Cell size"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="valid" label="Valid" />
          <PlaygroundSwitchControl v-model="readOnly" label="Read only" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Grouped cells</span>
        <code>OTPFieldSeparator</code>
      </div>
      <div class="specimen-row">
        <OTPField v-model="grouped" :max-length="6" size="md">
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldSeparator />
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
        </OTPField>
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Custom pattern</span>
        <code>[A-Za-z] · inputMode text</code>
      </div>
      <div class="specimen-row">
        <OTPField
          v-model="letters"
          input-mode="text"
          :max-length="4"
          pattern="[A-Za-z]"
          size="md"
        />
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Generated cells</span>
        <code>maxLength with no children</code>
      </div>
      <div class="specimen-row">
        <OTPField :max-length="4" :model-value="'12'" size="sm" />
      </div>
    </div>
  </CatalogSection>
</template>
