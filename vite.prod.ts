import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // chunk all node_modules
          if (id.includes('node_modules')) {
            const dep = id.toString().split('node_modules/')[1].split('/')[0];
            return dep;
          }
        },
      },
    },
  },
  base: '/',
},
)