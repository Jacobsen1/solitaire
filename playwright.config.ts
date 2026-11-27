import { defineConfig, devices } from '@playwright/test'

const PORT = 4317
const isCI = !!process.env.CI

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [['html', { open: 'never' }], ['github'], ['list']] : [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: `http://localhost:${PORT}/solitaire/`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1600, height: 1000 },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1600, height: 1000 } } },
  ],
  webServer: {
    // Test the production bundle (same output that is deployed to GitHub Pages).
    // CI builds in a separate step, so it only needs to serve it.
    command: isCI ? 'npm run preview' : 'npm run build && npm run preview',
    url: `http://localhost:${PORT}/solitaire/`,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
})
