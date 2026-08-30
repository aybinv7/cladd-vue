import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    ignorePatterns: ['**/dist/**', 'reference/**'],
    arrowParens: 'always',
    bracketSpacing: true,
    htmlWhitespaceSensitivity: 'css',
    printWidth: 80,
    proseWrap: 'preserve',
    quoteProps: 'as-needed',
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false,
    vueIndentScriptAndStyle: false,
    sortTailwindcss: {
      stylesheet: './apps/playground/src/styles/index.css',
      functions: ['cn', 'clsx', 'twMerge'],
    },
    sortImports: {},
    sortPackageJson: true,
    overrides: [{ files: ['*.css'], options: { singleQuote: false } }],
  },
  lint: {
    ignorePatterns: ['**/dist/**', 'reference/**'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
    tasks: {
      'reference:cladd': {
        command: 'node scripts/reference-cladd.mjs',
      },
      typecheck: {
        command:
          'vue-tsc --noEmit -p packages/ui/tsconfig.json && vue-tsc --noEmit -p apps/playground/tsconfig.app.json',
      },
      ready: {
        command:
          'vp check && vp run typecheck && vp run -r test -- --run && vp run -r build',
      },
    },
  },
});
