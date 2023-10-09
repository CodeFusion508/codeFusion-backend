const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { params, body } = require("../utils/reqData.js");
const {
    GET_UUID,
    CREATE_DAY,
    UPDATE_DAY
} = require("../modules/days/days.joi.js");
const { verifyToken } = require("../utils/auth.js");


module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .get("/node/:uuid", endPoint(params, GET_UUID, getDay))
        .get("/node/rels/:uuid", endPoint(params, GET_UUID, getDayRels))
        // Admin Routes
        .post("/", verifyToken, endPoint(body, CREATE_DAY, createDay))
        .put("/", verifyToken, endPoint(body, UPDATE_DAY, updateDay))
        .delete("/node/:uuid", verifyToken, endPoint(params, GET_UUID, deleteDay))

        // Internal Use Only
        .delete("/bulk-test", endPoint(undefined, undefined, bulkTestDelete));
};


const createDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.createDay(data));
const updateDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.updateDay(data));
const getDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.getDay(data));
const deleteDay = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.deleteDay(data));

const getDayRels = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.getDaysRels(data));

const bulkTestDelete = ({ ctrls }) => (_, res, next) => endpointResponse(res, next)(ctrls.daysCtrl.bulkTestDelete());