module.exports = {
    testSequencer         : "./config/jest-sequencer.js",
    testMatch             : ["**/*.int.test.js"],
    maxWorkers            : "25%",
    workerThreads         : true,
    workerIdleMemoryLimit : 0.2
};