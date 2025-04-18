module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/renderer/src/$1'
  },
  testPathIgnorePatterns: ['/node_modules/', '/e2e/', '/dist/', '.*\\.spec\\.(ts|tsx|js|jsx)$'],
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'],
  // Принудительно игнорируем файлы .spec
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        diagnostics: {
          excludeNodeModules: true,
          ignoreCodes: [2322, 2339]
        }
      }
    ]
  }
}
