import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  plugins: [tailwindcss(), vue()],
  optimizeDeps: {
    exclude: ['@cladd-vue/ui', 'shiki'],
  },
  resolve: {
    conditions: ['source', 'module', 'browser', 'development|production'],
  },
});
