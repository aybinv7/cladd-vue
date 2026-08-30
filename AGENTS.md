# AGENTS.md

Guidance for agents working in this repository.

## What this repository is

`cladd-vue` is a Vue 3 port of [Cladd](https://github.com/cladd-ui/cladd). It is an independent
implementation, not an official Cladd package.

```
cladd-vue/
├── packages/ui/       # @cladd-vue/ui — the library. The root of the dependency graph.
├── apps/playground/   # visual acceptance catalog. Private, consumes the package publicly.
├── plans/             # port roadmap and audits
├── scripts/           # repository tooling
└── reference/cladd/   # gitignored upstream checkout, hydrated by `vp run reference:cladd`
```

`packages/ui/CLAUDE.md` governs all library work and takes precedence inside that directory.
`apps/playground/CLAUDE.md` governs the catalog.

## Toolchain

Everything runs through the `vp` CLI. Never invoke `npm`, `pnpm`, `npx`, `bun` directly, and never call
`vitest`, `eslint`, `oxlint`, `oxfmt`, `tsc`, or `vue-tsc` as binaries.

```bash
vp install                 # install workspace dependencies
vp check                   # format, lint, typecheck
vp run -r test -- --run    # every workspace test suite, once
vp run -r build            # library pack + playground build
vp run ready               # check, then test, then build
vp run dev                 # playground dev server
vp run reference:cladd     # hydrate reference/cladd at the pinned commit
```

Focused runs use the package name: `vp run @cladd-vue/ui#test`, `vp run playground#dev`.

## Dependency rules

- `packages/ui` imports from `vue`, `clsx`, and `tailwind-merge` only. It never imports from `apps/*`
  or from another workspace package.
- `apps/playground` imports the library through `@cladd-vue/ui` and `@cladd-vue/ui/styles.css`. It never
  reaches into `packages/ui/src`.
- Every third-party version lives in the root `catalog`. Workspaces declare `"catalog:"`, never a
  literal range.

## Ground rules

- **Port, do not invent.** This repository reproduces Cladd in Vue. Upstream's names, selectors,
  tokens, values, and code shape are the specification, and the diff against `reference/cladd/` is the
  first acceptance test. Read `packages/ui/CLAUDE.md` before changing anything in the library.
- No inline code comments of your own. Upstream's comments and JSDoc are ported verbatim.
- One component family, composable, contract, or style concern per file.
- Do not run dev servers or application builds unless the user explicitly asks.
- Do not claim build, browser, accessibility, or device evidence unless that validation actually ran.
- Ask before committing.
- **Never reference the assistant in git history.** No `Co-Authored-By` trailer, no "generated with",
  no tool or model name anywhere in a commit message, branch name, PR body, or code comment. The
  author and committer are the human running the work. This is not negotiable and has no exceptions.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
