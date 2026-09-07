<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
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

const navLabel = ref('Breadcrumb');
const showEllipsis = ref(true);

const code = computed(
  () => `<Breadcrumb label="${navLabel.value}">
  <BreadcrumbItem>
    <BreadcrumbLink href="/workspace">Workspace</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="/workspace/reports">Reports</BreadcrumbLink>
  </BreadcrumbItem>${
    showEllipsis.value
      ? `
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbEllipsis />
  </BreadcrumbItem>`
      : ''
  }
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbPage>Q3 summary</BreadcrumbPage>
  </BreadcrumbItem>
</Breadcrumb>`,
);
</script>

<template>
  <CatalogSection
    description='Router-agnostic hierarchical location trail with a semantic `nav` landmark and `aria-current="page"`.'
    eyebrow="Extension · Navigation"
    id="breadcrumb"
    title="Breadcrumb"
  >
    <ComponentPlayground :code="code">
      <template #preview>
        <Breadcrumb :label="navLabel">
          <BreadcrumbItem>
            <BreadcrumbLink
              :disabled="!props.interactionsEnabled"
              href="#"
              @click.prevent
              >Workspace</BreadcrumbLink
            >
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              :disabled="!props.interactionsEnabled"
              href="#"
              @click.prevent
              >Reports</BreadcrumbLink
            >
          </BreadcrumbItem>
          <template v-if="showEllipsis">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </template>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Q3 summary</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl
            v-model="showEllipsis"
            label="showEllipsis"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <label>
            nav label
            <input
              v-model="navLabel"
              :disabled="!props.interactionsEnabled"
              type="text"
            />
          </label>
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
