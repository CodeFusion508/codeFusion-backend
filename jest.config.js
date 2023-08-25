/** @type {import('jest').Config} */

module.exports = {
  clearMocks        : true,
  coverageDirectory : "coverage",
  coverageProvider  : "v8",
  testSequencer     : "./jest-sequencer.js",
};