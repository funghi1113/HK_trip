import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // ⚠️ 注意：這裡 '/hong-kong-trip/' 必須跟你在 GitHub 取的專案名稱一模一樣！
  // 格式是：'/專案名稱/' (前後都要有斜線)
  base: '/HK_trip/', 
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})