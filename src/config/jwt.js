const jwt = require("jwt-simple");
const moment = require("moment");

exports.createToken = function (user) {
    const payload = {
        uuid     : user.uuid,
        userName : user.userName,
        email    : user.email,
        iat      : moment().unix(), // Creation date of the token
        exp      : moment().add(2, "hour").unix(), // Expiration date of the token
    };

    return jwt.encode(payload, process.env.SEED);
};

exports.decodeToken = function (token) {
    return jwt.decode(token, process.env.SEED);
};