import { expect, test } from 'vite-plus/test';
import { h } from 'vue';

import Breadcrumb from '../../src/components/Breadcrumb.vue';
import BreadcrumbEllipsis from '../../src/components/BreadcrumbEllipsis.vue';
import BreadcrumbItem from '../../src/components/BreadcrumbItem.vue';
import BreadcrumbLink from '../../src/components/BreadcrumbLink.vue';
import BreadcrumbPage from '../../src/components/BreadcrumbPage.vue';
import BreadcrumbSeparator from '../../src/components/BreadcrumbSeparator.vue';
import Pagination from '../../src/components/Pagination.vue';
import PaginationContent from '../../src/components/PaginationContent.vue';
import PaginationEllipsis from '../../src/components/PaginationEllipsis.vue';
import PaginationItem from '../../src/components/PaginationItem.vue';
import PaginationLink from '../../src/components/PaginationLink.vue';
import PaginationNext from '../../src/components/PaginationNext.vue';
import PaginationPrevious from '../../src/components/PaginationPrevious.vue';
import { mountTree } from '../support/mountTree.ts';

test('breadcrumb uses a nav landmark and marks the current page', () => {
  const { app, root } = mountTree(
    h(Breadcrumb, null, {
      default: () => [
        h(BreadcrumbItem, null, {
          default: () =>
            h(BreadcrumbLink, { href: '/' }, { default: () => 'Home' }),
        }),
        h(BreadcrumbSeparator),
        h(BreadcrumbItem, null, {
          default: () =>
            h(
              BreadcrumbLink,
              { href: '/reports' },
              { default: () => 'Reports' },
            ),
        }),
        h(BreadcrumbSeparator),
        h(BreadcrumbItem, null, {
          default: () => h(BreadcrumbPage, null, { default: () => 'Q3' }),
        }),
      ],
    }),
  );

  const nav = root.querySelector('nav');
  expect(nav?.getAttribute('aria-label')).toBe('Breadcrumb');
  expect(root.querySelectorAll('nav > ol > li').length).toBe(5);

  const separators = root.querySelectorAll(
    '[data-slot="breadcrumb-separator"]',
  );
  expect(separators.length).toBe(2);
  for (const separator of separators) {
    expect(separator.getAttribute('aria-hidden')).toBe('true');
  }

  const current = root.querySelector('[data-slot="breadcrumb-page"]');
  expect(current?.getAttribute('aria-current')).toBe('page');
  expect(current?.textContent).toBe('Q3');

  app.unmount();
  root.remove();
});

test('breadcrumb accepts a custom accessible label and ellipsis stays presentational', () => {
  const { app, root } = mountTree(
    h(
      Breadcrumb,
      { label: 'Folder path' },
      {
        default: () => [
          h(BreadcrumbItem, null, { default: () => h(BreadcrumbEllipsis) }),
        ],
      },
    ),
  );

  expect(root.querySelector('nav')?.getAttribute('aria-label')).toBe(
    'Folder path',
  );
  const ellipsis = root.querySelector('[data-slot="breadcrumb-ellipsis"]');
  expect(ellipsis?.tagName).toBe('SPAN');
  expect(ellipsis?.getAttribute('role')).toBe('img');
  expect(ellipsis?.getAttribute('aria-label')).toBe('More');

  app.unmount();
  root.remove();
});

test('pagination exposes a labelled nav and marks the active page', () => {
  const { app, root } = mountTree(
    h(Pagination, null, {
      default: () =>
        h(PaginationContent, null, {
          default: () => [
            h(PaginationItem, null, {
              default: () => h(PaginationPrevious),
            }),
            h(PaginationItem, null, {
              default: () =>
                h(PaginationLink, { active: true }, { default: () => '1' }),
            }),
            h(PaginationItem, null, {
              default: () => h(PaginationLink, null, { default: () => '2' }),
            }),
            h(PaginationItem, null, { default: () => h(PaginationEllipsis) }),
            h(PaginationItem, null, {
              default: () => h(PaginationNext),
            }),
          ],
        }),
    }),
  );

  expect(root.querySelector('nav')?.getAttribute('aria-label')).toBe(
    'Pagination',
  );
  expect(root.querySelectorAll('nav > ul > li').length).toBe(5);

  const links = root.querySelectorAll('[data-slot="pagination-link"]');
  expect(links[0]?.getAttribute('aria-current')).toBe('page');
  expect(links[1]?.hasAttribute('aria-current')).toBe(false);

  const previous = root.querySelector('[data-slot="pagination-previous"]');
  expect(previous?.getAttribute('aria-label')).toBe('Go to previous page');
  expect(previous?.textContent).toBe('Previous');

  const next = root.querySelector('[data-slot="pagination-next"]');
  expect(next?.getAttribute('aria-label')).toBe('Go to next page');
  expect(next?.textContent).toBe('Next');

  const ellipsis = root.querySelector('[data-slot="pagination-ellipsis"]');
  expect(ellipsis?.getAttribute('aria-hidden')).toBe('true');

  app.unmount();
  root.remove();
});

test('disabled pagination controls cannot activate', () => {
  const { app, root } = mountTree(h(PaginationPrevious, { disabled: true }));

  const control = root.querySelector('[data-slot="pagination-previous"]');
  expect(control?.hasAttribute('disabled')).toBe(true);

  app.unmount();
  root.remove();
});
