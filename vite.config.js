import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  // base: 'https://laptopistim.com/',
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  }
})
