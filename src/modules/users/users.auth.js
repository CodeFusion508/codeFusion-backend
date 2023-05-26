const jwt = require("jsonwebtoken");

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

        const decodedToken = jwt.decode(token, process.env.SEED);

        if (!decodedToken) {
            throw new Error("Token inválido.");
        }

        next();
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

module.exports = { verifyToken };