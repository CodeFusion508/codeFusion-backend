module.exports = (deps, ctrlList) => {
    let controllers = {};

    for (let [ctrlName, ctrlInit] of Object.entries(ctrlList)) {
        controllers[ctrlName] = ctrlInit(deps);
    }

    return controllers;
};