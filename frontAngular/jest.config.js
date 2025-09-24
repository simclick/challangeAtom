/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(@angular|rxjs|tslib)/)'],
  testMatch: ['**/?(*.)+(spec).ts'],
  moduleFileExtensions: ['ts', 'html', 'js', 'mjs', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // 👈 alias como en TS
    '\\.(css|scss|sass)$':
      '<rootDir>/node_modules/jest-preset-angular/build/config/mocks/style-mock.js',
  },
  testEnvironmentOptions: { customExportConditions: ['browser', 'module', 'default'] },
};
