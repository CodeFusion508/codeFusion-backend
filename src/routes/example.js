const express = require("express");

module.exports = (deps) => {
    return express.Router()
        .get("/", (_, res) => res.send("you hit at /"))
        .get("/api", (_, res) => res.send("you hit at /api"))
        .get("/deps", (_, res) => res.send(`you hit at /deps, here is deps -> ${deps}`));
};


// the only reason to export these route functions is to test them, outside that they don't use them
/*
Object.assign(module.exports, {
    exampleRouteFunc
});
*/