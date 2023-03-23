const validate = require("./userValidate.js");

const endpointMethods = (deps) => (reqData, joi, method) => [
    validate(reqData, joi),
    method(deps)
];

const endpointResponse = (res, next) => (promise) => promise.then((response) => {
    res.send(response);

}).catch(({ err, message }) => {
    let error;

    if (err) {
        error = new Error(message);
        error.statusCode = err;
    } else {
        error = new Error("An unexpected error occurred while processing your request. Please try again later, or contact us at our github.");
        error.statusCode = 500;
    }

    next(error);
});

module.exports = {
    endpointMethods,
    endpointResponse
};