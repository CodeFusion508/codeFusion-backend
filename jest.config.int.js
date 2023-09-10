module.exports = {
    testSequencer         : "./config/jest-sequencer.js",
    testMatch             : ["**/*.int.test.js"],
    testTimeout           : 8000,
    maxWorkers            : "25%",
    workerThreads         : true,
    workerIdleMemoryLimit : 0.2
};