const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { body } = require("../utils/reqData.js");
const { AUTH_G_USER } = require("../modules/google/google.joi");


module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .post("/users/", endPoint(body, AUTH_G_USER, gAuthentication));
};


const gAuthentication = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.googleCtrl.gAuthentication(data));