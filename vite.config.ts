/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: format => `modelling.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
  resolve: {
    alias: {
      '@': 'src',
    },
  },
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      exclude: ['./node_modules', 'src/**/*.test.(tsx|ts)', 'src/**/*.stories.(tsx|ts)'],
      tsconfigPath: './tsconfig.json',
    }),
    svgrPlugin(),
    nodePolyfills(),
    tsconfigPaths(),
  ],
  test: {
    include: ['**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test-setup.ts'],
  },
});
