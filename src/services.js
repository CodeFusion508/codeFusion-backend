module.exports = async (deps, servicesList) => {
    for (const [serviceName, serviceMethod] of Object.entries(servicesList)) {
        deps.services[serviceName] = await serviceMethod(deps);
    }

    return deps.services;
};