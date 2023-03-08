const express = require("express");

const { endpointWrapper, endpointResponse } = require("../modules/users.util.js");

module.exports = (deps) => {
    const endPoint = endpointWrapper(deps);

    return express.Router()
        .get("/", endPoint(someUsers))
        .post("/signUp", endPoint(signUp))
        .get("/login", (_, res) => res.send("you hit /users/login"))
        .put("/:uuid/update", (_, res) => res.send("you hit /users/:uuid/update"))
        .delete("/:uuid/delete", (_, res) => res.send("you hit /users/:uuid/delete"));
};



const someUsers = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.getUsers(data));
const signUp = ({ ctrls }) => ({ data }, res, next) => endpointResponse(res, next)(ctrls.usersCtrl.putUser(data));