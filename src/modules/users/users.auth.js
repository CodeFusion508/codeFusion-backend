const jwt = require("jsonwebtoken");
const { SEED } = require("../../config/config.js");

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;

    try {
        if (!authorization) {
            throw new Error("Encabezado de autorización no encontrado.");
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            throw new Error("Token no encontrado.");
        }

        const decodedToken = jwt.decode(token, SEED);

        if (!decodedToken) {
            throw new Error("Token inválido.");
        }

        if (req.method !== "GET") {
            req.body.uuid = decodedToken.sub;
        }

        next();
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

module.exports = { verifyToken };