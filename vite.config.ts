import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The app is published to GitHub Pages under /solitaire/
export default defineConfig({
  base: '/solitaire/',
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 4317,
    strictPort: true,
  },
})
