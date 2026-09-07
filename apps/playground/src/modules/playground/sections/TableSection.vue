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
  type TableDensity,
} from 'cladd-vue';
import type { Color, TableSortState } from 'cladd-vue';
import { computed, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';
import PlaygroundSegmented from '../components/PlaygroundSegmented.vue';
import PlaygroundSwitchControl from '../components/PlaygroundSwitchControl.vue';
import PlaygroundToolbar from '../components/PlaygroundToolbar.vue';

const props = defineProps<{
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
const density = ref<TableDensity>('comfortable');
const densities = ['comfortable', 'compact'] as const;
const hoverable = ref(true);
const stickyHeader = ref(false);
const showEmpty = ref(false);

const visible = computed(() => {
  if (showEmpty.value) return [];
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

const code = computed(
  () => `<Table
  density="${density.value}"
  ${hoverable.value ? 'hoverable' : ':hoverable="false"'}
  ${stickyHeader.value ? 'sticky-header' : ':sticky-header="false"'}
>
  <TableCaption>Contributors sorted by the recipe state.</TableCaption>
  <TableHeader ${stickyHeader.value ? 'sticky' : ':sticky="false"'}>
    <TableRow>
      <TableHead sortable :sort-direction="sort.direction" @sort="toggleSort('name')">
        Name
      </TableHead>
      <TableHead>Role</TableHead>
      <TableHead sortable numeric @sort="toggleSort('commits')">Commits</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody :empty="${showEmpty.value}">
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
</Table>`,
);

function toggleSort(key: string): void {
  if (!props.interactionsEnabled) return;
  if (sort.value.key !== key || sort.value.direction === 'none') {
    sort.value = { direction: 'asc', key };
  } else if (sort.value.direction === 'asc') {
    sort.value = { direction: 'desc', key };
  } else {
    sort.value = { direction: 'none', key };
  }
}

function toggleSelect(id: number): void {
  if (!props.interactionsEnabled) return;
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
    <ComponentPlayground :code="code">
      <template #preview>
        <Table
          class="w-full"
          :density="density"
          :hoverable="hoverable"
          :sticky-header="stickyHeader"
        >
          <TableCaption>Contributors sorted by the recipe state.</TableCaption>
          <TableHeader :sticky="stickyHeader">
            <TableRow>
              <TableHead
                sortable
                :sort-direction="sort.key === 'name' ? sort.direction : 'none'"
                @sort="toggleSort('name')"
              >
                Name
              </TableHead>
              <TableHead>Role</TableHead>
              <TableHead
                numeric
                sortable
                :sort-direction="
                  sort.key === 'commits' ? sort.direction : 'none'
                "
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
      </template>
      <template #controls>
        <PlaygroundToolbar>
          <PlaygroundSegmented
            v-model="density"
            :items="densities"
            label="Density"
          />
        </PlaygroundToolbar>
        <PlaygroundToolbar>
          <PlaygroundSwitchControl v-model="hoverable" label="hoverable" />
          <PlaygroundSwitchControl
            v-model="stickyHeader"
            label="stickyHeader"
          />
          <PlaygroundSwitchControl v-model="showEmpty" label="showEmpty" />
        </PlaygroundToolbar>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
