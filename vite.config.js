import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://app.vsystech.net',  // Your backend URL
        changeOrigin: true,  // This allows the Vite server to pretend it's the backend
        // rewrite: (path) => path.replace(/^\/api/, ''), // Optional, but only needed if you're changing the path
      },
    },
  },
  plugins: [react()],
})

