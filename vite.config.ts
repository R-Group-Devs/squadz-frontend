import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'REACT_APP_',
  resolve: {
    alias: {
      process: 'process/browser',
      util: 'util',
    },
  },
  define: {
    'process.env': process.env,
    'global': 'globalThis'
  }
})
