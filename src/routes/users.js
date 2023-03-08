const express = require("express");

const { endpointWrapper, endpointResponse } = require("../modules/users.util.js");

module.exports = (deps) => {
    const endPoint = endpointWrapper(deps);

    return express.Router()
        .get("/", endPoint(someUsers))
        .post("/signUp", endPoint(signUp))
        .get("/login", endPoint(login))
        .put("/:uuid/update", endPoint(updateUser))
        .delete("/:uuid/delete", endPoint(deleteUser));
};



const someUsers = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getUsers(data));
const signUp = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.putUser(data));
const login = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.putUser(data));
const updateUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.putUser(data));
const deleteUser = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.putUser(data));