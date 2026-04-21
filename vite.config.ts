import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { stacksApi } from './vite-plugins/stacks-api'

export default defineConfig({
  plugins: [react(), tailwindcss(), stacksApi()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@stacks': path.resolve(__dirname, './stacks'),
    },
  },
})
