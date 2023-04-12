const path = require("path");
const https = require("https");
const fs = require("fs");

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

    app.use("/docs", serve, setup(swaggerSpec));

    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    app.use("/static", express.static(path.join(__dirname, "mdContent")));
    app.use(router);
    const port = PORT || "8080";
    app.set("port", port);

    const server = https
        .createServer(
            // Provide the private and public key to the server by reading each
            // file's content with the readFileSync() method.
            {
                key  : fs.readFileSync("server.key"),
                cert : fs.readFileSync("server.cert"),
            },
            app
        );
    /*app.listen(PORT, () => {
        process.stdout.write("Running at PORT: " + `\x1b[3m\x1b[96m${PORT}\x1b[39m\x1b[23\x1b[0m` + "\n");
    });*/
    server.listen(port);
    console.log("Corriendo en https://localhost:" + port);

    return app;
};

/*
    Alfredo3232 - 2/2/2023
    at least for right now I am thinking of using the Neo4J Aura online service, since it will be more cost effective using
    different services to handle the work.
*/