// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  // SSR
  output: 'server',

  adapter: node({
    mode: 'standalone'
  }),

  integrations: [vue()]
});