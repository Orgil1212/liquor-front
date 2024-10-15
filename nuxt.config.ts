import { defineNuxtConfig } from 'nuxt/config';
import dotenv from 'dotenv';

// .env файлыг ачаалж
dotenv.config();

export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: process.env.API_SECRET || 'default_secret_key',
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:8080',
      publicApiKey: process.env.PUBLIC_API_KEY || 'default_public_key',
    },
  },
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
