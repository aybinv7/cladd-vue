<script setup lang="ts">
import {
  Button,
  Sheet,
  SheetClose,
  SheetRoot,
  SheetTrigger,
  type SheetSide,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{ accent: Color; interactionsEnabled: boolean }>();

const side = ref<SheetSide>('inline-end');
const closeOnBackdropClick = ref(true);
const closeOnEscape = ref(true);
const dragToClose = ref(false);
const sides = ['inline-start', 'inline-end', 'top', 'bottom'] as const;

const code = computed(
  () => `<Sheet
  side="${side.value}"
  :close-on-backdrop-click="${closeOnBackdropClick.value}"
  :close-on-escape="${closeOnEscape.value}"
  :drag-to-close="${dragToClose.value}"
>
  <template #title>Project details</template>
  <template #description>Review settings without losing your place.</template>
  <p>A logical inline-end panel.</p>
  <template #footer="{ close }">
    <SheetClose><Button variant="transparent" @click="close">Close</Button></SheetClose>
  </template>
</Sheet>`,
);
</script>

<template>
  <CatalogSection
    description="A modal side panel that enters from any logical or physical edge, sharing Dialog's overlay lifecycle."
    eyebrow="Extension · Overlays"
    id="sheet"
    title="Sheet"
  >
    <ComponentPlayground :code="code">
      <template #preview>
        <SheetRoot>
          <SheetTrigger>
            <Button :disabled="!props.interactionsEnabled">Open sheet</Button>
          </SheetTrigger>
          <Sheet
            :close-on-backdrop-click="closeOnBackdropClick"
            :close-on-escape="closeOnEscape"
            :drag-to-close="dragToClose"
            :side="side"
          >
            <template #title>Project details</template>
            <template #description
              >Review settings without losing your place.</template
            >
            <p class="text-cladd-xs text-cladd-fg-soft">
              A logical inline-end panel.
            </p>
            <template #footer="{ close }">
              <SheetClose
                ><Button variant="transparent" @click="close"
                  >Close</Button
                ></SheetClose
              >
            </template>
          </Sheet>
        </SheetRoot>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented v-model="side" :items="sides" label="Side" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl
            v-model="closeOnBackdropClick"
            label="closeOnBackdropClick"
          />
          <PlaygroundSwitchControl
            v-model="closeOnEscape"
            label="closeOnEscape"
          />
          <PlaygroundSwitchControl v-model="dragToClose" label="dragToClose" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
