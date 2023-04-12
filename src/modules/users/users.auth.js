const jwt = require("jsonwebtoken");

const { SEED } = require("../../config/config.txt");

const verifyToken = (req, _, next = Function) => {
    let error;
    const auth = req.headers.authorization;
    if (auth === undefined) {
        error = new Error("No tienes autorización");
        error.statusCode = 401;

        throw error;
    }

    const [, token] = auth.split(" ");

    if (token === undefined) {
        error = new Error("No tienes autorización");
        error.statusCode = 401;

        throw error;
    }

    const infoToken = jwt.decode(token, SEED);

    if (infoToken === undefined || infoToken === null) {
        error = new Error("Token Invalido");
        error.statusCode = 401;

        throw error;
    }

    if(req.method !=  "GET") {
        req["body"]["uuid"] = infoToken.sub
    }

    next();
};

module.exports = { verifyToken };