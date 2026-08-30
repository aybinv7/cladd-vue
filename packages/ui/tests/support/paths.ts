import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** `packages/ui`, resolved from this file rather than the working directory. */
export const packageRoot = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
);

export const repoRoot = join(packageRoot, '..', '..');

/** The vendored upstream checkout. Absent until `vp run reference:cladd` runs. */
export const upstreamRoot = join(repoRoot, 'reference', 'cladd');

export const upstreamHydrated = existsSync(upstreamRoot);

export function srcPath(...segments: string[]): string {
  return join(packageRoot, 'src', ...segments);
}

export function stylesPath(...segments: string[]): string {
  return srcPath('styles', ...segments);
}

export function upstreamPath(...segments: string[]): string {
  return join(upstreamRoot, 'src', ...segments);
}

export function upstreamStylesPath(...segments: string[]): string {
  return upstreamPath('styles', ...segments);
}
