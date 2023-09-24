const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { body } = require("../utils/reqData.js");
const {
    GET_ALL_ANSWERS,
    GET_USER_ANSWERS,
    CREATE_G_USER
} = require("../modules/google/google.joi");


module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .post("/users/", endPoint(body, CREATE_G_USER, gSignUp))
        .get("/sheets/all", endPoint(body, GET_ALL_ANSWERS, getAllAnswers))
        .get("/sheets/evaluation", endPoint(body, GET_USER_ANSWERS, getEvaluation));
};


const gSignUp = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.googleCtrl.createGUser(data));
const getAllAnswers = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.googleCtrl.getUserAnswers(data));
const getEvaluation = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.googleCtrl.getEvaluation(data));