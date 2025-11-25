import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/design-system': path.resolve(__dirname, './src/design-system'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/app': path.resolve(__dirname, './src/app'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
