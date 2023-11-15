import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import react from '@astrojs/react'
import sanity from '@sanity/astro'

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapters: vercel(),
  integrations: [
    tailwind(),
    sanity({
      projectId: '4zd5l3k5',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/admin',
    }),
    react(),
  ],
})
