import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  // GitHub Pages requires base path matching repo name
  base: '/vertexsol/', // Must match your GitHub repo name exactly

  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      },
    }),
  ],

  // Required for Telegram WebApp
  define: {
    global: 'window',
  },

  build: {
    target: 'esnext',
    outDir: 'docs', // GitHub Pages looks for docs/ folder
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
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
          ],
        },
      },
    },
  },

  // Development server (local only)
  server: {
    port: 3000,
    strictPort: true,
    https: true, // Required for Telegram WebApp local testing
    hmr: {
      protocol: 'wss',
    },
  },
});
