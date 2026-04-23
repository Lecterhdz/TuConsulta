// vite.config.js
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath } from 'url';

export default defineConfig({
  // ✅ GitHub Pages: debe coincidir con el nombre de tu repo
  base: '/tuconsulta/',
  
  // ✅ Aliases para imports limpios
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config', import.meta.url)),  // ✅ AGREGADO
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url))   // ✅ OPCIONAL
    }
  },
  
  // ✅ PWA para instalación offline
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'TuConsulta - Citas Médicas',
        short_name: 'TuConsulta',
        description: 'Agenda citas médicas de forma rápida y sencilla',
        theme_color: '#1a1a1a',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  
  // ✅ Optimizaciones de build
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
});