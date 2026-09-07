import { expect, test } from 'vite-plus/test';
import { defineComponent, h, nextTick, ref } from 'vue';

import Alert from '../../src/components/Alert.vue';
import AlertDialog from '../../src/components/AlertDialog.vue';
import AlertTitle from '../../src/components/AlertTitle.vue';
import ComboboxContent from '../../src/components/ComboboxContent.vue';
import ComboboxEmpty from '../../src/components/ComboboxEmpty.vue';
import ComboboxInput from '../../src/components/ComboboxInput.vue';
import ComboboxItem from '../../src/components/ComboboxItem.vue';
import ComboboxList from '../../src/components/ComboboxList.vue';
import ComboboxRoot from '../../src/components/ComboboxRoot.vue';
import DropdownMenuContent from '../../src/components/DropdownMenuContent.vue';
import DropdownMenuItem from '../../src/components/DropdownMenuItem.vue';
import DropdownMenuRoot from '../../src/components/DropdownMenuRoot.vue';
import DropdownMenuTrigger from '../../src/components/DropdownMenuTrigger.vue';
import Empty from '../../src/components/Empty.vue';
import EmptyTitle from '../../src/components/EmptyTitle.vue';
import Field from '../../src/components/Field.vue';
import FieldDescription from '../../src/components/FieldDescription.vue';
import FieldLabel from '../../src/components/FieldLabel.vue';
import PaginationLink from '../../src/components/PaginationLink.vue';
import Sheet from '../../src/components/Sheet.vue';
import SheetRoot from '../../src/components/SheetRoot.vue';
import Skeleton from '../../src/components/Skeleton.vue';
import Table from '../../src/components/Table.vue';
import TableBody from '../../src/components/TableBody.vue';
import TableCell from '../../src/components/TableCell.vue';
import TableRow from '../../src/components/TableRow.vue';
import { byTestId, click, mountTree } from '../support/mountTree.ts';

async function settle(): Promise<void> {
  await nextTick();
  await nextTick();
}

test('filterable table composes with pagination links and a row action menu', () => {
  const rows = [
    { id: 'a', name: 'Ada' },
    { id: 'b', name: 'Grace' },
  ];
  const selected = ref(new Set<string>());
  const { app, root } = mountTree(
    h('div', null, [
      h(Table, null, {
        default: () =>
          h(TableBody, null, {
            default: () =>
              rows.map((row) =>
                h(
                  TableRow,
                  { key: row.id, selected: selected.value.has(row.id) },
                  {
                    default: () => [
                      h(TableCell, null, { default: () => row.name }),
                      h(TableCell, null, {
                        default: () =>
                          h(DropdownMenuRoot, null, {
                            default: () => [
                              h(
                                DropdownMenuTrigger,
                                { 'data-testid': `menu-${row.id}` },
                                () => 'Actions',
                              ),
                              h(DropdownMenuContent, null, {
                                default: () =>
                                  h(
                                    DropdownMenuItem,
                                    {
                                      'data-testid': `select-${row.id}`,
                                      onSelect: () =>
                                        (selected.value = new Set([
                                          ...selected.value,
                                          row.id,
                                        ])),
                                    },
                                    () => 'Select',
                                  ),
                              }),
                            ],
                          }),
                      }),
                    ],
                  },
                ),
              ),
          }),
      }),
      h(PaginationLink, { active: true, 'data-testid': 'page-1' }, () => '1'),
    ]),
  );

  expect(root.querySelectorAll('[data-slot="table-row"]')).toHaveLength(2);
  expect(byTestId(root, 'page-1').getAttribute('aria-current')).toBe('page');

  app.unmount();
  root.remove();
});

