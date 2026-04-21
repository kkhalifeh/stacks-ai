import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { stacksApi } from './vite-plugins/stacks-api'
import { brandApi } from './vite-plugins/brand-api'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'ANTHROPIC_')
  return {
    plugins: [
      react(),
      tailwindcss(),
      stacksApi(),
      brandApi({ apiKey: env.ANTHROPIC_API_KEY, model: env.ANTHROPIC_BRAND_MODEL }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@stacks': path.resolve(__dirname, './stacks'),
      },
    },
  }
})
