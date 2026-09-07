<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogRoot,
  AlertDialogTrigger,
  Button,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundColorControl from '../components/PlaygroundColorControl.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{ accent: Color; interactionsEnabled: boolean }>();

const closeOnBackdropClick = ref(false);
const dangerColor = ref<Color>('red');

const code = computed(
  () => `<AlertDialog
  title="Delete this project?"
  text="This deletes the project and its local settings."
  cancel-button-text="Cancel"
  confirm-button-text="Delete"
  :close-on-backdrop-click="${closeOnBackdropClick.value}"
/>`,
);
</script>

<template>
  <CatalogSection
    description='A destructive-confirmation dialog: role="alertdialog", and the least-destructive action is focused first.'
    eyebrow="Extension · Overlays"
    id="alert-dialog"
    title="Alert Dialog"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <AlertDialogRoot>
          <AlertDialogTrigger>
            <Button :color="dangerColor" :disabled="!props.interactionsEnabled"
              >Delete project</Button
            >
          </AlertDialogTrigger>
          <AlertDialog
            cancel-button-text="Cancel"
            :close-on-backdrop-click="closeOnBackdropClick"
            confirm-button-text="Delete"
            text="This deletes the project and its local settings."
            title="Delete this project?"
          />
        </AlertDialogRoot>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl
            v-model="closeOnBackdropClick"
            label="closeOnBackdropClick"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="dangerColor" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
