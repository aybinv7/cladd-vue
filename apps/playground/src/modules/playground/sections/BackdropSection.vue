<script setup lang="ts">
import { Backdrop, Button, Dialog, Spinner, Surface } from '@cladd-vue/ui';
import type { Color } from '@cladd-vue/ui';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const open = ref(false);
const transparent = ref(false);
const customOpen = ref(false);
const tintedOpen = ref(false);
const loading = ref(false);

const code = computed(
  () => `<Dialog
  v-model:open="open"
  :backdrop-transparent="${transparent.value}"
  title="Backdrop contract"
  text="Backdrop dims the app while an overlay is open."
>
  <template #trigger>
    <Button>Open dialog</Button>
  </template>
</Dialog>`,
);

const customCode = `<Button @click="customOpen = true">Show overlay</Button>
<Backdrop v-if="customOpen" @click="customOpen = false" />
<Surface outline class="fixed top-1/2 left-1/2 z-50 w-80 max-w-full -translate-x-1/2 -translate-y-1/2 rounded-cladd-dialog" content-class-name="flex flex-col gap-4 p-4">
  <h2 class="text-cladd-lg font-semibold">Custom overlay</h2>
  <p class="text-cladd-fg-soft">The card sits as a sibling of the backdrop. Click the dimmed area to dismiss.</p>
  <Button class="self-end" @click="customOpen = false">Close</Button>
</Surface>`;

function onCustomBackdropClick(event: MouseEvent): void {
  event.preventDefault();
  customOpen.value = false;
}

function onTintedBackdropClick(event: MouseEvent): void {
  event.preventDefault();
  tintedOpen.value = false;
}
</script>

<template>
  <CatalogSection
    description="The dim layer behind dialogs and popovers — shown through Dialog's backdrop contract and the standalone Backdrop primitive."
    eyebrow="05 · Overlays"
    id="backdrop"
    title="Backdrop"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <Dialog
          v-model:open="open"
          :backdrop-transparent="transparent"
          text="Backdrop dims the app while an overlay is open."
          title="Backdrop contract"
        >
          <template #trigger>
            <Button :disabled="!props.interactionsEnabled">Open dialog</Button>
          </template>
        </Dialog>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl
            v-model="transparent"
            label="transparent backdrop"
          />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <ComponentPlayground :code="customCode" preview-surface>
      <template #preview>
        <Button
          :disabled="!props.interactionsEnabled"
          @click="customOpen = true"
          >Show overlay</Button
        >
        <template v-if="customOpen">
          <Backdrop @click="onCustomBackdropClick" />
          <Surface
            outline
            class="fixed top-1/2 left-1/2 z-50 w-80 max-w-full -translate-x-1/2 -translate-y-1/2 rounded-cladd-dialog"
            content-class-name="flex flex-col gap-4 p-4"
          >
            <h2 class="text-cladd-lg font-semibold">Custom overlay</h2>
            <p class="text-cladd-fg-soft">
              The card sits as a sibling of the backdrop. Click the dimmed area
              to dismiss, or use the button below.
            </p>
            <Button class="self-end" @click="customOpen = false">Close</Button>
          </Surface>
        </template>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Loading scrim</span>
        <code>Backdrop · Spinner</code>
      </div>
      <div class="specimen-row">
        <Button
          :disabled="loading || !props.interactionsEnabled"
          @click="loading = true"
          >Run task</Button
        >
        <Button v-if="loading" variant="transparent" @click="loading = false"
          >Cancel</Button
        >
        <Backdrop
          v-if="loading"
          class="flex items-center justify-center gap-4"
          @click="loading = false"
        >
          <Spinner color="brand" size="lg" />
          <span class="text-cladd-fg">Working…</span>
        </Backdrop>
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Tinted backdrop</span>
        <code>bg-cladd-primary/30 · backdrop-blur-sm</code>
      </div>
      <div class="specimen-row">
        <Button
          :disabled="!props.interactionsEnabled"
          @click="tintedOpen = true"
          >Show tinted backdrop</Button
        >
        <Backdrop
          v-if="tintedOpen"
          class="bg-cladd-primary/30 backdrop-blur-sm"
          @click="onTintedBackdropClick"
        />
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Standalone primitive</span>
        <code>Backdrop</code>
      </div>
      <p class="playground-hint">
        Backdrop is also exported as a standalone primitive — dialogs, popovers
        and popups render it internally with the same backdrop and
        backdrop-transparent contracts. Clicking the dimmed area calls
        <code>event.preventDefault()</code> before closing to avoid
        <code>html { scroll-behavior: smooth }</code> scrolling the main page.
      </p>
    </div>
  </CatalogSection>
</template>
