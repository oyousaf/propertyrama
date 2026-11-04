// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://propertyrama.legxcysol.dev',
  trailingSlash: 'never',
  build: { format: 'file' },
  prefetch: { defaultStrategy: 'hover', prefetchAll: true },
  security: { csp: true },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-bricolage',
      weights: ['500 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Atkinson Hyperlegible Next',
      cssVariable: '--font-atkinson',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Verdana', 'sans-serif'],
    },
  ],
});
