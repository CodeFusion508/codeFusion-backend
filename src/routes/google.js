const {Router} = require("express");

const {endpointMethods, endpointResponse} = require("../utils/endpointUtil.js");
const {body} = require("../utils/reqData.js");
const {
    GET_ALL_ANSWERS,
    GET_USER_ANSWERS,
    CREATE_G_USER,
    LOGIN_G_USER,
} = require("../modules/users/users.joi.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .post("/", endPoint(body, CREATE_G_USER, gSignUp))
        .post("/ver", endPoint(body, LOGIN_G_USER, gLogIn))
        .get("/all", endPoint(body, GET_ALL_ANSWERS, getAllAnswers))
        .get("/", endPoint(body, GET_USER_ANSWERS, getEvaluation));
};
const gSignUp = ({ctrls}) => ({data}, res, next) => endpointResponse(res, next)(ctrls.googleCtrl.createGUser(data));
const gLogIn = ({ctrls}) => ({data}, res, next) => endpointResponse(res, next)(ctrls.googleCtrl.loginGUser(data));
const getAllAnswers = ({ctrls}) => ({data}, res, next) => endpointResponse(res, next)(ctrls.googleCtrl.getUserAnswers(data));
const getEvaluation = ({ctrls}) => ({data}, res, next) => endpointResponse(res, next)(ctrls.googleCtrl.getEvaluation(data));