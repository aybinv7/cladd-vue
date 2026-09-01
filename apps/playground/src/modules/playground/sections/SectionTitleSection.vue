<script setup lang="ts">
import {
  List,
  ListButton,
  ListItem,
  ListSeparator,
  SectionTitle,
  Surface,
} from '@cladd-vue/ui';
import type { Color } from '@cladd-vue/ui';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const code = `<List>
  <SectionTitle>Navigation</SectionTitle>
  <ListItem>Overview</ListItem>
  <ListButton>Targets</ListButton>
  <ListSeparator />
  <SectionTitle>Settings</SectionTitle>
  <ListItem>Appearance</ListItem>
</List>`;
</script>

<template>
  <CatalogSection
    description="Eyebrow-styled headers that sit above a List to label each group — lighter than ListTitle and without list padding."
    eyebrow="03 · Data display"
    id="section-title"
    title="Section title"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <Surface class="section-title-card" outline>
          <List>
            <SectionTitle>Navigation</SectionTitle>
            <ListItem>Overview</ListItem>
            <ListButton :disabled="!props.interactionsEnabled" size="md"
              >Targets</ListButton
            >
            <ListSeparator />
            <SectionTitle>Settings</SectionTitle>
            <ListItem>Appearance</ListItem>
            <ListItem>Shortcuts</ListItem>
          </List>
        </Surface>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>With list groups</span>
        <code>SectionTitle · List · ListTitle</code>
      </div>
      <div class="specimen-row section-title-specimens">
        <Surface class="section-title-card section-title-card--narrow" outline>
          <List>
            <SectionTitle>Recent searches</SectionTitle>
            <ListItem>orders --tab drafts</ListItem>
            <ListItem>port forwarding</ListItem>
            <ListSeparator />
            <SectionTitle>Favorites</SectionTitle>
            <ListButton size="md">Presalio · Orders</ListButton>
          </List>
        </Surface>
      </div>
    </div>
  </CatalogSection>
</template>

<style scoped>
.section-title-card {
  width: 280px;
  border-radius: 24px;
  overflow: hidden;
}

.section-title-card--narrow {
  width: 260px;
}

.section-title-specimens {
  gap: 24px;
  align-items: flex-start;
}
</style>
