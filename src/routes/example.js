const express = require("express");

module.exports = (deps) => {
    return express.Router()
        .get("/", (_, res) => res.send("you hit at /"))
        .get("/api", (_, res) => res.send("you hit at /api"));
};


// the only reason to export these route functions is to test them, outside that they don't use them
/*
Object.assign(module.exports, {
    exampleRouteFunc
});
*/