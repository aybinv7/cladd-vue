<script setup lang="ts">
import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
  Button,
} from 'cladd-vue';
import type { AlertLive, AlertVariant, Color } from 'cladd-vue';
import { computed, defineComponent, h, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const WarningGlyph = defineComponent({
  name: 'WarningGlyph',
  render: () =>
    h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('circle', { cx: 10, cy: 10, r: 8 }),
    ]),
});

const variant = ref<AlertVariant>('destructive');
const live = ref<AlertLive>('assertive');
const showIcon = ref(true);

const variants = [
  'neutral',
  'information',
  'success',
  'warning',
  'destructive',
] as const;
const liveOptions = ['off', 'polite', 'assertive'] as const;

const copy: Record<AlertVariant, { description: string; title: string }> = {
  destructive: {
    description: 'Check your card details and try again.',
    title: 'Payment failed',
  },
  information: {
    description: 'Refresh to pick up the latest changes.',
    title: 'New version available',
  },
  neutral: {
    description: 'You can safely dismiss this message.',
    title: 'No action needed',
  },
  success: {
    description: 'Your changes have been saved.',
    title: 'Changes saved',
  },
  warning: {
    description: 'This action cannot be undone once confirmed.',
    title: 'Review before continuing',
  },
};

const activeCopy = computed(() => copy[variant.value]);

const code = computed(
  () => `<Alert
  variant="${variant.value}"
  live="${live.value}"
  ${showIcon.value ? ':icon="WarningGlyph"' : ''}
>
  <AlertTitle>${activeCopy.value.title}</AlertTitle>
  <AlertDescription>${activeCopy.value.description}</AlertDescription>
  <AlertActions>
    <Button size="xs">Retry</Button>
  </AlertActions>
</Alert>`,
);
</script>

<template>
  <CatalogSection
    description="A passive status region styled after Toast's surface/icon/copy treatment; status is never carried by color alone."
    eyebrow="Extension · Feedback"
    id="alert"
    title="Alert"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <Alert
          :icon="showIcon ? WarningGlyph : undefined"
          :live="live"
          :variant="variant"
        >
          <AlertTitle>{{ activeCopy.title }}</AlertTitle>
          <AlertDescription>{{ activeCopy.description }}</AlertDescription>
          <AlertActions>
            <Button :disabled="!props.interactionsEnabled" size="xs"
              >Retry</Button
            >
          </AlertActions>
        </Alert>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="variant"
            :items="variants"
            label="Alert variant"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="live"
            :items="liveOptions"
            label="Alert live"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="showIcon" label="showIcon" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
