const verifyToken = (req, res, next) => {
    const { adminHash } = req.headers;

    try {
        if (!adminHash) {
            throw new Error("No tienes la autorización de modificar esta ruta.");
        }

        if (adminHash !== process.env.ADMIN_HASH) {
            throw new Error("Hash inválido.");
        }

        next();
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

module.exports = { verifyToken };