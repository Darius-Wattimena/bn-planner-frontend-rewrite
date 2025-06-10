import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: '/',
  plugins: [react(),  svgr()],
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          utils: ['axios', 'axios-hooks', 'lodash-es', 'usehooks-ts'],
          ui: ['react-select', 'react-modal', 'react-tooltip', 'react-icons', 'react-collapsible'],
          virtual: ['react-virtualized'],
          infinite: ['react-infinite-scroll-component'],
        }
      }
    }
  }
})