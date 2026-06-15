import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/', // ganti 'portfolio' sesuai nama repo kamu di GitHub
})
