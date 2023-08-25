const swaggerJSDoc = require("swagger-jsdoc");


// this line is for our actions-runner, if the docs don't appear consider changing this line to suit your needs.
const yPath = process.env.USER === "ubuntu" ? "/home/ubuntu/actions-runner/_work/codeFusion-backend/codeFusion-backend/src/docs/*.yaml" : "./src/docs/*.yaml";

const options = {
    definition: {
        info: {
            description : "This is the documentation for our endpoints. This will tell you how to use a endpoint, what is required or what you can expect back.",
            title       : "CodeFusion508 Backend",
            version     : "1.0.0"
        },
        openapi: "3.0.0"

    },
    apis: [
        yPath
    ],
    servers: [
        {
            url: `${process.env.PORT || 3000}`
        }
    ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };