// load environment variables from .env file
import { loadEnv } from 'vite';
const {
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET
} = loadEnv(import.meta.env.MODE, process.cwd(), '');
const projectId = PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_DATASET;
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [sanity({
    projectId,
    dataset,
    studioBasePath: '/admin',
    useCdn: false,
    apiVersion: '2023-03-20'
  }), react(), tailwind(), prefetch()]
});