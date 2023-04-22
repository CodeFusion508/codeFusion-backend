"use strict";

/* Users tokens */

const jwt = require("jwt-simple");
const moment = require("moment");
const { SEED } = require("./config.js");

exports.createToken = function (user) {
    const payload = {
        sub   : user.uuid,
        name  : user.userName,
        email : user.email,
        iat   : moment().unix(), // Creation date of the token
        exp   : moment().add(2, "hour").unix(), // Expiration date of the token
    };

    return jwt.encode(payload, SEED);
};

exports.decodeToken = function (token) {
    return jwt.decode(token, SEED);
};
