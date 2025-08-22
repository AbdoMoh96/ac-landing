import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact.html'),
        vacancies: resolve(__dirname, 'vacancies.html'),
      },
    },
  },
  plugins: [
    tailwindcss(),
  ],
  // use base when serving static files
  // base: './',
})