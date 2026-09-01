import { readFileSync } from 'node:fs';

import ts from 'typescript';

export interface PropContract {
  readonly name: string;
  readonly optional: boolean;
  readonly types: ReadonlySet<string>;
}

export interface PropsContract {
  readonly name: string;
  readonly props: ReadonlyMap<string, PropContract>;
  readonly unresolved: ReadonlySet<string>;
}

type ContractDeclaration = ts.InterfaceDeclaration | ts.TypeAliasDeclaration;

interface DeclarationEntry {
  readonly declaration: ContractDeclaration;
  readonly sourceFile: ts.SourceFile;
}

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
  let parens = 0;
  let index = header.index + header[0].length;
  let line = '';

  while (index < source.length && depth > 0) {
    const char = source[index];

    if (char === '{') depth += 1;
    if (char === '}') depth -= 1;
    if (char === '(') parens += 1;
    if (char === ')') parens -= 1;

    if (char === '\n') {
      if (depth === 1 && parens === 0) collectProp(line, props);
      line = '';
    } else {
      line += char;
    }

    index += 1;
  }

  return props;
}

/**
 * Prop names extracted from a type alias's inline object literal, e.g.
 * `type FooProps = FooOwnProps & { bar?: string }`. Returns an empty set when
 * the alias has no object literal body (pure re-export, union, etc.).
 */
export function typeAliasProps(filePath: string, name: string): Set<string> {
  const source = readFileSync(filePath, 'utf8').replace(/\r\n/gu, '\n');
  const alias = new RegExp(`type\\s+${name}\\b[^=]*=\\s*`, 'u').exec(source);
  if (!alias) return new Set();

  let index = alias.index + alias[0].length;

  while (index < source.length && source[index] !== '{') {
    index += 1;
  }
  if (index >= source.length) return new Set();

  const props = new Set<string>();
  let depth = 1;
  let parens = 0;
  let line = '';
  index += 1;

  while (index < source.length && depth > 0) {
    const char = source[index];

    if (char === '{') depth += 1;
    if (char === '}') depth -= 1;
    if (char === '(') parens += 1;
    if (char === ')') parens -= 1;

    if (char === '\n') {
      if (depth === 1 && parens === 0) collectProp(line, props);
      line = '';
    } else {
      line += char;
    }

    index += 1;
  }

  return props;
}

export function propsContracts(
  filePaths: readonly string[],
): Map<string, PropsContract> {
  const declarations = new Map<string, DeclarationEntry>();

  for (const filePath of filePaths) {
    const source = readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(
      filePath,
      source,
      ts.ScriptTarget.Latest,
      true,
      filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );

    for (const statement of sourceFile.statements) {
      if (
        (ts.isInterfaceDeclaration(statement) ||
          ts.isTypeAliasDeclaration(statement)) &&
        statement.name.text.endsWith('Props')
      ) {
        declarations.set(statement.name.text, {
          declaration: statement,
          sourceFile,
        });
      }
    }
  }

  const resolved = new Map<string, PropsContract>();
  const resolving = new Set<string>();

  const resolveNamed = (name: string): PropsContract => {
    const cached = resolved.get(name);
    if (cached) return cached;

    if (resolving.has(name)) {
      return { name, props: new Map(), unresolved: new Set([name]) };
    }

    const entry = declarations.get(name);
    if (!entry) {
      return { name, props: new Map(), unresolved: new Set([name]) };
    }

    resolving.add(name);
    const contract = resolveDeclaration(entry, resolveNamed);
    resolving.delete(name);
    resolved.set(name, contract);
    return contract;
  };

  for (const name of declarations.keys()) resolveNamed(name);

  return resolved;
}

