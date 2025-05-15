import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  optimizeDeps: {
    include: ['@mui/material', '@mui/types']
  },
  resolve: {
    alias: {
      '@mui/types': '@mui/types/index.d.ts'
    }
  }
})
