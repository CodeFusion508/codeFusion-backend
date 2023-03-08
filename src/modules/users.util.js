const endpointWrapper = (deps) => (method) => [
    method(deps)
];

const endpointResponse = (res, next) => (promise) => promise.then((response) => {
    res.send(response);

}).catch(next);

module.exports = {
    endpointWrapper,
    endpointResponse
};