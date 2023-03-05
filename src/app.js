const express = require("express");
const helmet = require("helmet");
const swaggerUI = require("swagger-ui-express");

// swagger docs
const { specs } = require("./docs/index.js");
// route imports
const Router = require("./router.js");

module.exports = (deps) => {
    let app = express();
    const PORT = process.env.PORT || 3000;

    const router = Router(deps);

    app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
    app.use(helmet());
    app.use(router);


    app.listen(PORT, () => {
        process.stdout.write(`Running at PORT: ${PORT}`);
    });

    return app;
};

/*
    Alfredo3232 - 2/2/2023
    at least for right now I am thinking of using the Neo4J Aura online service, since it will be more cost effective using
    different services to handle the work.
*/