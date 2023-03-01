import express from "express";
import helmet from "helmet";
let app = express();

// set up env when starting server
import dotenv from "dotenv";
dotenv.config();

// swagger imports
import swaggerUI from "swagger-ui-express";
import { specs } from "../docs/index.js";

// our main routes
import routes from "./routes/index.js";


app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(helmet());
app.use("/", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running at PORT: ${PORT}`);
});

/*
    Alfredo3232 - 2/2/2023
    at least for right now I am thinking of using the Neo4J Aura online service, since it will be more cost effective using different services
    to handle the work.
*/