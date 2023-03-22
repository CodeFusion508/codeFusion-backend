const validate = require("./userValidate.js");

const endpointMethods = (deps) => (reqData, joi, method) => [
    validate(reqData, joi),
    method(deps)
];

const endpointResponse = (res, next) => (promise) => promise.then((response) => {
    res.send(response);

}).catch(({err, message}) => {
    let error;

    switch (err) {
        case 400:
            error = new Error(message);
            error.statusCode = 400;

            break;
        case 401:
            error = new Error(message);
            error.statusCode = 401;

            break;
        case 403:
            error = new Error(message);
            error.statusCode = 403;

            break;
        case 404:
            error = new Error(message);
            error.statusCode = 404;

            break;
        default:
            error = new Error("An unexpected error occurred while processing your request. Please try again later, or contact us at our github.");
            error.statusCode = 500;

            break;
    }

    next(error);
});

module.exports = {
    endpointMethods,
    endpointResponse
};