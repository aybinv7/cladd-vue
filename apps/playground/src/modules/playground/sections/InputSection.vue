<script setup lang="ts">
import { Chip, Input, Spinner } from '@cladd-vue/ui';
import type { Color, InputSize } from '@cladd-vue/ui';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundColorControl from '../components/PlaygroundColorControl.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
const size = ref<InputSize>('lg');
const color = ref<Color>('neutral');
const disabled = ref(false);
const readOnly = ref(false);
const rounded = ref(false);
const clearButton = ref(false);
const withIcon = ref(false);
const value = ref('Presalio');

const domain = ref('acme');
const amount = ref('1234.56');
const pending = ref(false);

const code = computed(
  () => `<Input
  v-model="value"
  color="${color.value}"
  placeholder="Enter name"
  size="${size.value}"
  ${rounded.value ? 'rounded' : ':rounded="false"'}
  ${clearButton.value ? 'clear-button' : ':clear-button="false"'}
  ${withIcon.value ? 'icon' : ':icon="undefined"'}
  ${disabled.value ? 'disabled' : ':disabled="false"'}
  ${readOnly.value ? 'read-only' : ':read-only="false"'}
/>`,
);

function setDisabled(next: boolean): void {
  disabled.value = next;
  if (next) readOnly.value = false;
}

function setReadOnly(next: boolean): void {
  readOnly.value = next;
  if (next) disabled.value = false;
}
</script>

