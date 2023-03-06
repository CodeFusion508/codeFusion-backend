const swaggerJSDoc = require("swagger-jsdoc");

const package = require("../../package.json");

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
        "./src/docs/*.yaml"
    ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerSpec
};