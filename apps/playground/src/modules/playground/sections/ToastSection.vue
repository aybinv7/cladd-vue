<script setup lang="ts">
import {
  Button,
  Toast,
  ToastClose,
  ToastRoot,
  ToastTrigger,
  useToast,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
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
const closeButton = ref(true);
const showToast = useToast();
const count = ref(0);

function triggerToast(): void {
  count.value += 1;
  showToast({
    color: color.value,
    closeButton: closeButton.value,
    text: `Toast ${count.value} — deterministic local example.`,
    title: 'Update saved',
  });
}

const imperativeCode = computed(
  () => `const toast = useToast()

function trigger() {
  toast({
    color: "${color.value}",
    title: "Update saved",
    text: "Your changes were stored.",
    closeButton: ${closeButton.value},
  })
}

<Button @click="trigger">Show toast</Button>`,
);

const declarativeCode = `<ToastRoot>
  <ToastTrigger>
    <Button>Toggle toast</Button>
  </ToastTrigger>
  <Toast title="Sync complete" text="All targets are up to date." />
</ToastRoot>`;
</script>

<template>
  <CatalogSection
    description="Stacking toasts at the viewport corner — imperative via useToast() or declarative via ToastRoot/Trigger/Close."
    eyebrow="06 · Feedback"
    id="toast"
    title="Toast"
  >
    <ComponentPlayground :code="imperativeCode" preview-surface>
      <template #preview>
        <Button :disabled="!props.interactionsEnabled" @click="triggerToast"
          >Show toast</Button
        >
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="closeButton" label="closeButton" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="color" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <ComponentPlayground :code="declarativeCode" preview-surface>
      <template #preview>
        <ToastRoot>
          <ToastTrigger>
            <Button :disabled="!props.interactionsEnabled"
              >Toggle declarative toast</Button
            >
          </ToastTrigger>
          <Toast
            title="Sync complete"
            text="All targets are up to date."
            :color="color"
            :close-button="closeButton"
          >
            <ToastClose v-if="!closeButton">
              <Button size="xs" variant="transparent">Dismiss</Button>
            </ToastClose>
          </Toast>
        </ToastRoot>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Notes</span>
        <code>timeout · stacking · CladdProvider portal</code>
      </div>
      <p class="playground-hint">
        Imperative toasts auto-close after 5s and are rendered into the portal
        that CladdProvider mounts. Declarative toasts toggle via ToastRoot
        state. Up to three visible toasts stack with pure CSS.
      </p>
    </div>
  </CatalogSection>
</template>
