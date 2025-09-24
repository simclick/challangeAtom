/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/unit/**/*.spec.ts'],     // ← solo unit
  testPathIgnorePatterns: ['/node_modules/', '/tests/integration/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
};
