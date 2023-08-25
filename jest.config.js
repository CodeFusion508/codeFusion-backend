module.exports = {
  clearMocks             : true,
  coverageDirectory      : "coverage",
  coverageProvider       : "v8",
  testSequencer          : "./jest-sequencer.js",
  testMatch              : ["src/**/*.test.js", "**/*.test.js"],
  testPathIgnorePatterns : ["<rootDir>/integration/", "<rootDir>/node_modules/"]
};