const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../modules/users/users.util.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .get("/:uuid", endPoint(getUser))
        .put("/:uuid/update", endPoint(updateUser))
        .post("/signUp", endPoint(signUp));
};


const getUser = ({ ctrls }) => (req, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getUser(req));
const signUp = ({ ctrls }) => (req, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.createUser(req));
const updateUser = ({ ctrls }) => (req, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.updateUser(req));