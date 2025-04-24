const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const tailwindcss = require('@tailwindcss/postcss7-compat');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services')
    }
  },

  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/socket.io': {
        target: 'ws://localhost:3000',
        ws: true
      }
    }
  },

  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['axios', 'socket.io-client']
          // Removed mapbox-gl from here since it's not installed
        }
      }
    }
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'socket.io-client'
      // Removed mapbox-gl from here since it's not installed
    ],
    exclude: ['@tailwindcss/postcss7-compat']
  }
});