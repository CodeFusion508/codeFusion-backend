const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { params, body } = require("../utils/reqData.js");
const {
    CREATE_CONTENT_DAY,
    GET_UUID,
    UPDATE_CONTENT_DAY
} = require("../modules/contentDays/contentDays.joi.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .post("/", endPoint(body, CREATE_CONTENT_DAY, createContentDays))
        .put("/", endPoint(body, UPDATE_CONTENT_DAY, updateContentDays))
        .get("/:uuid", endPoint(params, GET_UUID, getContentDaysUuid))
        .delete("/:uuid", endPoint(params, GET_UUID, deleteContentDaysByUuid))
        .get("/relation/:uuid", endPoint(params, GET_UUID, getContentByDaysUuid));
};

const getContentDaysUuid = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.contentDayCtrl.getContentDays(data));
const createContentDays = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.contentDayCtrl.createContentDays(data));
const updateContentDays = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.contentDayCtrl.updateContentDays(data));
const deleteContentDaysByUuid = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.contentDayCtrl.deleteContentDays(data));
const getContentByDaysUuid = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.contentDayCtrl.getOneContentDayByUuid(data));