const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { params, body } = require("../utils/reqData.js");
const auth = require("../modules/users/users.auth.js");
const {
    GET_UUID,
    CREATE_USER,
    LOGIN_USER,
    UPDATE_USER
} = require("../modules/users/users.joi.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .post("/", endPoint(body, CREATE_USER, signUp))
        .post("/login", endPoint(body, LOGIN_USER, logIn))
        .put("/", auth.verifyToken, endPoint(body, UPDATE_USER, updateUser))
        .get("/:uuid", auth.verifyToken, endPoint(params, GET_UUID, getUser))
        .delete("/:uuid", auth.verifyToken, endPoint(params, GET_UUID, deleteUser));
};


const getUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getUser(data));
const signUp = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.createUser(data));
const updateUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.updateUser(data));
const deleteUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.deleteUser(data));
const logIn = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.logIn(data));