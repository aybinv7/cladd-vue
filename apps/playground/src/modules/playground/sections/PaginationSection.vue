<script setup lang="ts">
import {
  NumberField,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{ accent: Color; interactionsEnabled: boolean }>();

const totalPages = 9;
const page = ref(3);

function goTo(next: number): void {
  if (!props.interactionsEnabled) return;
  page.value = Math.min(Math.max(next, 1), totalPages);
}

const isFirst = computed(() => page.value <= 1);
const isLast = computed(() => page.value >= totalPages);
const visiblePages = computed(() => [...new Set([1, page.value, totalPages])]);

const code = computed(
  () => `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious :disabled="${isFirst.value}" /></PaginationItem>
    ${visiblePages.value
      .map(
        (candidate) =>
          `<PaginationItem><PaginationLink :active="${candidate === page.value}">${candidate}</PaginationLink></PaginationItem>`,
      )
      .join('\n    ')}
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext :disabled="${isLast.value}" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
);
</script>

<template>
  <CatalogSection
    description="Controlled result-set navigation; the package renders links and disabled state, the consumer owns page number and fetching."
    eyebrow="Extension · Navigation"
    id="pagination"
    title="Pagination"
  >
    <ComponentPlayground :code="code">
      <template #preview>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                :disabled="isFirst || !interactionsEnabled"
                href="#"
                @click.prevent="goTo(page - 1)"
              />
            </PaginationItem>
            <PaginationItem v-for="candidate in visiblePages" :key="candidate">
              <PaginationLink
                :active="candidate === page"
                :disabled="!interactionsEnabled"
                href="#"
                @click.prevent="goTo(candidate)"
                >{{ candidate }}</PaginationLink
              >
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                :disabled="isLast || !interactionsEnabled"
                href="#"
                @click.prevent="goTo(page + 1)"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <NumberField
            v-model="page"
            aria-label="Current page"
            :disabled="!interactionsEnabled"
            :max="totalPages"
            :min="1"
            :step="1"
          />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
