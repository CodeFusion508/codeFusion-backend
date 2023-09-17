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
        // Sprints CRUD
        .post("/", endPoint(body, CREATE_SPRINT, createSprint))
        .get("/", endPoint(undefined, undefined, getAllSprints))
        .put("/", endPoint(body, UPDATE_SPRINT, updateSprint))
        .get("/node/:uuid", endPoint(params, GET_UUID, getSprint))
        .delete("/node/:uuid", endPoint(params, GET_UUID, deleteSprint))
        // Sprints Relationships
        .get("/node/relationships/:uuid", endPoint(params, GET_UUID, getSprintRels))
        // Internal Use Only
        .delete("/bulk-test", endPoint(undefined, undefined, bulkTestDelete));
};


const createSprint = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.createSprint(data));
const getAllSprints = ({ ctrls }) => (_, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.getAllSprints());
const updateSprint = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.updateSprint(data));
const getSprint = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.getSprint(data));
const deleteSprint = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.deleteSprint(data));

const getSprintRels = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.getSprintRels(data));

const bulkTestDelete = ({ ctrls }) => (_, res, next) => endpointResponse(res, next)(ctrls.sprintsCtrl.bulkTestDelete());