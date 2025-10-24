import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // 外部からのアクセスを許可
    port: 5173,
    hmr: {
      clientPort: 443,
    },
    proxy: {},
    strictPort: true,
    allowedHosts: ['.ngrok-free.app', '.ngrok.io', 'localhost'],
  },
})
