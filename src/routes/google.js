const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { body } = require("../utils/reqData.js");
const {
    GET_ALL_ANSWERS,
    GET_USER_ANSWERS,
    AUTH_G_USER
} = require("../modules/google/google.joi");
const { verifyToken } = require("../utils/auth.js");


module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .post("/users/", endPoint(body, AUTH_G_USER, gAuthentication))
        // Admin Routes
        .get("/sheets/all", verifyToken, endPoint(body, GET_ALL_ANSWERS, getAllAnswers))
        .get("/sheets/evaluation", verifyToken, endPoint(body, GET_USER_ANSWERS, getEvaluation));
};


const gAuthentication = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.googleCtrl.gAuthentication(data));
const getAllAnswers = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.googleCtrl.getUserAnswers(data));
const getEvaluation = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.googleCtrl.getEvaluation(data));