module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.(spec|test).ts$',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!**/server.ts',
    // '!<rootDir>/src/**/*.protocol.ts',
    // '!**/index.ts',
    // '!**/__tests__/**'
  ],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '~/(.*)': '<rootDir>/$1'
  }
};