import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // 👇 關鍵邏輯：如果是 build (打包上傳) 就加上儲存庫名稱，否則用根目錄
  base: command === 'build' ? '/HK_trip/' : '/',
}))