import { defineNuxtConfig } from 'nuxt/config'
import dotenv from 'dotenv'

dotenv.config()

export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  ui: {
    global: true
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:8080', // API URL
    },
  },

  css: ['~/assets/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2024-11-27',
})
