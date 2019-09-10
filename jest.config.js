module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/test.config.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
  restoreMocks: true,
  testEnvironment: 'jsdom',
};
