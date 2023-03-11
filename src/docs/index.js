const swaggerJSDoc = require("swagger-jsdoc");

const package = require("../../package.json");

const yPath = process.env.USER === "ubuntu" ? "/home/ubuntu/actions-runner/_work/codeFusion-backend/codeFusion-backend/src/docs/*.yaml" : "./src/docs/*.yaml";

const options = {
    apis: [
        yPath
    ],
    definition: {
        info: {
            description : package.description,
            title       : package.name,
            version     : package.version
        },
        openapi: "3.0.0"

    },
    servers: [
        {
            url: `${process.env.PORT || 3000}`
        }
    ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerSpec
};