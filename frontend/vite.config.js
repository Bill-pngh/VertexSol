import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  // GitHub Pages configuration
  base: '/vertexsol/', // Must exactly match your repository name
  build: {
    target: 'esnext',
    outDir: '../dist', // Build outside project to avoid Jekyll
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].[hash].[ext]`,
        manualChunks: {
          solana: ['@solana/web3.js'],
          charts: ['chart.js', 'react-chartjs-2'],
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },

  // Required for Telegram WebApp
  define: {
    global: 'window'
  },

  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        svgoConfig: {
          plugins: [{
            name: 'preset-default',
            params: {
              overrides: { removeViewBox: false }
            }
          }]
        }
      }
    })
  ],

  // Local development
  server: {
    port: 3000,
    strictPort: true,
    https: true, // Required for Telegram WebApp
    hmr: { protocol: 'wss' }
  }
});
