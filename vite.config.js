import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss7-compat';  // Use the new package
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),  // Add TailwindCSS with the new package
        autoprefixer(),
      ],
    },
  },
});
