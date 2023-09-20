const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;

    try {
        if (!authorization) {
            throw new Error("Encabezado de autorización no encontrado.");
        }

        const decodedToken = jwt.decode(authorization, process.env.SEED);

        if (!decodedToken) {
            throw new Error("Token inválido.");
        } else {
           if (decodedToken.uuid !== req.body.uuid) throw new Error("Token no coincide con tu información.");
        }

        next();
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

module.exports = { verifyToken };