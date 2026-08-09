import { defineConfig, devices } from '@playwright/test';

// Smoke test for the portfolio. Runs against a local `vite preview` server
// (started automatically via `webServer` below) so it does not depend on the
// live GitHub Pages site or the network.
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  retries: 0,
  reporter: [['list']],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4173/Alif_Rahman/',
    reuseExistingServer: true,
    timeout: 120000,
  },
  use: {
    baseURL: 'http://localhost:4173/Alif_Rahman/',
    headless: true,
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
