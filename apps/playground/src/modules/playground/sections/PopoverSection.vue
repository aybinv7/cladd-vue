<script setup lang="ts">
import {
  Button,
  List,
  ListButton,
  ListSeparator,
  ListTitle,
  NumberField,
  Popover,
  PopoverClose,
  PopoverRoot,
  PopoverTrigger,
} from '@cladd-vue/ui';
import type { Color, PopoverPosition } from '@cladd-vue/ui';
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

const popoverOpen = ref(false);
const popoverPosition = ref<PopoverPosition>('bottom');
const popoverBackdrop = ref(false);
const popoverBackdropTransparent = ref(false);
const popoverLazy = ref(false);
const popoverViewportMargin = ref(4);

const popoverPositions = [
  'top-start',
  'top',
  'top-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
  'right-start',
  'right',
  'right-end',
  'center',
] as const;

const target = {
  host: 'localhost:5175',
  title: 'Presalio · Orders',
  url: '/orders?tab=drafts',
};

const popoverCode = computed(
  () => `<Popover
  v-model:open="popoverOpen"
  position="${popoverPosition.value}"
  :backdrop="${popoverBackdrop.value}"
  :backdrop-transparent="${popoverBackdropTransparent.value}"
  :lazy="${popoverLazy.value}"
  :viewport-margin="${popoverViewportMargin.value}"
  class="w-56"
>
  <template #trigger>
    <Button>Open popover</Button>
  </template>
  <template #default="{ close }">
    <List>
      <ListTitle>Target</ListTitle>
      <ListButton :header="target.host" :footer="target.url" @click="close">
        {{ target.title }}
      </ListButton>
      <ListSeparator />
      <ListButton size="md" @click="close">Reload</ListButton>
      <ListButton size="md" color="red" @click="close">Detach</ListButton>
    </List>
  </template>
</Popover>`,
);

const popoverRootCode = `<PopoverRoot>
  <PopoverTrigger>
    <Button>Target actions</Button>
  </PopoverTrigger>
  <Popover position="bottom-start" class="w-56">
    <List>
      <ListTitle>Storage</ListTitle>
      <PopoverClose>
        <ListButton size="md">Clear IndexedDB</ListButton>
      </PopoverClose>
      <PopoverClose>
        <ListButton size="md">Clear Cache API</ListButton>
      </PopoverClose>
    </List>
  </Popover>
</PopoverRoot>`;
</script>

<template>
  <CatalogSection
    description="A portalled anchored panel — controlled via v-model:open, or composed from PopoverRoot/PopoverTrigger/PopoverClose when the caller doesn't need to own the open state."
    eyebrow="05 · Overlays"
    id="popover"
    title="Popover"
  >
    <ComponentPlayground :code="popoverCode" preview-surface>
      <template #preview>
        <Popover
          v-model:open="popoverOpen"
          :backdrop="popoverBackdrop"
          :backdrop-transparent="popoverBackdropTransparent"
          class="w-56"
          :lazy="popoverLazy"
          :position="popoverPosition"
          :viewport-margin="popoverViewportMargin"
        >
          <template #trigger>
            <Button :disabled="!props.interactionsEnabled">Open popover</Button>
          </template>
          <template #default="{ close }">
            <List>
              <ListTitle>Target</ListTitle>
              <ListButton
                :footer="target.url"
                :header="target.host"
                @click="close"
              >
                {{ target.title }}
              </ListButton>
              <ListSeparator />
              <ListButton size="md" @click="close">Reload</ListButton>
              <ListButton color="red" size="md" @click="close"
                >Detach</ListButton
              >
            </List>
          </template>
        </Popover>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="popoverPosition"
            :items="popoverPositions"
            label="Popover position"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="popoverBackdrop" label="backdrop" />
          <PlaygroundSwitchControl
            v-model="popoverBackdropTransparent"
            label="transparent"
          />
          <PlaygroundSwitchControl v-model="popoverLazy" label="lazy" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <NumberField
            v-model="popoverViewportMargin"
            aria-label="Viewport margin"
            :max="32"
            :min="0"
            :step="1"
          />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <ComponentPlayground :code="popoverRootCode" preview-surface>
      <template #preview>
        <PopoverRoot>
          <PopoverTrigger>
            <Button :disabled="!props.interactionsEnabled"
              >Target actions</Button
            >
          </PopoverTrigger>
          <Popover class="w-56" position="bottom-start">
            <List>
              <ListTitle>Storage</ListTitle>
              <PopoverClose>
                <ListButton size="md">Clear IndexedDB</ListButton>
              </PopoverClose>
              <PopoverClose>
                <ListButton size="md">Clear Cache API</ListButton>
              </PopoverClose>
            </List>
          </Popover>
        </PopoverRoot>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
