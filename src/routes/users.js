const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../modules/users/users.util.js");
const {
    params,
    body,
} = require("./reqData.js");
const {
    getUUID,
    createUSER,
    updateUSER
} = require("../modules/users/users.joi.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .get("/:uuid", endPoint(params, getUUID, getUser))
        .post("/signUp", endPoint(body, createUSER, signUp))
        .put("/updateUser", endPoint(body, updateUSER, updateUser))
        .delete("/:uuid/deleteUser", endPoint(params, getUUID, deleteUser));
};


const getUser = ({ ctrls }) => (req, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getUser(req));
const signUp = ({ ctrls }) => (req, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.createUser(req));
const updateUser = ({ ctrls }) => (req, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.updateUser(req));
const deleteUser = ({ ctrls }) => (req, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.deleteUser(req));