import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Career_Trial_Local/', // <- EXACT name of your repo!
})
