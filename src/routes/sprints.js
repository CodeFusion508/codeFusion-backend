const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { params, body } = require("../utils/reqData.js");
const {
    GET_UUID,
    CREATE_SPRINT,
    UPDATE_SPRINT
} = require("../modules/sprints/sprints.joi.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .post("/", endPoint(body, CREATE_SPRINT, createSprint))
        .get("/", endPoint(undefined, undefined, getAllSprints))
        .put("/", endPoint(body, UPDATE_SPRINT, updateSprint))
        .get("/:uuid", endPoint(params, GET_UUID, getSprint))
        .delete("/:uuid", endPoint(params, GET_UUID, deleteSprint))
        .get("/:uuid/rel", endPoint(params, GET_UUID, getSprintRels));
};

const createSprint = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.createSprint(data));
const getAllSprints = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.getAllSprints(data));
const updateSprint = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.updateSprint(data));
const getSprint = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.getSprint(data));
const deleteSprint = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.deleteSprint(data));
const getSprintRels = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.getSprintRels(data));