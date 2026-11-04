import { defineConfig } from '@playwright/test';

// A dedicated port, so tests can never run against another project's dev server.
const port = 4873;

export default defineConfig({
  testDir: 'tests',
  use: { baseURL: `http://localhost:${port}` },
  projects: [
    { name: 'light', use: { colorScheme: 'light' } },
    { name: 'dark', use: { colorScheme: 'dark' } },
  ],
  webServer: {
    command: `npx astro preview --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: false,
  },
});
