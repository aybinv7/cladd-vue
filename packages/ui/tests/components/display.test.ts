import { expect, test } from 'vite-plus/test';
import { h } from 'vue';

import Avatar from '../../src/components/Avatar.vue';
import AvatarFallback from '../../src/components/AvatarFallback.vue';
import AvatarGroup from '../../src/components/AvatarGroup.vue';
import AvatarImage from '../../src/components/AvatarImage.vue';
import Card from '../../src/components/Card.vue';
import CardAction from '../../src/components/CardAction.vue';
import CardContent from '../../src/components/CardContent.vue';
import CardDescription from '../../src/components/CardDescription.vue';
import CardFooter from '../../src/components/CardFooter.vue';
import CardHeader from '../../src/components/CardHeader.vue';
import CardTitle from '../../src/components/CardTitle.vue';
import NativeSelect from '../../src/components/NativeSelect.vue';
import NativeSelectGroup from '../../src/components/NativeSelectGroup.vue';
import NativeSelectOption from '../../src/components/NativeSelectOption.vue';
import ScrollArea from '../../src/components/ScrollArea.vue';
import Separator from '../../src/components/Separator.vue';
import { byTestId, mountTree } from '../support/mountTree.ts';

test('card composes header, title, description, action, content, and footer', () => {
  const { app, root } = mountTree(
    h(Card, null, {
      default: () => [
        h(CardHeader, null, {
          action: () => h(CardAction, null, () => 'Action'),
          default: () => [
            h(CardTitle, null, () => 'Team'),
            h(CardDescription, null, () => 'Manage members'),
          ],
        }),
        h(CardContent, null, () => 'Body'),
        h(CardFooter, null, () => 'Footer'),
      ],
    }),
  );

  expect(root.querySelector('[data-slot="card"]')).not.toBeNull();
  expect(root.querySelector('[data-slot="card-title"]')?.textContent).toBe(
    'Team',
  );
  expect(root.querySelector('[data-slot="card-action"]')?.textContent).toBe(
    'Action',
  );
  expect(root.querySelector('[data-slot="card-content"]')?.textContent).toBe(
    'Body',
  );
  expect(root.querySelector('[data-slot="card-footer"]')?.textContent).toBe(
    'Footer',
  );

  app.unmount();
  root.remove();
});

test('avatar shows the fallback until the image loads, then hides it', async () => {
  const { app, root } = mountTree(
    h(Avatar, null, {
      default: () => [
        h(AvatarImage, { 'data-testid': 'image', src: 'ada.png' }),
        h(AvatarFallback, null, () => 'AL'),
      ],
    }),
  );

  const image = byTestId(root, 'image') as HTMLImageElement;
  const fallback = root.querySelector('[data-slot="avatar-fallback"]');
  expect(image.className).toContain('hidden');
  expect(fallback?.textContent).toBe('AL');

  image.dispatchEvent(new Event('load'));
  await Promise.resolve();
  expect(image.className).toContain('block');

  app.unmount();
  root.remove();
});

test('avatar image failure keeps the fallback visible', async () => {
  const { app, root } = mountTree(
    h(Avatar, null, {
      default: () => [
        h(AvatarImage, { 'data-testid': 'image', src: 'missing.png' }),
        h(AvatarFallback, null, () => 'AL'),
      ],
    }),
  );

  const image = byTestId(root, 'image') as HTMLImageElement;
  image.dispatchEvent(new Event('error'));
  await Promise.resolve();
  expect(image.className).toContain('hidden');
  expect(root.querySelector('[data-slot="avatar-fallback"]')?.textContent).toBe(
    'AL',
  );

  app.unmount();
  root.remove();
});

test('avatar group applies overlap spacing without owning identity logic', () => {
  const { app, root } = mountTree(
    h(
      AvatarGroup,
      { overlap: 12 },
      {
        default: () => [
          h(Avatar, { 'data-testid': 'a' }),
          h(Avatar, { 'data-testid': 'b' }),
        ],
      },
    ),
  );

  const group = root.querySelector('[data-slot="avatar-group"]') as HTMLElement;
  expect(group.style.getPropertyValue('--cladd-avatar-group-overlap')).toBe(
    '-12px',
  );

  app.unmount();
  root.remove();
});

test('decorative separator is removed from the accessibility tree by default', () => {
  const decorative = mountTree(h(Separator));
  expect(
    decorative.root
      .querySelector('[data-slot="separator"]')
      ?.getAttribute('role'),
  ).toBe('none');
  decorative.app.unmount();
  decorative.root.remove();

  const semantic = mountTree(
    h(Separator, { decorative: false, orientation: 'vertical' }),
  );
  const el = semantic.root.querySelector('[data-slot="separator"]');
  expect(el?.getAttribute('role')).toBe('separator');
  expect(el?.getAttribute('aria-orientation')).toBe('vertical');
  semantic.app.unmount();
  semantic.root.remove();
});

test('scroll area scopes overflow to the requested axis', () => {
  const { app, root } = mountTree(h(ScrollArea, { orientation: 'horizontal' }));
  const area = root.querySelector('[data-slot="scroll-area"]');
  expect(area?.className).toContain('overflow-x-auto');
  expect(area?.className).toContain('overflow-y-hidden');
  app.unmount();
  root.remove();
});

test('native select preserves native form participation and v-model binding', async () => {
  const { app, root } = mountTree(
    h(
      NativeSelect,
      { name: 'country', required: true },
      {
        default: () => [
          h(NativeSelectGroup, { label: 'Maghreb' }, () => [
            h(NativeSelectOption, { value: 'dz' }, () => 'Algeria'),
            h(NativeSelectOption, { value: 'tn' }, () => 'Tunisia'),
          ]),
        ],
      },
    ),
  );

  const select = root.querySelector('select') as HTMLSelectElement;
  expect(select.getAttribute('name')).toBe('country');
  expect(select.required).toBe(true);
  expect(root.querySelector('optgroup')?.getAttribute('label')).toBe('Maghreb');
  expect(select.options).toHaveLength(2);

  select.value = 'tn';
  select.dispatchEvent(new Event('change'));
  await Promise.resolve();
  expect(select.value).toBe('tn');

  app.unmount();
  root.remove();
});
