module.exports = (deps, ctrlList) => {
    let controllers = {};

    for (const [ctrlName, ctrlInit] of Object.entries(ctrlList)) {
        controllers[ctrlName] = ctrlInit(deps);

        process.stdout.write("Loading Controller " + `\x1b[92m${ctrlName}\x1b[39m\x1b[0m` + "\n");
    }

    return controllers;
};