/** @type {import('jest').Config} */
const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [path.join(__dirname, '__tests__', 'setup.js')],
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.cjs' }],
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  testRegex: String.raw`__tests__[\\/].*\.(test|spec)\.(jsx?|tsx?)$`,
  modulePathIgnorePatterns: [path.join(__dirname, 'namerrsconcept')],
  testPathIgnorePatterns: [path.join(__dirname, 'namerrsconcept')],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/firebase/**',
  ],
  haste: {
    forceNodeFilesystemAPI: true,
  },
};