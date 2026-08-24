import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relativ bas gör bygget oberoende av var det ligger. Samma dist fungerar
  // på GitHub Pages under /Judoteacher/, på en egen domän och på Vercel.
  base: './',
  plugins: [react()],
  build: { outDir: 'dist', sourcemap: false },
});
