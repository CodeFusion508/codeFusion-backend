const swaggerJSDoc = require("swagger-jsdoc");

const package = require("../../package.json");

const yPath = process.env.USER === "ubuntu" ? "/home/ubuntu/actions-runner/_work/codeFusion-backend/codeFusion-backend/src/docs/*.yaml" : "./src/docs/*.yaml";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: package.name,
            version: package.version,
            description: package.description
        }
    },
    servers: [
        {
            url: `${process.env.PORT || 3000}`
        }
    ],
    apis: [
        yPath
    ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerSpec
};