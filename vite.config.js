// vite.config.js (The correct version)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ✅ CORRECT: Must be the repository name, surrounded by slashes.
  base: '/Career_Trial_Local/', 
})
