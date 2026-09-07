import { expect, test } from 'vite-plus/test';
import { h } from 'vue';

import Alert from '../../src/components/Alert.vue';
import AlertActions from '../../src/components/AlertActions.vue';
import AlertDescription from '../../src/components/AlertDescription.vue';
import AlertTitle from '../../src/components/AlertTitle.vue';
import Empty from '../../src/components/Empty.vue';
import EmptyContent from '../../src/components/EmptyContent.vue';
import EmptyDescription from '../../src/components/EmptyDescription.vue';
import EmptyHeader from '../../src/components/EmptyHeader.vue';
import EmptyMedia from '../../src/components/EmptyMedia.vue';
import EmptyTitle from '../../src/components/EmptyTitle.vue';
import Progress from '../../src/components/Progress.vue';
import ProgressLabel from '../../src/components/ProgressLabel.vue';
import ProgressValue from '../../src/components/ProgressValue.vue';
import Skeleton from '../../src/components/Skeleton.vue';
import { mountTree } from '../support/mountTree.ts';

test('neutral alert renders no live region and no screen-reader status word', () => {
  const { app, root } = mountTree(
    h(Alert, null, {
      default: () => [
        h(AlertTitle, null, () => 'Heads up'),
        h(AlertDescription, null, () => 'Nothing urgent.'),
      ],
    }),
  );

  const alert = root.querySelector('[data-slot="alert"]');
  expect(alert?.getAttribute('role')).toBeNull();
  expect(alert?.textContent).not.toContain(':');
  expect(root.querySelector('[data-slot="alert-title"]')?.textContent).toBe(
    'Heads up',
  );

  app.unmount();
  root.remove();
});

test('destructive alert without an icon falls back to a screen-reader status word', () => {
  const { app, root } = mountTree(
    h(
      Alert,
      { live: 'assertive', variant: 'destructive' },
      {
        default: () => [
          h(AlertTitle, null, () => 'Payment failed'),
          h(AlertActions, null, () => 'Retry'),
        ],
      },
    ),
  );

  const alert = root.querySelector('[data-slot="alert"]');
  expect(alert?.getAttribute('role')).toBe('alert');
  expect(alert?.querySelector('.sr-only')?.textContent).toBe('Error: ');
  expect(root.querySelector('[data-part="icon"]')).toBeNull();
  expect(root.querySelector('[data-slot="alert-actions"]')?.textContent).toBe(
    'Retry',
  );

  app.unmount();
  root.remove();
});

test('a supplied icon replaces the screen-reader status word fallback', () => {
  const { app, root } = mountTree(
    h(Alert, { icon: 'svg', variant: 'warning' }, () => 'Careful'),
  );

  expect(root.querySelector('[data-part="icon"]')).not.toBeNull();
  expect(root.querySelector('.sr-only')).toBeNull();

  app.unmount();
  root.remove();
});

test('empty state composes header, media, and content without imposing copy', () => {
  const { app, root } = mountTree(
    h(Empty, null, {
      default: () => [
        h(EmptyHeader, null, {
          default: () => [
            h(EmptyMedia, null, () => 'icon'),
            h(EmptyTitle, null, () => 'No results'),
            h(EmptyDescription, null, () => 'Try a different search.'),
          ],
        }),
        h(EmptyContent, null, () => 'Clear filters'),
      ],
    }),
  );

  expect(
    root
      .querySelector('[data-slot="empty-media"]')
      ?.getAttribute('aria-hidden'),
  ).toBe('true');
  expect(root.querySelector('[data-slot="empty-title"]')?.textContent).toBe(
    'No results',
  );
  expect(root.querySelector('[data-slot="empty-content"]')?.textContent).toBe(
    'Clear filters',
  );

  app.unmount();
  root.remove();
});

test('skeleton is hidden from accessibility APIs and introduces no keyboard stop', () => {
  const { app, root } = mountTree(h(Skeleton, { class: 'h-4 w-32' }));

  const skeleton = root.querySelector('[data-slot="skeleton"]');
  expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
  expect(skeleton?.hasAttribute('tabindex')).toBe(false);
  expect(skeleton?.className).toContain('h-4');

  app.unmount();
  root.remove();
});

test('determinate progress clamps out-of-range values and exposes valuenow', () => {
  const { app, root } = mountTree(
    h(
      Progress,
      { max: 10, min: 0, value: 42 },
      {
        default: () => [
          h(ProgressLabel, null, () => 'Uploading'),
          h(ProgressValue),
        ],
      },
    ),
  );

  const track = root.querySelector('[data-slot="progress-track"]');
  expect(track?.getAttribute('role')).toBe('progressbar');
  expect(track?.getAttribute('aria-valuenow')).toBe('10');
  expect(track?.getAttribute('aria-valuemax')).toBe('10');
  expect(root.querySelector('[data-slot="progress-value"]')?.textContent).toBe(
    '100%',
  );

  app.unmount();
  root.remove();
});

test('invalid or missing value falls back to a visible indeterminate sweep', () => {
  const { app, root } = mountTree(h(Progress, { value: Number.NaN }));

  const track = root.querySelector('[data-slot="progress-track"]');
  expect(track?.hasAttribute('aria-valuenow')).toBe(false);
  const fill = root.querySelector('[data-slot="progress-fill"]');
  expect(fill?.className).toContain('animate-pulse');
  expect(fill?.className).toContain('motion-reduce:animate-none');
  expect(fill?.className).toContain('w-2/5');

  app.unmount();
  root.remove();
});
