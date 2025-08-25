import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/onlyoffice': {
        target: 'http://62.217.177.216:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/onlyoffice/, ''),
      },
    },
  },
});
