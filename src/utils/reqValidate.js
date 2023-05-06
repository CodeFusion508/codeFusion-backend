module.exports = (reqData, joi) => (req, res, next) => {

    if (reqData === undefined || joi === undefined) {
        return next();
    }

    const data = reqData(req, res);
    const { error, value } = joi.validate(data);

    if (error) {
        error.statusCode = 400;
        return next(error);
    }

    req.data = value;

    return next();
};