test('Field wraps an async-loading Combobox with wired label and description', async () => {
  const busy = ref(true);
  const query = ref('');
  const harness = defineComponent({
    setup() {
      return () =>
        h(Field, null, {
          default: () => [
            h(FieldLabel, null, () => 'Assignee'),
            h(
              FieldDescription,
              null,
              () => 'Loaded from the workspace directory.',
            ),
            h(
              ComboboxRoot,
              {
                busy: busy.value,
                'onUpdate:query': (value: string) => (query.value = value),
                query: query.value,
              },
              {
                default: () => [
                  h(ComboboxInput, { 'data-testid': 'combobox-input' }),
                  h(ComboboxContent, null, {
                    default: () =>
                      h(ComboboxList, null, {
                        default: () => [
                          h(
                            ComboboxItem,
                            { label: 'Ada Lovelace', value: 'ada' },
                            () => 'Ada Lovelace',
                          ),
                          h(ComboboxEmpty),
                        ],
                      }),
                  }),
                ],
              },
            ),
          ],
        });
    },
  });
  const { app, root } = mountTree(h(harness));

  const label = root.querySelector(
    '[data-slot="field-label"]',
  ) as HTMLLabelElement;
  const input = byTestId(root, 'combobox-input') as HTMLInputElement;
  const description = root.querySelector(
    '[data-slot="field-description"]',
  ) as HTMLElement;

  expect(label.getAttribute('for')).toBe(input.id);
  expect(input.getAttribute('aria-busy')).toBe('true');
  expect(input.getAttribute('aria-describedby')).toContain(description.id);

  busy.value = false;
  await settle();
  expect(input.getAttribute('aria-busy')).toBeNull();

  app.unmount();
  root.remove();
});

test('Sheet holding form fields keeps a nested AlertDialog independent on close', async () => {
  const sheetOpen = ref(true);
  const alertOpen = ref(false);
  const confirmed = ref(false);
  const harness = defineComponent({
    setup() {
      return () =>
        h(
          SheetRoot,
          {
            'onUpdate:open': (value?: boolean) =>
              (sheetOpen.value = value ?? false),
            open: sheetOpen.value,
          },
          {
            default: () => [
              h(Sheet, null, {
                default: () => [
                  h(Field, null, {
                    default: () => [h(FieldLabel, null, () => 'Name')],
                  }),
                  h(
                    AlertDialog,
                    {
                      'onUpdate:open': (value?: boolean) =>
                        (alertOpen.value = value ?? false),
                      open: alertOpen.value,
                    },
                    {
                      actions: ({ close }: { close: () => void }) =>
                        h(
                          'button',
                          {
                            'data-testid': 'confirm-discard',
                            onClick: () => {
                              confirmed.value = true;
                              close();
                            },
                          },
                          'Discard',
                        ),
                      title: () => 'Discard changes?',
                      trigger: () =>
                        h('button', { 'data-testid': 'open-alert' }, 'Close'),
                    },
                  ),
                ],
              }),
            ],
          },
        );
    },
  });
  const { app, root } = mountTree(h(harness));
  await settle();

  await click(byTestId(root, 'open-alert'));
  await settle();
  expect(alertOpen.value).toBe(true);
  expect(sheetOpen.value).toBe(true);

  await click(byTestId(root, 'confirm-discard'));
  await settle();
  expect(confirmed.value).toBe(true);
  expect(alertOpen.value).toBe(false);
  expect(sheetOpen.value).toBe(true);

  app.unmount();
  root.remove();
});

test('a dense screen renders exactly one of loading, error, empty, or populated state', () => {
  function screen(state: 'loading' | 'error' | 'empty' | 'populated') {
    return mountTree(
      h('div', { 'data-testid': 'screen' }, [
        state === 'loading' ? h(Skeleton, { class: 'h-4 w-32' }) : null,
        state === 'error'
          ? h(Alert, { variant: 'destructive' }, () =>
              h(AlertTitle, null, () => 'Failed to load'),
            )
          : null,
        state === 'empty'
          ? h(Empty, null, () => h(EmptyTitle, null, () => 'No rows'))
          : null,
        state === 'populated'
          ? h(Table, null, {
              default: () =>
                h(TableBody, null, {
                  default: () =>
                    h(TableRow, null, {
                      default: () => h(TableCell, null, () => 'Ada'),
                    }),
                }),
            })
          : null,
      ]),
    );
  }

  for (const state of ['loading', 'error', 'empty', 'populated'] as const) {
    const { app, root } = screen(state);
    const screenEl = byTestId(root, 'screen');
    expect(screenEl.querySelector('[data-slot="skeleton"]') !== null).toBe(
      state === 'loading',
    );
    expect(screenEl.querySelector('[data-slot="alert"]') !== null).toBe(
      state === 'error',
    );
    expect(screenEl.querySelector('[data-slot="empty"]') !== null).toBe(
      state === 'empty',
    );
    expect(screenEl.querySelector('table') !== null).toBe(
      state === 'populated',
    );
    app.unmount();
    root.remove();
  }
});
