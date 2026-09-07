import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vite-plus/test';

import { srcPath, stylesPath } from '../support/paths.ts';

/**
 * Guards against a real, recurring bug class: hand-typed `bg-cladd-*`/`text-cladd-*`/
 * `border-cladd-*`/etc. class names that look plausible but reference no `--color-cladd-*` token
 * Tailwind ever registers, so the utility silently generates no CSS at all. Found and fixed twice
 * in this milestone (`cladd-border-subtle`, `cladd-canvas`, `cladd-surface-raised`,
 * `cladd-fg-muted`, `ring-cladd-focus`) before this test existed — this makes a third time
 * impossible to ship unnoticed.
 */

function readAllVueFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...readAllVueFiles(full));
    else if (entry.name.endsWith('.vue')) files.push(full);
  }
  return files;
}

function realTokens(cssFile: string, prefix: string): Set<string> {
  const source = readFileSync(cssFile, 'utf8');
  const pattern = new RegExp(`--${prefix}-cladd-([a-zA-Z0-9-]+)`, 'g');
  const tokens = new Set<string>();
  for (const match of source.matchAll(pattern)) tokens.add(match[1]);
  return tokens;
}

const realColors = realTokens(stylesPath('colors.css'), 'color');
const realFontSizes = realTokens(stylesPath('font-size.css'), 'text');
const realRadii = realTokens(stylesPath('radius.css'), 'radius');
const realSpacing = realTokens(stylesPath('spacing.css'), 'spacing');

const colorOnlyPrefixes = [
  'bg',
  'border',
  'ring',
  'divide',
  'from',
  'to',
  'via',
];
const textPrefixUnion = new Set([...realColors, ...realFontSizes]);
const roundedUnion = realRadii;
const spacingPrefixes = [
  'size',
  'w',
  'h',
  'p',
  'px',
  'py',
  'pt',
  'pb',
  'ps',
  'pe',
  'gap',
];

test('every hand-written cladd-* utility class references a real token', () => {
  const files = readAllVueFiles(srcPath('components'));
  const offenders: string[] = [];

  for (const file of files) {
    const source = readFileSync(file, 'utf8');

    for (const prefix of colorOnlyPrefixes) {
      const pattern = new RegExp(`\\b${prefix}-cladd-([a-zA-Z0-9-]+)`, 'g');
      for (const match of source.matchAll(pattern)) {
        if (!realColors.has(match[1])) {
          offenders.push(`${file}: ${prefix}-cladd-${match[1]}`);
        }
      }
    }

    for (const match of source.matchAll(/\btext-cladd-([a-zA-Z0-9-]+)/g)) {
      if (!textPrefixUnion.has(match[1])) {
        offenders.push(`${file}: text-cladd-${match[1]}`);
      }
    }

    for (const match of source.matchAll(/\brounded-cladd-([a-zA-Z0-9-]+)/g)) {
      if (!roundedUnion.has(match[1])) {
        offenders.push(`${file}: rounded-cladd-${match[1]}`);
      }
    }

    for (const prefix of spacingPrefixes) {
      const pattern = new RegExp(`\\b${prefix}-cladd-([a-zA-Z0-9-]+)`, 'g');
      for (const match of source.matchAll(pattern)) {
        if (
          !realSpacing.has(match[1]) &&
          !realSpacing.has(`nested-${match[1]}`)
        ) {
          offenders.push(`${file}: ${prefix}-cladd-${match[1]}`);
        }
      }
    }
  }

  expect(offenders, 'undefined cladd-* utility classes').toEqual([]);
});
