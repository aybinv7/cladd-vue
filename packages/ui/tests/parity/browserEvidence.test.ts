import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vite-plus/test';

import {
  dialogHiddenClasses,
  dialogOpenedClasses,
  popoverHiddenClasses,
  popoverOpenedClasses,
  tooltipHiddenClasses,
  tooltipOpenedClasses,
} from '../../src/components/overlay.contracts.ts';

const colorsCss = readFileSync(
  join(process.cwd(), 'src', 'styles', 'colors.css'),
  'utf8',
);
const claddCss = readFileSync(join(process.cwd(), 'src', 'cladd.css'), 'utf8');
const radiusCss = readFileSync(
  join(process.cwd(), 'src', 'styles', 'radius.css'),
  'utf8',
);
const spacingCss = readFileSync(
  join(process.cwd(), 'src', 'styles', 'spacing.css'),
  'utf8',
);

test('locks dark/light theming selectors (browser evidence)', () => {
  expect(colorsCss).toContain(':root');
  expect(colorsCss).toContain('.dark');
  expect(colorsCss).toContain('.light');
  expect(colorsCss).toContain('cladd-color-');
  expect(claddCss).toContain('@import "./styles/colors.css"');
  expect(colorsCss).toContain('--cladd-bg');
  expect(colorsCss).toContain('--cladd-fg');
});

test('locks overlay motion durations (reduced-motion fast path relies on these)', () => {
  expect(dialogHiddenClasses).toBe('scale-75 opacity-0 duration-200 ease-out!');
  expect(dialogOpenedClasses).toBe(
    'scale-100 opacity-100 duration-500 ease-[cubic-bezier(0,1,0.2,1.1)]',
  );
  expect(popoverHiddenClasses).toBe('scale-0 opacity-0');
  expect(popoverOpenedClasses).toBe(
    'scale-100 opacity-100 ease-[cubic-bezier(0,1,0,1.025)]',
  );
  expect(tooltipHiddenClasses).toBe('scale-50 opacity-0');
  expect(tooltipOpenedClasses).toBe('scale-100 opacity-100');
});

test('locks radius and spacing ladders (narrow-viewport geometry)', () => {
  expect(radiusCss).toContain('--radius-cladd-dialog: 24px');
  expect(radiusCss).toContain('--radius-cladd-popover: 24px');
  expect(spacingCss).toContain('--spacing-cladd-md: 28px');
  expect(colorsCss).toContain('--shadow-cladd-popover');
});
