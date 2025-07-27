import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import React from 'react'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server:{
    port:5173,
    strictPort:true,
  }
})