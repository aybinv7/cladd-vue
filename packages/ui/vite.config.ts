import vue from '@vitejs/plugin-vue';
import vueRolldown from 'unplugin-vue/rolldown';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
  },
  pack: {
    entry: ['src/index.ts'],
    format: ['esm'],
    outExtensions: () => ({ js: '.mjs' }),
    dts: { vue: true },
    plugins: [vueRolldown({ isProduction: true })],
    sourcemap: true,
    clean: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
