<script setup lang="ts">
import {
  CollapsibleIndicator,
  CollapsiblePanel,
  CollapsibleRoot,
  CollapsibleTrigger,
  Surface,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const open = ref(false);
const disabled = ref(false);
const keepMounted = ref(false);

const triggerClass =
  'flex w-full items-center justify-between gap-2 px-3 py-2.5 text-cladd-sm text-cladd-fg hover:bg-cladd-surface-hover data-[disabled]:opacity-50';

const code =
  '<CollapsibleRoot v-model:open="open" :disabled="disabled">\n  <CollapsibleTrigger>\n    <button class="flex w-full items-center justify-between">\n      Details\n      <CollapsibleIndicator>\n        <svg viewBox="0 0 16 16"><path d="m4 6 4 4 4-4" /></svg>\n      </CollapsibleIndicator>\n    </button>\n  </CollapsibleTrigger>\n  <CollapsiblePanel :keep-mounted="keepMounted">\n    <div>Collapsible content</div>\n  </CollapsiblePanel>\n</CollapsibleRoot>';
</script>

<template>
  <CatalogSection
    description="A single disclosure primitive — the same CollapsibleRoot/Trigger/Panel/Indicator that Accordion composes into a group."
    eyebrow="07 · Navigation"
    id="collapsible"
    title="Collapsible"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <Surface
          class="collapsible-card"
          content-class-name="collapsible-list"
          outline
          wrap-content
        >
          <CollapsibleRoot v-model:open="open" :disabled="disabled">
            <CollapsibleTrigger>
              <button
                :class="triggerClass"
                :disabled="!props.interactionsEnabled || disabled"
              >
                Details
                <CollapsibleIndicator class="collapsible-chevron">
                  <svg
                    class="size-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 16 16"
                  >
                    <path d="m4 6 4 4 4-4" />
                  </svg>
                </CollapsibleIndicator>
              </button>
            </CollapsibleTrigger>
            <CollapsiblePanel :keep-mounted="keepMounted">
              <div class="collapsible-body">
                Collapsible content — height animates and unmounts when closed
                unless keepMounted is true.
              </div>
            </CollapsiblePanel>
          </CollapsibleRoot>
        </Surface>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="open" label="open" />
          <PlaygroundSwitchControl v-model="disabled" label="disabled" />
          <PlaygroundSwitchControl v-model="keepMounted" label="keepMounted" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Uncontrolled</span>
        <code>defaultOpen</code>
      </div>
      <div class="specimen-row">
        <Surface
          class="collapsible-card"
          content-class-name="collapsible-list"
          outline
          wrap-content
        >
          <CollapsibleRoot default-open>
            <CollapsibleTrigger>
              <button
                :class="triggerClass"
                :disabled="!props.interactionsEnabled"
              >
                Uncontrolled open
              </button>
            </CollapsibleTrigger>
            <CollapsiblePanel>
              <div class="collapsible-body">Starts open without a binding.</div>
            </CollapsiblePanel>
          </CollapsibleRoot>
        </Surface>
      </div>
    </div>
  </CatalogSection>
</template>

<style scoped>
.collapsible-card {
  width: 320px;
  overflow: hidden;
  border-radius: 24px;
}

.collapsible-list {
  display: flex;
  flex-direction: column;
}

.collapsible-chevron {
  flex-shrink: 0;
  color: var(--cladd-fg-soft);
  transform: rotate(-90deg);
  transition: transform 0.2s ease-out;
}

.collapsible-chevron[data-open] {
  transform: rotate(0deg);
}

.collapsible-body {
  padding: 4px 12px 12px;
  color: var(--cladd-fg-soft);
  font-size: 12px;
}
</style>
