const express = require("express");
const helmet = require("helmet");
const swaggerUI = require("swagger-ui-express");

const { swaggerSpec } = require("./docs/index.js");
const Router = require("./router.js");

module.exports = (deps) => {
    let app = express();
    const PORT = process.env.PORT || 3000;

    const router = Router(deps);

    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.use(helmet());
    app.use(router);


    app.listen(PORT, () => {
        process.stdout.write("Running at PORT: " + `\x1b[3m\x1b[96m${PORT}\x1b[39m\x1b[23\x1b[0m` + "\n");
    });

    return app;
};

/*
    Alfredo3232 - 2/2/2023
    at least for right now I am thinking of using the Neo4J Aura online service, since it will be more cost effective using
    different services to handle the work.
*/