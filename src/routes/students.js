const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../utils/endpointUtil.js");
const { params, body } = require("../utils/reqData.js");
const {
    GET_UUID,
    CREATE_STUDENT,
    LOGIN_STUDENT,
    UPDATE_STUDENT,

    CREATE_RELATION,
    DELETE_RELATION,

    CONFIRM_ACCOUNT,
    RECOVERY_ACCOUNT
} = require("../modules/students/students.joi.js");
const auth = require("../modules/students/students.auth.js");


module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        // Student CRUD
        .post("/", endPoint(body, CREATE_STUDENT, signUp))
        .post("/login", endPoint(body, LOGIN_STUDENT, logIn))
        .get("/:uuid", auth.verifyToken, endPoint(params, GET_UUID, getStudent))
        .put("/", auth.verifyToken, endPoint(body, UPDATE_STUDENT, updateStudent))
        .delete("/:uuid", auth.verifyToken, endPoint(params, GET_UUID, deleteStudent))
        // Student Relationships
        .post("/create/rel", auth.verifyToken, endPoint(body, CREATE_RELATION, createRel))
        .delete("/rel", auth.verifyToken, endPoint(body, DELETE_RELATION, deleteRel))
        // Other Student Logic
        .post("/confirm-account", endPoint(body, CREATE_STUDENT, WaitingForAccountConfirmation))
        .post("/recovery/account", endPoint(body, RECOVERY_ACCOUNT, recoveryAccount))
        .get("/confirm-account-token/:token", endPoint(params, CONFIRM_ACCOUNT, confirmAccount));
};


const signUp = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.studentsCtrl.signUp(data));
const logIn = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.studentsCtrl.logIn(data));
const getStudent = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.studentsCtrl.getStudent(data));
const updateStudent = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.studentsCtrl.updateStudent(data));
const deleteStudent = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.studentsCtrl.deleteStudent(data));

const createRel = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.studentsCtrl.createRel(data));
const deleteRel = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.studentsCtrl.deleteRel(data));

const WaitingForAccountConfirmation = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.studentsCtrl.WaitingForAccountConfirmation(data));
const recoveryAccount = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.studentsCtrl.recoveryAccount(data));
const confirmAccount = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.studentsCtrl.confirmAccount(data));