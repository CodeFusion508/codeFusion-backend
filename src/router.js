const { Router } = require("express");

const routes = {
    "/users": require("./routes/users.js")
};

module.exports = (deps) => {
    let router = Router();

    for (const [route, routerMethod] of Object.entries(routes)) {
        router.use(route, routerMethod(deps));

        process.stdout.write("Loading Route " + `\x1b[33m${route}\x1b[89m\x1b[0m` + "\n");
    }

    router.all("*", (req, _, next) => {
        const error = new Error("No matching route found");
        error.details = { requestedRoute: req.path };
        error.statusCode = 404;

        next(error);
    });

    return router;
};