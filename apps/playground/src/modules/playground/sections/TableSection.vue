<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'cladd-vue';
import type { Color, TableSortState } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';

defineProps<{
  accent: Color;
  interactionsEnabled: boolean;
}>();

interface Person {
  id: number;
  name: string;
  role: string;
  commits: number;
}

const people = ref<Person[]>([
  { commits: 128, id: 1, name: 'Ada Lovelace', role: 'Engineer' },
  { commits: 96, id: 2, name: 'Grace Hopper', role: 'Reviewer' },
  { commits: 54, id: 3, name: 'Alan Kay', role: 'Designer' },
]);

const sort = ref<TableSortState>({ direction: 'none', key: 'name' });
const selected = ref<number[]>([2]);
const dense = ref(false);

const visible = computed(() => {
  const rows = [...people.value];
  if (sort.value.direction !== 'none') {
    const key = sort.value.key as 'commits' | 'name';
    rows.sort((a, b) => {
      const order = a[key] > b[key] ? 1 : -1;
      return sort.value.direction === 'asc' ? order : -order;
    });
  }
  return rows;
});

const total = computed(() =>
  people.value.reduce((sum, person) => sum + person.commits, 0),
);

function toggleSort(key: string): void {
  if (sort.value.key !== key || sort.value.direction === 'none') {
    sort.value = { direction: 'asc', key };
  } else if (sort.value.direction === 'asc') {
    sort.value = { direction: 'desc', key };
  } else {
    sort.value = { direction: 'none', key };
  }
}

function toggleSelect(id: number): void {
  selected.value = selected.value.includes(id)
    ? selected.value.filter((entry) => entry !== id)
    : [...selected.value, id];
}
</script>

<template>
  <CatalogSection
    description="Semantic table primitives with a consumer-owned sorting and selection recipe."
    eyebrow="05 · Data"
    title="Table"
  >
    <Table :dense="dense" hoverable sticky-header>
      <TableCaption>Contributors sorted by the recipe state.</TableCaption>
      <TableHeader sticky>
        <TableRow>
          <TableHead
            :sort-direction="sort.key === 'name' ? sort.direction : 'none'"
            @sort="toggleSort('name')"
          >
            Name
          </TableHead>
          <TableHead>Role</TableHead>
          <TableHead
            numeric
            :sort-direction="sort.key === 'commits' ? sort.direction : 'none'"
            @sort="toggleSort('commits')"
          >
            Commits
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody :empty="visible.length === 0">
        <template #empty>No contributors match.</template>
        <TableRow
          v-for="person in visible"
          :key="person.id"
          :selected="selected.includes(person.id)"
          @click="toggleSelect(person.id)"
        >
          <TableCell>{{ person.name }}</TableCell>
          <TableCell>{{ person.role }}</TableCell>
          <TableCell numeric>{{ person.commits }}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell />
          <TableCell numeric>{{ total }}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </CatalogSection>
</template>
