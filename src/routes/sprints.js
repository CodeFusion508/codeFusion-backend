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
        .delete("/:uuid", endPoint(params, GET_UUID, deleteSprintByUuid));
};


const getSprintByUuid = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintCtrl.getSprint(data));
const createSprint = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintCtrl.createSprint(data));
const updateSprint = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintCtrl.updatedSprint(data));
const deleteSprintByUuid = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintCtrl.deleteSprint(data));