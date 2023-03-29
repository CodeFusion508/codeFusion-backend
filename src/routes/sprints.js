const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const {
    params,
    body,
} = require("../utils/reqData.js");

const {
    createSprint,
    deleteSprint,
    getUUID,
    updateSprint
} = require("../modules/sprints/sprints.joi.js");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .get("/:uuid", endPoint(params, getUUID, getSprintByUuidCtrl))
        // .get("/", endPoint(undefined, undefined, getLessons))
        .post("/", endPoint(body, createSprint, createSprintCtrl))
        .put("/", endPoint(body, updateSprint, updateSprintCtrl))
        .delete("/:uuid", endPoint(params, deleteSprint, deleteSprintByUuidCtrl));
};

const getSprintByUuidCtrl = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintCtrl.getSprint(data));
const createSprintCtrl = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintCtrl.createSprint(data));
// const getSprints = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.lessonCtrl.getLessons(data));
const updateSprintCtrl = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintCtrl.updatedSprint(data));
const deleteSprintByUuidCtrl = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintCtrl.deleteSprint(data));