const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { params, body } = require("../utils/reqData.js");
const { GET_UUID, CREATE_DAY, UPDATE_DAY } = require("../modules/days/days.joi.js");


module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        // Day CRUD
        .post("/", endPoint(body, CREATE_DAY, createDay))
        .get("/", endPoint(undefined, undefined, getAllDays))
        .put("/", endPoint(body, UPDATE_DAY, updateDay))
        .get("/:uuid/info", endPoint(params, GET_UUID, getDay))
        .delete("/:uuid", endPoint(params, GET_UUID, deleteDay))
        // Day Relationships
        .get("/:uuid/rel", endPoint(params, GET_UUID, getDayRels));
};


const createDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.createDay(data));
const getAllDays = ({ ctrls }) => (_, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.getAllDays());
const updateDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.updatedDay(data));
const getDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.getDay(data));
const deleteDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.deleteDay(data));

const getDayRels = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.getDaysRels(data));