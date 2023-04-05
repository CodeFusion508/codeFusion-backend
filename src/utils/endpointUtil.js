const validate = require("./reqValidate.js");

const endpointMethods = (deps) => (reqData, joi, method) => [
    validate(reqData, joi),
    method(deps)
];

const endpointResponse = (res, next) => (promise) => promise.then((response) => {
    res.send(response);
}).catch(({ err, message }) => {
    let error;
    console.log(message, "inside endPointUtil.js messaje");
    if (err) {
        error = new Error(message);
        error.statusCode = err;
        console.log(error, "inside endPointUtil.js");
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