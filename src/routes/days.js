const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { params, body } = require("../utils/reqData.js");
const {
    GET_UUID,
    CREATE_DAY,
    UPDATE_DAY
} = require("../modules/days/days.joi.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .post("/", endPoint(body, CREATE_DAY, createDay))
        .put("/", endPoint(body, UPDATE_DAY, updateDay))
        .get("/", endPoint(undefined, undefined, getAllDays))
        .get("/:uuid", endPoint(params, GET_UUID, getDayByUuid))
        .get("/:uuid/rel", endPoint(params, GET_UUID, getDaysRels))
        .delete("/:uuid", endPoint(params, GET_UUID, deleteDayByUuid));
};


const getDayByUuid = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.getDay(data));
const createDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.createDay(data));
const getAllDays = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.getAllDays(data));
const updateDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.updatedDay(data));
const deleteDayByUuid = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.deleteDay(data));
const getDaysRels = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.getDaysRels(data));