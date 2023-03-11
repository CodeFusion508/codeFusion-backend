module.exports = async (deps, servicesList) => {
    for (const [serviceName, serviceMethod] of Object.entries(servicesList)) {
        deps.services[serviceName] = await serviceMethod(deps);

        process.stdout.write("Loading Service " + `\x1b[95m${serviceName}\x1b[39m\x1b[0m` + "\n");
    }

    return deps.services;
};