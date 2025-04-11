import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  const isRender = env.RENDER === 'true'; // Render.com sets this automatically

  return {
    // Render.com specific base path
    base: isRender ? '/' : '/', // Change to '/vertexsol/' if using subpath on Render
    
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

    define: {
      global: 'window',
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },

    server: {
      port: 3000,
      strictPort: true,
      // Enable HTTPS for Telegram WebApp local testing
      https: !isProduction,
      hmr: {
        protocol: isProduction ? undefined : 'wss',
      },
    },

    build: {
      target: 'esnext',
      minify: isProduction ? 'terser' : false,
      sourcemap: isProduction ? false : 'inline',
      assetsInlineLimit: 4096,
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
      // Render.com needs clear output
      outDir: 'dist',
      emptyOutDir: true,
    },

    // Render.com optimization
    optimizeDeps: {
      include: ['@solana/web3.js'],
      exclude: ['js-big-decimal'],
    },
  };
});
