import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps asset paths relative so the production build also opens from file://
export default defineConfig({
  base: './',
  plugins: [react()],
});
