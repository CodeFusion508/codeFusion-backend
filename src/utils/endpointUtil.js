const validate = require("./reqValidate.js");

const endpointMethods = (deps) => (reqData, joi, method) => [
    validate(reqData, joi),
    method(deps)
];

const endpointResponse = (res) => (promise) => promise.then((response) => {
    res.send(response);
}).catch(({ err, message }) => {
    let error;

    if (err) {
        error = new Error(message);
        error.statusCode = err;
    } else {
        error = new Error("Ocurrió un error inesperado al procesar su solicitud. Vuelva a intentarlo más tarde o póngase en contacto con nosotros en nuestro github.");
        error.statusCode = 500;
    }

    res.status(error.statusCode).send(error.message);
});

module.exports = { endpointMethods, endpointResponse };