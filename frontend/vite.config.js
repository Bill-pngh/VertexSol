import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({ 
      svgrOptions: {
        icon: true
      }
    })
  ],
  define: {
    global: 'window' // Required for Telegram WebApp
  },
  server: {
    port: 3000,
    strictPort: true
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: true,
    assetsInlineLimit: 4096, // 4kb - from second config
    rollupOptions: {
      output: {
        // From second config
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].[hash].[ext]`,
        // From first config
        manualChunks: {
          solana: ['@solana/web3.js'],
          charts: ['chart.js', 'react-chartjs-2']
        }
      }
    }
  }
});
