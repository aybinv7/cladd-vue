<script setup lang="ts">
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';

const props = defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const code = `<Empty class="rounded-cladd-dialog border border-cladd-outline">
  <EmptyHeader>
    <EmptyMedia>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2Z" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </EmptyMedia>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>Create your first project to get started.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button size="xs">New project</Button>
  </EmptyContent>
</Empty>`;
</script>

<template>
  <CatalogSection
    description="The shared shape for a no-data, no-results, or first-run state; the package supplies zero built-in copy or iconography."
    eyebrow="Extension · Feedback"
    id="empty"
    title="Empty"
  >
    <ComponentPlayground :code="code" preview-surface>
      <template #preview>
        <Empty class="rounded-cladd-dialog border border-cladd-outline">
          <EmptyHeader>
            <EmptyMedia>
              <svg
                fill="none"
                height="32"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                width="32"
              >
                <path
                  d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2Z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </EmptyMedia>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription
              >Create your first project to get started.</EmptyDescription
            >
          </EmptyHeader>
          <EmptyContent>
            <Button :disabled="!props.interactionsEnabled" size="xs"
              >New project</Button
            >
          </EmptyContent>
        </Empty>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