<template>
  <CatalogSection
    description="Text entry with SurfaceCut geometry, per-size density, and the shared color and clear-button contracts."
    eyebrow="04 · Forms"
    id="input"
    title="Input"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <Input
          v-model="value"
          class="input-preview"
          :clear-button="clearButton"
          :color="color"
          :disabled="disabled || !props.interactionsEnabled"
          placeholder="Enter name"
          :read-only="readOnly"
          :rounded="rounded"
          :size="size"
          :info-message="!disabled && !readOnly ? 'Type to filter' : undefined"
        >
          <template v-if="withIcon" #icon>
            <span class="text-cladd-fg-softer">@</span>
          </template>
        </Input>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="size"
            :items="sizes"
            label="Input size"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl
            label="disabled"
            :model-value="disabled"
            @update:model-value="setDisabled"
          />
          <PlaygroundSwitchControl
            label="readOnly"
            :model-value="readOnly"
            @update:model-value="setReadOnly"
          />
          <PlaygroundSwitchControl v-model="rounded" label="rounded" />
          <PlaygroundSwitchControl v-model="clearButton" label="clearButton" />
          <PlaygroundSwitchControl v-model="withIcon" label="icon" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="color" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Sizes</span>
        <code>sm · md · lg · xl · 2xl</code>
      </div>
      <div class="specimen-row">
        <Input
          v-for="entry in sizes"
          :key="entry"
          :disabled="!props.interactionsEnabled"
          :model-value="entry"
          :size="entry"
          placeholder="Project name"
          class="input-specimen"
        />
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>With icon</span>
        <code>icon · size</code>
      </div>
      <div class="specimen-row">
        <Input
          :disabled="!props.interactionsEnabled"
          class="input-preview"
          model-value=""
          placeholder="you@example.com"
          type="email"
          size="lg"
        >
          <template #icon>
            <span class="text-cladd-fg-softer">@</span>
          </template>
        </Input>
        <Input
          :disabled="!props.interactionsEnabled"
          class="input-preview"
          model-value="hello@cladd.io"
          placeholder="you@example.com"
          type="email"
          size="lg"
        >
          <template #icon>
            <span class="text-cladd-fg-softer">@</span>
          </template>
        </Input>
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Prefix and suffix</span>
        <code>prefix · suffix · inputClassName</code>
      </div>
      <div class="specimen-row input-stack">
        <Input
          v-model="domain"
          class="input-preview"
          :disabled="!props.interactionsEnabled"
          placeholder="subdomain"
          size="lg"
          input-class-name="px-1"
        >
          <template #prefix>
            <span class="ml-2 text-cladd-fg-softer">https://</span>
          </template>
          <template #suffix>
            <span class="mr-2 text-cladd-fg-softer">.cladd.io</span>
          </template>
        </Input>
        <Input
          v-model="domain"
          class="input-preview"
          :disabled="!props.interactionsEnabled"
          placeholder="username"
          size="lg"
          input-class-name="pl-1"
        >
          <template #prefix>
            <span class="ml-2 text-cladd-fg-softer">@</span>
          </template>
          <template #suffix>
            <Spinner v-if="pending" class="mr-2" color="brand" size="sm" />
            <Chip v-else class="mr-2" color="green" size="sm">free</Chip>
          </template>
        </Input>
        <Input
          v-model="domain"
          class="input-preview"
          :disabled="!props.interactionsEnabled"
          placeholder="URL slug"
          input-class-name="pl-1"
        >
          <template #prefix>
            <span class="ml-2 text-cladd-fg-softer">cladd.io/</span>
          </template>
          <template #suffix>
            <Chip class="mr-2" color="green" size="sm">available</Chip>
          </template>
        </Input>
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Clear button</span>
        <code>clearButton · icon · placeholder="Search"</code>
      </div>
      <div class="specimen-row">
        <Input
          v-model="value"
          class="input-preview"
          :disabled="!props.interactionsEnabled"
          clear-button
          placeholder="Search"
          size="lg"
          @clear="value = ''"
        >
          <template #icon>
            <span class="text-cladd-fg-softer">#</span>
          </template>
        </Input>
        <Input
          class="input-preview"
          :disabled="!props.interactionsEnabled"
          clear-button
          model-value=""
          placeholder="Search"
          size="lg"
          @clear="() => {}"
        >
          <template #icon>
            <span class="text-cladd-fg-softer">#</span>
          </template>
        </Input>
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Display value</span>
        <code>displayValue · prefix</code>
      </div>
      <div class="specimen-row input-stack">
        <Input
          v-model="amount"
          class="input-preview"
          :disabled="!props.interactionsEnabled"
          input-class-name="text-right justify-end"
          type="number"
        >
          <template #prefix>
            <span class="ml-2 text-cladd-fg-softer">USD</span>
          </template>
          <template #displayValue>
            <span
              >${{
                Number(amount || 0).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })
              }}</span
            >
          </template>
        </Input>
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Validation</span>
        <code>valid · infoMessage · errorMessage</code>
      </div>
      <div class="specimen-row input-stack">
        <Input
          class="input-preview"
          :disabled="!props.interactionsEnabled"
          info-message="Visible to your team"
          model-value="Presalio"
          placeholder="Display name"
        />
        <Input
          class="input-preview"
          :disabled="!props.interactionsEnabled"
          :valid="false"
          error-message="Enter a valid email address"
          info-message="We’ll send a confirmation"
          model-value="not-an-email"
          placeholder="Email"
          type="email"
        />
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Disabled and read-only</span>
        <code>disabled · readOnly</code>
      </div>
      <div class="specimen-row">
        <Input
          class="input-preview"
          disabled
          model-value="acme-marketing"
          placeholder="Slug"
          input-class-name="pl-1"
        >
          <template #prefix>
            <span class="ml-2 text-cladd-fg-softer">cladd.io/</span>
          </template>
        </Input>
        <Input
          class="input-preview"
          model-value="acme-marketing"
          placeholder="Slug"
          read-only
          input-class-name="pl-1"
        >
          <template #prefix>
            <span class="ml-2 text-cladd-fg-softer">cladd.io/</span>
          </template>
        </Input>
      </div>
    </div>
  </CatalogSection>
</template>

<style scoped>
.input-preview {
  width: 280px;
}

.input-specimen {
  width: 96px;
}

.input-stack {
  flex-direction: column;
  align-items: flex-start;
}
</style>
