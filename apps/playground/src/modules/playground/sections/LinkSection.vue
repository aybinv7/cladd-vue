<script setup lang="ts">
import { Link } from '@cladd-vue/ui';
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

const color = ref<Color>('brand');
const asAnchor = ref(false);
const disabled = ref(false);
const readOnly = ref(false);

const code = computed(
  () => `<Link
  color="${color.value}"${asAnchor.value ? '\n  href="#anchor"' : ''}
  ${disabled.value ? 'disabled' : ':disabled="false"'}
>
  Open the target
</Link>`,
);
</script>

<template>
  <CatalogSection
    description="A text-weight action that renders as a button by default and switches to an anchor the moment it is given an href."
    eyebrow="02 · Action"
    id="link"
    title="Link"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <Link
          :color="color"
          :disabled="disabled || !props.interactionsEnabled"
          :href="asAnchor ? '#anchor' : undefined"
          :read-only="readOnly"
        >
          Open the target
        </Link>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl
            v-model="asAnchor"
            label="Render as anchor"
          />
          <PlaygroundSwitchControl v-model="disabled" label="Disabled" />
          <PlaygroundSwitchControl v-model="readOnly" label="Read only" />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundColorControl v-model="color" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Polymorphic root</span>
        <code>href switches button → a</code>
      </div>
      <div class="specimen-row">
        <Link color="brand">Inline action</Link>
        <Link color="cyan" href="#anchor">Follow the link</Link>
      </div>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Inactive states</span>
        <code>disabled · readOnly</code>
      </div>
      <div class="specimen-row">
        <Link color="brand" disabled>Unavailable</Link>
        <Link color="brand" read-only>Locked</Link>
      </div>
    </div>
  </CatalogSection>
</template>
