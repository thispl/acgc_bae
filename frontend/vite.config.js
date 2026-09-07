import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
  return {
    base:
      mode === 'development'
        ? '/'
        : '/assets/acgc_bae/frontend/',

    plugins: [
      vue(),
    ],
    server: {
      port: 8080,
      proxy: {
        '^/(api|app|assets|files)': {
          target: "https://acgc.teamproit.com",
          changeOrigin: true,
          secure: false
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: `../acgc_bae/public/frontend`,
      emptyOutDir: true,
      target: 'es2015',
    },

  }
})