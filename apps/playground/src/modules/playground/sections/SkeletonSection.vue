<script setup lang="ts">
import { Skeleton } from 'cladd-vue';
import type { Color } from 'cladd-vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';

defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

const code = `<Skeleton class="h-4 w-3/4" />
<Skeleton class="h-4 w-1/2" />
<Skeleton class="h-20 w-full" />`;
</script>

<template>
  <CatalogSection
    description="A layout-preserving, aria-hidden loading placeholder using Tailwind's built-in animate-pulse, disabled under reduced motion."
    eyebrow="Extension · Feedback"
    id="skeleton"
    title="Skeleton"
  >
    <ComponentPlayground :code="code">
      <template #preview>
        <div class="flex w-64 flex-col gap-2">
          <Skeleton class="h-4 w-3/4" />
          <Skeleton class="h-4 w-1/2" />
          <Skeleton class="h-20 w-full" />
        </div>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
