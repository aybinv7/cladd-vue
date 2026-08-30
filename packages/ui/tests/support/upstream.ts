import { readFileSync } from 'node:fs';

/**
 * Minimal readers for the vendored upstream source.
 *
 * These parse text rather than build a type graph. That is enough to compare
 * export lists and prop names, which is what the parity tests need, and it
 * avoids pulling a TypeScript program into the test run.
 */

const VALUE_EXPORT = /^\s*(?:(\w+)\s+as\s+(\w+)|(\w+))\s*,?\s*$/u;

/** Value (non-`type`) names exported from an `index.ts`, following `as` aliases. */
export function valueExports(indexPath: string): Set<string> {
  const source = readFileSync(indexPath, 'utf8').replace(/\r\n/gu, '\n');
  const names = new Set<string>();

  for (const block of source.matchAll(/export\s*\{([^}]*)\}/gu)) {
    for (const entry of block[1].split(',')) {
      const line = entry.trim();
      if (!line || line.startsWith('type ')) continue;

      const match = VALUE_EXPORT.exec(line);
      if (!match) continue;

      const name = match[2] ?? match[3];
      if (name && name !== 'default') names.add(name);
    }
  }

  for (const single of source.matchAll(
    /export\s*\{\s*default\s+as\s+(\w+)\s*\}/gu,
  )) {
    names.add(single[1]);
  }

  for (const declared of source.matchAll(
    /^export\s+(?:declare\s+)?(?:const|let|var|function\*?|class)\s+(\w+)/gmu,
  )) {
    names.add(declared[1]);
  }

  return names;
}

/** Type-only names exported from an `index.ts`, following `as` aliases. */
export function typeExports(indexPath: string): Set<string> {
  const source = readFileSync(indexPath, 'utf8').replace(/\r\n/gu, '\n');
  const names = new Set<string>();

  for (const block of source.matchAll(/export\s*(?:type\s*)?\{([^}]*)\}/gu)) {
    const typeBlock = block[0].startsWith('export type');
    for (const entry of block[1].split(',')) {
      const line = entry.trim();
      if (!line) continue;
      if (!typeBlock && !line.startsWith('type ')) continue;

      const match = VALUE_EXPORT.exec(line.replace(/^type\s+/u, ''));
      if (!match) continue;

      const name = match[2] ?? match[3];
      if (name) names.add(name);
    }
  }

  return names;
}

/**
 * Prop names declared directly on an interface body, ignoring nested object
 * types. Returns an empty set when the interface is absent.
 */
export function interfaceProps(filePath: string, name: string): Set<string> {
  const source = readFileSync(filePath, 'utf8').replace(/\r\n/gu, '\n');
  const header = new RegExp(`interface\\s+${name}\\b[^{]*\\{`, 'u').exec(
    source,
  );
  if (!header) return new Set();

  const props = new Set<string>();
  let depth = 1;
  let index = header.index + header[0].length;
  let line = '';

  while (index < source.length && depth > 0) {
    const char = source[index];

    if (char === '{') depth += 1;
    if (char === '}') depth -= 1;

    if (char === '\n') {
      if (depth === 1) collectProp(line, props);
      line = '';
    } else {
      line += char;
    }

    index += 1;
  }

  return props;
}

const PROP = /^\s*(?:readonly\s+)?['"]?([A-Za-z_$][\w$-]*)['"]?\??\s*:/u;

function collectProp(line: string, into: Set<string>): void {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('/') || trimmed.startsWith('*')) return;

  const match = PROP.exec(line);
  if (match) into.add(match[1]);
}
