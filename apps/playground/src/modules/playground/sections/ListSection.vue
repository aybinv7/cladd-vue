<script setup lang="ts">
import {
  Chip,
  List,
  ListButton,
  ListItem,
  ListSeparator,
  ListTitle,
  SectionTitle,
  Surface,
} from '@cladd-vue/ui';
import type { Color } from '@cladd-vue/ui';
import { ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const selected = ref('inbox');

const code = `<List>
  <ListTitle>Workspace</ListTitle>
  <ListButton icon selected after="Chip 12">Inbox</ListButton>
  <ListButton icon>Drafts</ListButton>
  <ListButton icon>Archive</ListButton>
  <ListSeparator />
  <ListTitle>Storage</ListTitle>
  <ListItem>Used 4.2 / 10 GB</ListItem>
  <ListSeparator />
  <ListButton icon color="brand">New project</ListButton>
</List>`;
</script>

<template>
  <CatalogSection
    description="Vertical stacks for labels, separators, plain rows and action rows — the building blocks that Popover, Select and Dialog compose."
    eyebrow="03 · Data display"
    id="list"
    title="List"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <Surface class="list-card" outline>
          <List>
            <ListTitle>Workspace</ListTitle>
            <ListButton
              :disabled="!props.interactionsEnabled"
              :selected="selected === 'inbox'"
              @click="selected = 'inbox'"
            >
              <template #after>
                <Chip color="brand" size="sm">12</Chip>
              </template>
              Inbox
            </ListButton>
            <ListButton
              :disabled="!props.interactionsEnabled"
              :selected="selected === 'drafts'"
              @click="selected = 'drafts'"
            >
              Drafts
            </ListButton>
            <ListButton
              :disabled="!props.interactionsEnabled"
              :selected="selected === 'archive'"
              @click="selected = 'archive'"
            >
              Archive
            </ListButton>
            <ListSeparator />
            <ListTitle>Storage</ListTitle>
            <ListItem>
              <span class="text-cladd-fg-soft">Used</span>
              <span class="ml-auto font-mono">4.2 / 10 GB</span>
            </ListItem>
            <ListSeparator />
            <ListButton :disabled="!props.interactionsEnabled" color="brand"
              >New project</ListButton
            >
          </List>
        </Surface>
      </template>
    </ComponentPlayground>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>With icon</span>
        <code>ListButton icon</code>
      </div>
      <Surface class="list-card list-card--narrow" outline>
        <List>
          <ListButton :disabled="!props.interactionsEnabled"
            >New file</ListButton
          >
          <ListButton :disabled="!props.interactionsEnabled"
            >Duplicate</ListButton
          >
          <ListButton :disabled="!props.interactionsEnabled"
            >Mark as done</ListButton
          >
        </List>
      </Surface>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Header, footer &amp; after</span>
        <code>header · footer · after · Chip</code>
      </div>
      <Surface class="list-card list-card--wide" outline>
        <List>
          <ListButton
            :disabled="!props.interactionsEnabled"
            footer="Reviewed by 3 people"
            header="Today, 09:14"
          >
            <template #after>
              <Chip color="green" size="sm">Done</Chip>
            </template>
            Ship onboarding redesign
          </ListButton>
          <ListButton
            :disabled="!props.interactionsEnabled"
            footer="Owner: Anna"
            header="Yesterday, 17:32"
          >
            <template #after>
              <Chip color="yellow" size="sm">In review</Chip>
            </template>
            Migrate billing webhooks
          </ListButton>
          <ListButton
            :disabled="!props.interactionsEnabled"
            footer="No assignee yet"
            header="2 days ago"
          >
            <template #after>
              <Chip color="neutral" size="sm">Backlog</Chip>
            </template>
            Draft Q3 retrospective notes
          </ListButton>
        </List>
      </Surface>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Selected &amp; color</span>
        <code>selected · color</code>
      </div>
      <Surface class="list-card list-card--narrow" outline>
        <List>
          <ListButton :disabled="!props.interactionsEnabled"
            >Duplicate</ListButton
          >
          <ListButton
            :disabled="!props.interactionsEnabled"
            color="brand"
            selected
            >Add to favorites</ListButton
          >
          <ListSeparator />
          <ListButton :disabled="!props.interactionsEnabled" color="red"
            >Delete project</ListButton
          >
        </List>
      </Surface>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Static info rows</span>
        <code>SectionTitle · ListTitle · ListItem · Separator</code>
      </div>
      <Surface class="list-card list-card--narrow" outline>
        <List>
          <SectionTitle class="px-2 pt-2">Account</SectionTitle>
          <ListTitle>Account</ListTitle>
          <ListItem>
            <span class="text-cladd-fg-soft">Plan</span>
            <span class="ml-auto"
              ><Chip color="brand" size="sm">Pro</Chip></span
            >
          </ListItem>
          <ListItem>
            <span class="text-cladd-fg-soft">Seats</span>
            <span class="ml-auto font-mono">8 / 10</span>
          </ListItem>
          <ListItem>
            <span class="text-cladd-fg-soft">Renews</span>
            <span class="ml-auto">May 24, 2026</span>
          </ListItem>
          <ListSeparator />
          <ListButton :disabled="!props.interactionsEnabled"
            >Manage billing</ListButton
          >
        </List>
      </Surface>
    </div>

    <div class="specimen-group">
      <div class="specimen-label">
        <span>Sizes</span>
        <code>2xs · xs · sm · md · lg · xl · 2xl</code>
      </div>
      <Surface class="list-card list-card--narrow" outline>
        <List>
          <ListButton :disabled="!props.interactionsEnabled" size="lg" selected
            >Inbox</ListButton
          >
          <ListButton :disabled="!props.interactionsEnabled" size="lg"
            >Drafts</ListButton
          >
          <ListButton :disabled="!props.interactionsEnabled" size="lg"
            >Archive</ListButton
          >
        </List>
      </Surface>
    </div>
  </CatalogSection>
</template>

<style scoped>
.list-card {
  width: 280px;
  border-radius: 24px;
  overflow: hidden;
}

.list-card--narrow {
  width: 240px;
}

.list-card--wide {
  width: 320px;
}

.list-specimens {
  align-items: flex-start;
  gap: 24px;
}
</style>
