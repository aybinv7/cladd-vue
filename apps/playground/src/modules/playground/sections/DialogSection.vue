<script setup lang="ts">
import { Button, Dialog } from '@cladd-vue/ui';
import type { Color } from '@cladd-vue/ui';
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

const color = ref<Color>('neutral');
const open = ref(false);
const confirm = ref(false);
const lazy = ref(false);
const transparentBackdrop = ref(false);
const stopPropagationOnClick = ref(false);

const code = computed(
  () => `<Dialog
  v-model:open="open"
  color="${color.value}"
  ${confirm.value ? 'require-confirm-text="Disconnect"' : ':require-confirm-text="undefined"'}
  :backdrop-transparent="${transparentBackdrop.value}"
  :lazy="${lazy.value}"
  :stop-propagation-on-click="${stopPropagationOnClick.value}"
  title="Disconnect WebView?"
  text="The target can be attached again without losing its stored inspection state."
>
  <template #trigger>
    <Button>Open dialog</Button>
  </template>
</Dialog>`,
);
</script>

<template>
  <CatalogSection
    description="A portalled dialog with focus management, dismissal and controlled state."
    eyebrow="05 · Overlays"
    id="dialog"
    title="Dialog"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <Dialog
          v-model:open="open"
          cancel-button-text="Keep attached"
          :color="color"
          confirm-button-text="Disconnect"
          :backdrop-transparent="transparentBackdrop"
          :lazy="lazy"
          :require-confirm-text="confirm ? 'Disconnect' : undefined"
          :stop-propagation-on-click="stopPropagationOnClick"
          text="The target can be attached again without losing its stored inspection state."
          title="Disconnect WebView?"
        >
          <template #trigger>
            <Button :disabled="!props.interactionsEnabled">Open dialog</Button>
          </template>
        </Dialog>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl
            v-model="confirm"
            label="confirmation action"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="lazy" label="lazy" />
          <PlaygroundSwitchControl
            v-model="transparentBackdrop"
            label="transparent backdrop"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl
            v-model="stopPropagationOnClick"
            label="stop propagation"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="color" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
