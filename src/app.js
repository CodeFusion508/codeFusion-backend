const path = require("path");

const express = require("express");
const helmet = require("helmet");
const { serve, setup } = require("swagger-ui-express");
const cors = require("cors");

const { swaggerSpec } = require("./docs/index.js");
const Router = require("./router.js");

module.exports = (deps) => {
    let app = express();
    const PORT = process.env.PORT || 3000;
    const router = Router(deps);

    // Documentation Route
    app.use("/docs", serve, setup(swaggerSpec));

    // Middleware
    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    // Route Paths
    app.use("/static", express.static(path.join(__dirname, "mdContent")));
    app.use(router);

    app.listen(PORT, () => {
        process.stdout.write("Running at -> " + `\x1b[3m\x1b[96mhttp://localhost:${PORT}\x1b[39m\x1b[23\x1b[0m` + "\n");
    });
};

/*
    Alfredo3232 - 2/2/2023
    at least for right now I am thinking of using the Neo4J Aura online service, since it will be more cost effective using
    different services to handle the work.
*/
