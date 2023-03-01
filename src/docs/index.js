import swaggerJSDoc from "swagger-jsdoc";

const options = {
    apis: ["./server/routes/*.js"],
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CodeFusion API",
            version: "0.0.0",
            description: "The backend API to our CodeFusion frontend."
        }
    },
    servers: [
        {
            url: `${process.env.PORT || 3000}`
        }
    ]
};

const specs = swaggerJSDoc(options);

export {
    options,
    specs
};