function resolveDeclaration(
  entry: DeclarationEntry,
  resolveNamed: (name: string) => PropsContract,
): PropsContract {
  const { declaration, sourceFile } = entry;
  const own: PropsContract = ts.isInterfaceDeclaration(declaration)
    ? propertiesFromMembers(declaration.members, sourceFile)
    : { name: '', props: new Map(), unresolved: new Set() };
  const inherited: PropsContract[] = [];

  if (ts.isInterfaceDeclaration(declaration)) {
    for (const clause of declaration.heritageClauses ?? []) {
      for (const type of clause.types) {
        inherited.push(resolveTypeNode(type, sourceFile, resolveNamed));
      }
    }
  } else {
    inherited.push(resolveTypeNode(declaration.type, sourceFile, resolveNamed));
  }

  return mergeContracts(declaration.name.text, [...inherited, own]);
}

function resolveTypeNode(
  node: ts.TypeNode,
  sourceFile: ts.SourceFile,
  resolveNamed: (name: string) => PropsContract,
): PropsContract {
  if (ts.isParenthesizedTypeNode(node)) {
    return resolveTypeNode(node.type, sourceFile, resolveNamed);
  }

  if (ts.isTypeLiteralNode(node)) {
    return propertiesFromMembers(node.members, sourceFile);
  }

  if (ts.isIntersectionTypeNode(node) || ts.isUnionTypeNode(node)) {
    return mergeContracts(
      '',
      node.types.map((type) => resolveTypeNode(type, sourceFile, resolveNamed)),
    );
  }

  if (ts.isTypeReferenceNode(node)) {
    const name = node.typeName.getText(sourceFile);
    if (
      ['Partial', 'Required', 'Readonly', 'Pick', 'Omit'].includes(name) &&
      node.typeArguments?.[0]
    ) {
      return resolveTypeNode(node.typeArguments[0], sourceFile, resolveNamed);
    }
    return resolveNamed(name);
  }

  if (ts.isExpressionWithTypeArguments(node)) {
    const name = node.expression.getText(sourceFile);
    return resolveNamed(name);
  }

  return {
    name: '',
    props: new Map(),
    unresolved: new Set([normaliseType(node.getText(sourceFile))]),
  };
}

function propertiesFromMembers(
  members: ts.NodeArray<ts.TypeElement>,
  sourceFile: ts.SourceFile,
): PropsContract {
  const props = new Map<string, PropContract>();

  for (const member of members) {
    if (!ts.isPropertySignature(member) && !ts.isMethodSignature(member))
      continue;
    if (!member.name) continue;

    const name = propertyName(member.name, sourceFile);
    if (!name) continue;

    const type = member.type
      ? normaliseType(member.type.getText(sourceFile))
      : 'unknown';
    props.set(name, {
      name,
      optional: Boolean(member.questionToken),
      types: new Set([type]),
    });
  }

  return { name: '', props, unresolved: new Set() };
}

function propertyName(
  name: ts.PropertyName,
  sourceFile: ts.SourceFile,
): string | undefined {
  if (
    ts.isIdentifier(name) ||
    ts.isStringLiteral(name) ||
    ts.isNumericLiteral(name)
  ) {
    return name.text;
  }
  return ts.isComputedPropertyName(name) ? undefined : name.getText(sourceFile);
}

function mergeContracts(
  name: string,
  contracts: readonly PropsContract[],
): PropsContract {
  const props = new Map<string, PropContract>();
  const unresolved = new Set<string>();

  for (const contract of contracts) {
    for (const dependency of contract.unresolved) unresolved.add(dependency);
    for (const prop of contract.props.values()) {
      const current = props.get(prop.name);
      if (!current) {
        props.set(prop.name, {
          name: prop.name,
          optional: prop.optional,
          types: new Set(prop.types),
        });
        continue;
      }

      const types = new Set([...current.types, ...prop.types]);
      props.set(prop.name, {
        name: prop.name,
        optional: current.optional || prop.optional,
        types,
      });
    }
  }

  return { name, props, unresolved };
}

function normaliseType(type: string): string {
  return type.replace(/\s+/gu, ' ').trim();
}

const PROP = /^\s*(?:readonly\s+)?['"]?([A-Za-z_$][\w$-]*)['"]?\??\s*:/u;

function collectProp(line: string, into: Set<string>): void {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('/') || trimmed.startsWith('*')) return;

  const match = PROP.exec(line);
  if (match) into.add(match[1]);
}
