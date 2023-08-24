const path = require("path");

const Sequencer = require("@jest/test-sequencer").default;


class FolderSequencer extends Sequencer {
    sort(tests) {
        // Group tests by their directory
        const testsByFolder = tests.reduce((result, test) => {
            const folder = path.dirname(test.path);
            if (!result[folder]) {
                result[folder] = [];
            }
            result[folder].push(test);
            return result;
        }, {});

        // Flatten the groups and sort them alphabetically by folder name
        const sortedTests = Object.keys(testsByFolder)
            .sort()
            .flatMap(folder => testsByFolder[folder]);

        return sortedTests;
    }
}

module.exports = FolderSequencer;