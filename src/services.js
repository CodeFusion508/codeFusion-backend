module.exports = async (deps, servicesList) => {
    for (const [serviceName, serviceMethod] of Object.entries(servicesList)) {
        process.stdout.write("Loading Service " + `\x1b[95m${serviceName}\x1b[39m\x1b[0m` + "\n");

        deps.services[serviceName] = await serviceMethod(deps);
    }

    return deps.services;
};