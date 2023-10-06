const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const {
    params,
    body,
    bodyAndParams
} = require("../utils/reqData.js");
const {
    GET_UUID,
    CREATE_PROBLEM,
    CREATE_QUIZ,
    CREATE_VIDEO,
    CREATE_TEXT,
    UPDATE_CONTENT
} = require("../modules/content/content.joi.js");
const { verifyToken } = require("../utils/auth.js");


module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        // Content Creation
        .post("/problem", verifyToken, endPoint(body, CREATE_PROBLEM, createContent))
        .post("/quiz", verifyToken, endPoint(body, CREATE_QUIZ, createContent))
        .post("/video", verifyToken, endPoint(body, CREATE_VIDEO, createContent))
        .post("/text", verifyToken, endPoint(body, CREATE_TEXT, createContent))

        .put("/:label", verifyToken, endPoint(bodyAndParams, UPDATE_CONTENT, updateContent))
        .get("/node/:uuid", endPoint(params, GET_UUID, getContent))
        .delete("/node/:uuid", verifyToken, endPoint(params, GET_UUID, deleteContent))

        // Internal Use Only
        .delete("/bulk-test", endPoint(undefined, undefined, bulkDeleteTests));
};


const createContent = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.contentsCtrl.createContent(data));
const updateContent = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.contentsCtrl.updateContent(data));
const getContent = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.contentsCtrl.getContent(data));
const deleteContent = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.contentsCtrl.deleteContent(data));

const bulkDeleteTests = ({ ctrls }) => (_, res, next) => endpointResponse(res, next)(ctrls.contentsCtrl.bulkTestDelete());