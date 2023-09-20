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
        .get("/node/:uuid", endPoint(params, GET_UUID, getDay))
        .delete("/node/:uuid", endPoint(params, GET_UUID, deleteDay))
        // Day Relationships
        .get("/node/rels/:uuid", endPoint(params, GET_UUID, getDayRels))
        // Internal Use Only
        .delete("/bulk-test", endPoint(undefined, undefined, bulkTestDelete));
};


const createDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.createDay(data));
const getAllDays = ({ ctrls }) => (_, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.getAllDays());
const updateDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.updateDay(data));
const getDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.getDay(data));
const deleteDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.deleteDay(data));

const getDayRels = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.getDaysRels(data));

const bulkTestDelete = ({ ctrls }) => (_, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.bulkTestDelete());