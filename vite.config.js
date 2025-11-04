// vite.config.js (The required change)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 🎯 Must match the GitHub repository name
  base: '/Career_Trial_Local/',
})
