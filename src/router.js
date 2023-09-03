const { Router } = require("express");

const routes = {
    "/students" : require("./routes/students.js"),
    "/sprints"  : require("./routes/sprints.js"),
    "/days"     : require("./routes/days.js"),
    "/contents" : require("./routes/content.js"),
    "/google"   : require("./routes/google.js")
};

module.exports = (deps) => {
    let router = Router();

    for (const [route, routerMethod] of Object.entries(routes)) {
        process.stdout.write("Loading Route " + `\x1b[33m${route}\x1b[89m\x1b[0m` + "\n");

        router.use(route, routerMethod(deps));
    }

    router.all("*", (req, res) => {
        const error = new Error("No se encontró ninguna ruta conocida");
        error.details = { requestedRoute: req.path };
        error.statusCode = 404;

        res.status(error.statusCode).send(error.message);
    });

    return router;
};