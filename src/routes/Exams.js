const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { params, body } = require("../utils/reqData.js");

const {
    CREATE_EXMANS,
    GET_UUID,
    UPDATE_EXMANS,
    VERIFY_CODE
} = require("../modules/Exams/Exams.joi.js");


module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        // Student CRUD
        .post("/", endPoint(body, CREATE_EXMANS, created))
        .get("/:uuid", endPoint(params, GET_UUID, findById))
        .get("/sprint/:uuid", endPoint(params, GET_UUID, findAllBySprint))
        .post("/sprint", endPoint(body, VERIFY_CODE, findAllBySprint));
};

const created = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.examsCtrl.createdExams(data));
const findById = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.examsCtrl.getById(data));
const findAllBySprint = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.examsCtrl.findAllBySprint(data));