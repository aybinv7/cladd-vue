<script setup lang="ts">
import {
  Button,
  List,
  ListButton,
  Popup,
  PopupClose,
  PopupRoot,
  PopupTrigger,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
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
const backdrop = ref(true);
const header = ref(true);
const closeButton = ref(true);

const code = computed(
  () => `<Popup
  v-model:open="open"
  :backdrop="${backdrop.value}"
  :header="${header.value}"
  :close-button="${closeButton.value}"
>
  <template #trigger>
    <Button>Open popup</Button>
  </template>
  Content
</Popup>`,
);

const rootCode = `<PopupRoot>
  <PopupTrigger>
    <Button>Open composed popup</Button>
  </PopupTrigger>
  <Popup>
    <List>
      <PopupClose><ListButton size="md">Close via PopupClose</ListButton></PopupClose>
    </List>
  </Popup>
</PopupRoot>`;
</script>

<template>
  <CatalogSection
    description="A full-viewport modal with header, backdrop and close-button contracts — controlled via v-model:open or composed through PopupRoot/Trigger/Close."
    eyebrow="05 · Overlays"
    id="popup"
    title="Popup"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <Popup
          v-model:open="open"
          :backdrop="backdrop"
          :close-button="closeButton"
          :header="header"
        >
          <template #trigger>
            <Button :disabled="!props.interactionsEnabled">Open popup</Button>
          </template>
          <template #headerLeft>
            <span class="popup-header-title">Popup title</span>
          </template>
          <div class="popup-body">
            <p>
              Popup stacks above the app with a dimmed backdrop. Header and
              close button are optional.
            </p>
            <List>
              <ListButton size="md" @click="open = false"
                >Close from slot</ListButton
              >
            </List>
          </div>
        </Popup>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="backdrop" label="backdrop" />
          <PlaygroundSwitchControl v-model="header" label="header" />
          <PlaygroundSwitchControl v-model="closeButton" label="closeButton" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <ComponentPlayground :code="rootCode" preview-surface>
      <template #preview>
        <PopupRoot>
          <PopupTrigger>
            <Button :disabled="!props.interactionsEnabled"
              >Open composed popup</Button
            >
          </PopupTrigger>
          <Popup>
            <template #headerLeft>
              <span class="popup-header-title">Composed popup</span>
            </template>
            <List>
              <PopupClose>
                <ListButton size="md">Close via PopupClose</ListButton>
              </PopupClose>
            </List>
          </Popup>
        </PopupRoot>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>

<style scoped>
.popup-header-title {
  font-size: 14px;
  font-weight: 600;
}

.popup-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 12px;
  color: var(--cladd-fg-soft);
}

.popup-body p {
  margin: 0;
}
</style>
