const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { params, body } = require("../utils/reqData.js");
const {
    CREATE_USER,
    LOGIN_USER,
    UPDATE_USER,
    GET_UUID,
    CREATE_RELATION,
    DELETE_RELATION,
    CONFIRM_ACCOUNT,
    RECOVERY_ACCOUNT
} = require("../modules/users/users.joi.js");
const auth = require("../modules/users/users.auth.js");


module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        // Student CRUD
        .post("/", endPoint(body, CREATE_USER, signUp))
        .post("/login", endPoint(body, LOGIN_USER, logIn))
        .put("/", auth.verifyToken, endPoint(body, UPDATE_USER, updateUser))
        .delete("/:uuid", auth.verifyToken, endPoint(params, GET_UUID, deleteUser))
        .get("/:uuid", auth.verifyToken, endPoint(params, GET_UUID, getUser))
        // Student Relationships
        .delete("/rel", auth.verifyToken, endPoint(body, DELETE_RELATION, deleteRel))
        .post("/create/rel", auth.verifyToken, endPoint(body, CREATE_RELATION, createRel))
        // Other Student Logic
        .post("/confirm-account", endPoint(body, CREATE_USER , confirmCreatedAccount))
        .get("/confirm-account-token/:token", endPoint(params, CONFIRM_ACCOUNT , confirmAccount))
        .post("/recovery/account", endPoint(body, RECOVERY_ACCOUNT, recoveryAccount));
};


const signUp = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.createUser(data));
const logIn = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.logIn(data));
const getUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getUser(data));
const updateUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.updateUser(data));
const deleteUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.deleteUser(data));

const deleteRel = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.deleteRel(data));
const createRel = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.createRel(data));

const confirmCreatedAccount = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.WaitingForAccountConfirmation(data));
const confirmAccount = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.confirmAccount(data));
const recoveryAccount = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.recoveryAccount(data));