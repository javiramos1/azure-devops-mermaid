module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': ['babel-jest', { 
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
    }]
  },
  transformIgnorePatterns: [
    'node_modules/(?!(marked)/)'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  verbose: true,
  moduleNameMapper: {
    '^mermaid$': '<rootDir>/tests/__mocks__/mermaid.js',
    '^azure-devops-extension-sdk$': '<rootDir>/tests/__mocks__/azure-devops-extension-sdk.js'
  }
};
