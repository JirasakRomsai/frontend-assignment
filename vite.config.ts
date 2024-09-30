import { defineConfig } from 'vite'
import dotenv from 'dotenv';

import react from '@vitejs/plugin-react'

dotenv.config({ path: `.env` });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  define: {
    'process.env': process.env,
  },
})
