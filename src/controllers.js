module.exports = async (deps, ctrlList) => {
    for (const [ctrlName, ctrlInit] of Object.entries(ctrlList)) {
        process.stdout.write("Loading Controller " + `\x1b[92m${ctrlName}\x1b[39m\x1b[0m` + "\n");

        deps.ctrls[ctrlName] = await ctrlInit(deps);
    }

    return deps.ctrls;
};