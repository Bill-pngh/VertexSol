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
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          solana: ['@solana/web3.js'],
          charts: ['chart.js', 'react-chartjs-2']
        }
      }
    }
  }
});
