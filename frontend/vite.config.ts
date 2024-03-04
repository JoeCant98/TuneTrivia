/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const oneDayInSeconds = 86400;

export default defineConfig({
   plugins: [
      react(),
      VitePWA({
         registerType: 'autoUpdate',
         devOptions: {
            enabled: true,
         },
         workbox: {
            disableDevLogs: true,
            cleanupOutdatedCaches: true,
            skipWaiting: true,
            clientsClaim: true,
            runtimeCaching: [
               {
                  urlPattern: /^https?.*/,
                  handler: 'NetworkFirst',
                  method: 'GET',
                  options: {
                     cacheName: 'sw-fetch-cache',
                     expiration: {
                        maxEntries: 500,
                        maxAgeSeconds: oneDayInSeconds,
                     },
                     cacheableResponse: {
                        statuses: [0, 200],
                     },
                     matchOptions: {
                        ignoreSearch: false,
                     },
                  },
               },
            ],
         },
         manifest: {
            name: 'Tune Trivia',
            short_name: 'Tune Trivia',
            description: 'Test your knowledge',
            display: 'standalone',
            orientation: 'natural',
            start_url: '/?application=true',
            scope: '/',
            icons: [
               {
                  src: '/icons/tunetrivia.png',
                  sizes: '192x192',
                  type: 'image/png',
                  purpose: 'any',
               },
               {
                  src: '/icons/tunetrivia.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'maskable',
               },
            ],
         },
      }),
   ],
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
   },
});
