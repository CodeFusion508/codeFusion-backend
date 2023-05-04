const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { params, body } = require("../utils/reqData.js");
const auth = require("../modules/users/users.auth.js");
const {
    CREATE_USER,
    LOGIN_USER,
    UPDATE_USER,
    GET_UUID,
    GET_ALL_ANSWERS,
    GET_USER_ANSWERS,
    CREATE_RELATION,
    DELETE_RELATION,

    CREATE_G_USER,
    LOGIN_G_USER,
} = require("../modules/users/users.joi.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        // Student CRUD
        .get("/:uuid", auth.verifyToken, endPoint(params, GET_UUID, getUser))
        .get("/all_ans", endPoint(body, GET_ALL_ANSWERS, getAllAnswers))
        .get("/ans", endPoint(body, GET_USER_ANSWERS, getEvaluation))
        .post("/create/rel", auth.verifyToken,  endPoint(body, CREATE_RELATION, createRel))
        .post("/", endPoint(body, CREATE_USER, signUp))
        .post("/login", endPoint(body, LOGIN_USER, logIn))
        .post("/google", endPoint(body, CREATE_G_USER, gSignUp))
        .post("/gVerify", endPoint(body, LOGIN_G_USER, gLogIn))
        .put("/", auth.verifyToken, endPoint(body, UPDATE_USER, updateUser))
        .delete("/:uuid", auth.verifyToken, endPoint(params, GET_UUID, deleteUser))
        // Student Relationships
        .delete("/rel", auth.verifyToken, endPoint(body, DELETE_RELATION, deleteRel));
        // Other

};


const signUp = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.createUser(data));
const logIn = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.logIn(data));
const getUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getUser(data));
const updateUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.updateUser(data));
const deleteUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.deleteUser(data));

const createRel = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.createRel(data));
const deleteRel = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.deleteRel(data));

const gSignUp = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.createGUser(data));
const gLogIn = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.loginGUser(data));
const getAllAnswers = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getUserAnswers(data));
const getEvaluation = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getEvaluation(data));