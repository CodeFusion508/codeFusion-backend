const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../modules/users/users.util.js");
const {
    params,
    body,
} = require("./reqData.js");

const auth = require("../modules/users/users.auth.js");

const {
    getUUID,
    createUSER,
    updateUSER,
    logInUSER
} = require("../modules/users/users.joi.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .get("/", auth.verifyToken, endPoint(params, getUUID, getUser))
        .post("/signUp", endPoint(body, createUSER, signUp))
        .put("/updateUser", auth.verifyToken, endPoint(body, updateUSER, updateUser))
        .post("/logIn", endPoint(body, logInUSER, logIn))
        .delete("/:uuid/deleteUser", auth.verifyToken, endPoint(params, getUUID, deleteUser));
};


const getUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getUser(data));
const signUp = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.createUser(data));
const updateUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.updateUser(data));
const deleteUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.deleteUser(data));
const logIn = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.logIn(data));