import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2015',
    cssTarget: 'chrome61',
    // IIFE bundle: single JS file, no ES modules, WeChat webview compatible
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'FreshHarvest',
      formats: ['iife'],
      fileName: () => 'app.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: 'app.[ext]',
      },
    },
  },
});
