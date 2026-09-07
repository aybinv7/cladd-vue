<script setup lang="ts">
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerRoot,
  DrawerTrigger,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{ accent: Color; interactionsEnabled: boolean }>();

const dragToClose = ref(false);
const closeOnBackdropClick = ref(true);

const code = computed(
  () => `<Drawer
  :drag-to-close="${dragToClose.value}"
  :close-on-backdrop-click="${closeOnBackdropClick.value}"
>
  <template #title>Quick actions</template>
  <template #description>Bottom-oriented mobile panel.</template>
  <DrawerClose><Button variant="transparent">Cancel</Button></DrawerClose>
  <DrawerClose><Button>Save changes</Button></DrawerClose>
</Drawer>`,
);
</script>

<template>
  <CatalogSection
    description="A bottom-oriented, touch-aware mobile panel with optional drag-to-close, sharing Sheet's overlay lifecycle."
    eyebrow="Extension · Overlays"
    id="drawer"
    title="Drawer"
  >
    <ComponentPlayground :code="code">
      <template #preview>
        <DrawerRoot>
          <DrawerTrigger>
            <Button :disabled="!props.interactionsEnabled" variant="transparent"
              >Open drawer</Button
            >
          </DrawerTrigger>
          <Drawer
            :close-on-backdrop-click="closeOnBackdropClick"
            :drag-to-close="dragToClose"
          >
            <template #title>Quick actions</template>
            <template #description>Bottom-oriented mobile panel.</template>
            <div class="flex gap-2">
              <DrawerClose
                ><Button variant="transparent">Cancel</Button></DrawerClose
              >
              <DrawerClose><Button>Save changes</Button></DrawerClose>
            </div>
          </Drawer>
        </DrawerRoot>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="dragToClose" label="dragToClose" />
          <PlaygroundSwitchControl
            v-model="closeOnBackdropClick"
            label="closeOnBackdropClick"
          />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
