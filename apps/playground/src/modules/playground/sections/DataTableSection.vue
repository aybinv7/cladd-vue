<script setup lang="ts">
import {
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/vue-table';
import {
  Checkbox,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'cladd-vue';
import type { Color } from 'cladd-vue';
import { computed, h, ref } from 'vue';

import CatalogSection from '../components/CatalogSection.vue';
import ComponentPlayground from '../components/ComponentPlayground.vue';

defineProps<{ accent: Color; interactionsEnabled: boolean }>();

interface Person {
  id: number;
  name: string;
  role: string;
  commits: number;
}

const people: Person[] = [
  { commits: 128, id: 1, name: 'Ada Lovelace', role: 'Engineer' },
  { commits: 96, id: 2, name: 'Grace Hopper', role: 'Reviewer' },
  { commits: 54, id: 3, name: 'Alan Kay', role: 'Designer' },
  { commits: 211, id: 4, name: 'Barbara Liskov', role: 'Engineer' },
  { commits: 33, id: 5, name: 'Katherine Johnson', role: 'Analyst' },
  { commits: 77, id: 6, name: 'Margaret Hamilton', role: 'Engineer' },
  { commits: 18, id: 7, name: 'Radia Perlman', role: 'Reviewer' },
  { commits: 142, id: 8, name: 'Edsger Dijkstra', role: 'Designer' },
];

const sorting = ref<SortingState>([]);
const rowSelection = ref<RowSelectionState>({});
const pagination = ref<PaginationState>({ pageIndex: 0, pageSize: 4 });

const columnHelper = createColumnHelper<Person>();
const columns = [
  columnHelper.display({
    cell: ({ row }) =>
      h(Checkbox, {
        'aria-label': `Select ${row.original.name}`,
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': () => row.toggleSelected(),
      }),
    header: ({ table }) =>
      h(Checkbox, {
        'aria-label': 'Select all rows on this page',
        modelValue: table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': () => table.toggleAllPageRowsSelected(),
      }),
    id: 'select',
  }),
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('role', { header: 'Role' }),
  columnHelper.accessor('commits', { header: 'Commits' }),
];

const table = useVueTable({
  columns,
  get data() {
    return people;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onPaginationChange: (updater) => {
    pagination.value =
      typeof updater === 'function' ? updater(pagination.value) : updater;
  },
  onRowSelectionChange: (updater) => {
    rowSelection.value =
      typeof updater === 'function' ? updater(rowSelection.value) : updater;
  },
  onSortingChange: (updater) => {
    sorting.value =
      typeof updater === 'function' ? updater(sorting.value) : updater;
  },
  state: {
    get pagination() {
      return pagination.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get sorting() {
      return sorting.value;
    },
  },
});

const selectedCount = computed(() => Object.keys(rowSelection.value).length);
const pageLinks = computed(() =>
  Array.from({ length: table.getPageCount() }, (_, index) => index),
);

const code = `const columnHelper = createColumnHelper<Person>()
const columns = [
  columnHelper.display({ id: 'select', /* row-selection Checkbox */ }),
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('role', { header: 'Role' }),
  columnHelper.accessor('commits', { header: 'Commits' }),
]

const table = useVueTable({
  columns,
  get data() { return people },
  state: { get sorting() { return sorting.value }, ... },
  onSortingChange: (updater) => { sorting.value = ... },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})

// Render through Cladd's own Table/TableHead/TableRow/TableCell —
// TanStack owns state and row models only, never the DOM.`;
</script>

<template>
  <CatalogSection
    description="TanStack Table drives sorting, pagination, and row-selection state; Cladd's own Table primitives own every rendered element."
    eyebrow="Extension · Data"
    id="data-table"
    title="Data table (TanStack Table)"
  >
    <ComponentPlayground :code="code">
      <template #preview>
        <div class="flex w-full flex-col gap-3">
          <Table class="w-full">
            <TableCaption
              >{{ selectedCount }} of {{ people.length }} rows
              selected.</TableCaption
            >
            <TableHeader>
              <TableRow
                v-for="headerGroup in table.getHeaderGroups()"
                :key="headerGroup.id"
              >
                <TableHead
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  :numeric="header.column.id === 'commits'"
                  :sortable="header.column.getCanSort()"
                  :sort-direction="
                    header.column.getIsSorted() === 'asc'
                      ? 'asc'
                      : header.column.getIsSorted() === 'desc'
                        ? 'desc'
                        : 'none'
                  "
                  @sort="header.column.toggleSorting()"
                >
                  <FlexRender
                    :props="header.getContext()"
                    :render="header.column.columnDef.header"
                  />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                :selected="row.getIsSelected()"
              >
                <TableCell
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                  :numeric="cell.column.id === 'commits'"
                >
                  <FlexRender
                    :props="cell.getContext()"
                    :render="cell.column.columnDef.cell"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  :disabled="
                    !table.getCanPreviousPage() || !interactionsEnabled
                  "
                  href="#"
                  @click.prevent="table.previousPage()"
                />
              </PaginationItem>
              <PaginationItem v-for="page in pageLinks" :key="page">
                <PaginationLink
                  :active="table.getState().pagination.pageIndex === page"
                  :disabled="!interactionsEnabled"
                  href="#"
                  @click.prevent="table.setPageIndex(page)"
                  >{{ page + 1 }}</PaginationLink
                >
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  :disabled="!table.getCanNextPage() || !interactionsEnabled"
                  href="#"
                  @click.prevent="table.nextPage()"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </template>
    </ComponentPlayground>
  </CatalogSection>
</template>
