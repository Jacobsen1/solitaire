import { defineConfig, devices } from '@playwright/test'

const PORT = 4317
const isCI = !!process.env.CI
const baseURL = `http://localhost:${PORT}/solitaire/`

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: [['html', { open: 'never' }], ...(isCI ? [['github'] as const] : []), ['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1600, height: 1000 } } },
  ],
  webServer: {
    // Test the production bundle (same output that is deployed to GitHub Pages).
    // CI type-checks and builds in a separate step, so it only needs to serve it.
    command: isCI ? 'npx vite preview' : 'npx vite build && npx vite preview',
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
})
