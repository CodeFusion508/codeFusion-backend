const express = require("express");

const { endpointMethods, endpointResponse } = require("../modules/users/users.util.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return express.Router()
        .get("/:uuid", endPoint(getUser))
        .post("/signUp", endPoint(signUp));
};


const getUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getUser(data));
const signUp = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.createUser(data));