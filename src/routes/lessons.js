const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../modules/users/users.util.js");
const {
    params,
    body,
} = require("./reqData.js");
const {
    createLESSON,
    updateLESSON,
    getUUID
} = require("../modules/lessons/lesson.joi");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        .get("/:uuid", endPoint(params, getUUID, getLesson))
        .get("/", endPoint(undefined, undefined, getLessons))
        .post("/", endPoint(body, createLESSON, createLesson))
        .put("/", endPoint(body, updateLESSON, updateLesson))
        .delete("/:uuid", endPoint(params, getUUID, deleteLesson));
};


const getLesson = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.lessonCtrl.getLesson(data));
const createLesson = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.lessonCtrl.createLesson(data));
const getLessons = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.lessonCtrl.getLessons(data));
const updateLesson = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.lessonCtrl.updateLesson(data));
const deleteLesson = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.lessonCtrl.deleteLesson(data));