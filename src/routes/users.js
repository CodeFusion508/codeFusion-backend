const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { params, body } = require("../utils/reqData.js");
const auth = require("../modules/users/users.auth.js");
const {
    CREATE_USER,
    LOGIN_USER,
    UPDATE_USER,
    GET_UUID,
    CREATE_RELATION,
    DELETE_RELATION
} = require("../modules/users/users.joi.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        // Student CRUD
        .post("/", endPoint(body, CREATE_USER, signUp))
        .post("/login", endPoint(body, LOGIN_USER, logIn))
        .get("/:uuid", auth.verifyToken, endPoint(params, GET_UUID, getUser))
        .put("/", auth.verifyToken, endPoint(body, UPDATE_USER, updateUser))
        .delete("/:uuid", auth.verifyToken, endPoint(params, GET_UUID, deleteUser))
        // Student Relationships
        .post("/create/rel", auth.verifyToken,  endPoint(body, CREATE_RELATION, createRel))
        .delete("/delete/rel", auth.verifyToken, endPoint(body, DELETE_RELATION, deleteRel));
};


const signUp = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.createUser(data));
const logIn = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.logIn(data));
const getUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getUser(data));
const updateUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.updateUser(data));
const deleteUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.deleteUser(data));

const createRel = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.createRel(data));
const deleteRel = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.deleteRel(data));