module.exports = {
  clearMocks             : true,
  coverageDirectory      : "coverage",
  coverageProvider       : "v8",
  testSequencer          : "./config/jest-sequencer.js",
  testMatch              : ["src/**/*.test.js", "**/*.test.js"],
  testPathIgnorePatterns : ["<rootDir>/integration/", "<rootDir>/node_modules/"],
  maxWorkers             : "25%",
  workerThreads          : true,
  workerIdleMemoryLimit  : 0.2
};