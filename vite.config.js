import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), //======> done
        about: resolve(__dirname, 'about.html'), //======> done
        album: resolve(__dirname, 'album.html'), //======> done
        consultancy_services: resolve(__dirname, 'consultancy_services.html'),
        training_and_workshop: resolve(__dirname, 'training_and_workshop.html'),
        professional_services: resolve(__dirname, 'professional_services.html'),
        staff_augmentation: resolve(__dirname, 'staff_augmentation.html'),
        vacancies: resolve(__dirname, 'vacancies.html'), //======> done
        submit_your_cv: resolve(__dirname, 'submit_your_cv.html'),
        markets_we_serve: resolve(__dirname, 'markets_we_serve.html'),
        contact: resolve(__dirname, 'contact.html'), //======> done


      },
    },
  },
  plugins: [
    tailwindcss(),
  ],
  // use base when serving static files
  // base: './',
})