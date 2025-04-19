import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setup-jest.ts'],
  testPathIgnorePatterns: ['**/*.spec.{js,jsx,ts,tsx}']
}

export default config
