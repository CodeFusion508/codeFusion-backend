const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const {
    params,
    body,
} = require("../utils/reqData.js");
const {
    createSECTION,
    updateSECTION,
    getUUID
} = require("../modules/sections/sections.joi.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .get("/:uuid", endPoint(params, getUUID, getSection))
        .get("/", endPoint(undefined, undefined, getSections))
        .post("/", endPoint(body, createSECTION, createSection))
        .put("/", endPoint(body, updateSECTION, updateSection))
        .delete("/:uuid", endPoint(params, getUUID, deleteSection));
};


const getSection = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sectionsCtrl.getSection(data));
const createSection = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sectionsCtrl.createSection(data));
const getSections = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sectionsCtrl.getSections(data));
const updateSection = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sectionsCtrl.updateSection(data));
const deleteSection = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sectionsCtrl.deleteSection(data));