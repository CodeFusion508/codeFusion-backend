const verifyToken = (req, res, next) => {
    const { adminKey } = req.headers;

    try {
        if (!adminKey) {
            throw new Error("You don't have permission to access this route.");
        }

        if (adminKey !== process.env.ADMIN_KEY) {
            throw new Error("Incorrect Key");
        }

        next();
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

module.exports = { verifyToken };