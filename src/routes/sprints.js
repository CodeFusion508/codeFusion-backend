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
        .put("/", endPoint(body, UPDATE_SPRINT, updateSprint))
        .get("/:uuid", endPoint(params, GET_UUID, getSprintByUuid))
        .delete("/:uuid", endPoint(params, GET_UUID, deleteSprintByUuid))
        .get("/", endPoint(undefined, undefined, getAllSprints))
        .get("/rel/:uuid", endPoint(params, GET_UUID, getSprintRelations));
};


const getSprintByUuid = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.getSprint(data));
const createSprint = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.createSprint(data));
const updateSprint = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.updatedSprint(data));
const deleteSprintByUuid = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.deleteSprint(data));
const getAllSprints = ({ ctrls }) => (req, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.getAllSprints());
const getSprintRelations = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.getSprintRelations(data));