const path = require("path");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("1079746536463-hu5gv65n5jin72ee5s4gt7de5n7qhs4e.apps.googleusercontent.com");
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

    //Temporary ubication for the google login
    app.post("/gVerify", async (req, res) => {
        try {
            console.log(req.body);
            const ticket = await client.verifyIdToken({
                idToken: req.body.idtoken
            });
            const payload = ticket.getPayload();
            // Save the user's information in your database
            // ...
            // Set a session cookie and return a success response
            res.cookie("session", "SESSION_ID", { httpOnly: true });
            return true;
        } catch (error) {
            console.error("Sign-in failed. Error:", error);
            return false;
        }
    });

// Example protected endpoint that requires authentication
    app.get("/profile", (req, res) => {
        if (req.cookies.session === "SESSION_ID") {
            res.send("Welcome to your profile page!");
        } else {
            res.status(401).send("Unauthorized");
        }
    });
    //****************************************************
    app.listen(PORT, () => {
        process.stdout.write("Running at -> " + `\x1b[3m\x1b[96mhttp://localhost:${PORT}\x1b[39m\x1b[23\x1b[0m` + "\n");
    });

    return app;
};

/*
    Alfredo3232 - 2/2/2023
    at least for right now I am thinking of using the Neo4J Aura online service, since it will be more cost effective using
    different services to handle the work.
*/
