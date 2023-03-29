const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const {
    params,
    body,
} = require("../utils/reqData.js");
const {
    GET_UUID,
    CREATE_SECTION,
    UPDATE_SECTION
} = require("../modules/sections/sections.joi.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .get("/", endPoint(undefined, undefined, getSections))
        .post("/", endPoint(body, CREATE_SECTION, createSection))
        .put("/", endPoint(body, UPDATE_SECTION, updateSection))
        .get("/:uuid", endPoint(params, GET_UUID, getSection))
        .delete("/:uuid", endPoint(params, GET_UUID, deleteSection));
};


const getSection = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sectionsCtrl.getSection(data));
const createSection = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sectionsCtrl.createSection(data));
const getSections = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sectionsCtrl.getSections(data));
const updateSection = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sectionsCtrl.updateSection(data));
const deleteSection = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sectionsCtrl.deleteSection(data));