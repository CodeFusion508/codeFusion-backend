const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { params, body } = require("../utils/reqData.js");
const { GET_UUID, CREATE_CONTENT, UPDATE_CONTENT } = require("../modules/content/content.joi.js");


module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        // Content CRUD
        .post("/", endPoint(body, CREATE_CONTENT, createContent))
        .post("/problem", endPoint(body, CREATE_CONTENT, createContent))
        .post("/quiz", endPoint(body, CREATE_CONTENT, createContent))
        .post("/video", endPoint(body, CREATE_CONTENT, createContent))
        .post("/text", endPoint(body, CREATE_CONTENT, createContent))

        .put("/", endPoint(body, UPDATE_CONTENT, updateContent))
        .get("/:uuid/info", endPoint(params, GET_UUID, getContent))
        .delete("/:uuid", endPoint(params, GET_UUID, deleteContent));
};


const createContent = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.contentsCtrl.createContent(data));
const updateContent = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.contentsCtrl.updateContent(data));
const getContent = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.contentsCtrl.getContent(data));
const deleteContent = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.contentsCtrl.deleteContent(data));