import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Career/', // **IMPORTANT:** Your GitHub repo name, with slashes!
})