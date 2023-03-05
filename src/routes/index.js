const express = require("express");

let router = express.Router();

router.get("/", (req, res) => {
    res.send("you hit at /");
});

router.get("/api", (req, res) => {
    res.send("you hit at /api");
});

module.exports = router;