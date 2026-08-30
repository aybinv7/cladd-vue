import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ignorePatterns: ["**/dist/**", "reference/**"],
  },
  lint: {
    ignorePatterns: ["**/dist/**", "reference/**"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
    tasks: {
      "reference:cladd": {
        command: "node scripts/reference-cladd.mjs",
      },
      ready: {
        command: "vp check && vp run -r test -- --run && vp run -r build",
      },
    },
  },
});
