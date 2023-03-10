const express = require("express");

const { endpointWrapper, endpointResponse } = require("../modules/users/users.util.js");

module.exports = (deps) => {
    const endPoint = endpointWrapper(deps);

    return express.Router()
        .get("/", endPoint(getUsers))
        .post("/signUp", endPoint(signUp));
};


const getUsers = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getUsers(data));
const signUp = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.createUser(data));