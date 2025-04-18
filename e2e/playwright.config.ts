import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './test',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry'
  },
  testMatch: ['**/*.spec.{js,jsx,ts,tsx}'],
  testIgnore: ['**/*.test.{js,jsx,ts,tsx}', '**/node_modules/**', '**/src/**'],
  projects: [
    {
      name: 'e2e',
      testMatch: '**/*.spec.{js,jsx,ts,tsx}'
    }
  ]
}

export default config
