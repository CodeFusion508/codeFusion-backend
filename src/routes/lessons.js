const { Router } = require("express");

const { endpointMethods, endpointResponse } = require("../modules/users/users.util.js");
const {
    params,
    body,
} = require("./reqData.js");
const {createLESSON, updateLESSON} = require("../modules/lessons/lesson.joi");

module.exports = (deps) => {
    const endPoint = endpointMethods(deps);

    return Router()
        //.get("/lesson", endPoint({}, getRelatedLessonsQuery, getRelatedLessons)
        .get("/", endPoint(undefined, undefined, getLessons))
        .post("/lesson", endPoint(body, createLESSON, createLesson))
        .put("/lesson", endPoint(body, updateLESSON, updateLesson));
        /*.post("/logIn", endPoint(body, logInUSER, logIn))
        .delete("/:uuid/deleteUser", endPoint(params, getUUID, deleteUser));*/
};


//const getUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getUser(data));
const createLesson = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.lessonCtrl.createLesson(data));
const getLessons = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.lessonCtrl.getLessons(data));
const updateLesson = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.lessonCtrl.updateLesson(data));
/*const deleteUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.deleteUser(data));
const logIn = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.logIn(data));*/