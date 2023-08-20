const { v4 } = require("uuid");

const { cleanNeo4j, cleanRecord } = require("../../utils/cleanData.js");
const {
    createContentQuery,
    updatedContentQuery,
    getContentQuery,
    deletedContentQuery
} = require("./content.query.js");

const {
    UPDATE_PROBLEM,
    UPDATE_QUIZ,
    UPDATE_VIDEO,
    UPDATE_TEXT
} = require("./content.joi.js");


module.exports = (deps) => Object.entries(module.exports).reduce((acc, [name, method]) => {
    return {
        ...acc,
        [name]: method.bind(null, { ...module.exports, ...deps })
    };
}, {});


// Content CRUD
const createContent = async ({ services }, body) => {
    const uuid = v4();
    const query = createContentQuery(uuid, body);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const updateContent = async ({ services }, bodyAndParam) => {
    const cleanData = contentUpdateVerification(bodyAndParam);

    const query = updatedContentQuery(cleanData);

    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0) throw { err: 404, message: "Este contenido no existe, verifique si tiene un uuid válido." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getContent = async ({ services }, params) => {
    const query = getContentQuery(params);

    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0) throw { err: 404, message: "Este contenido no existe, verifique si tiene un uuid válido." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const deleteContent = async ({ services }, params) => {
    const query = deletedContentQuery(params);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);

    return data;
};


Object.assign(module.exports, {
    createContent,
    updateContent,
    getContent,
    deleteContent
});

// Helper Functions
const contentUpdateVerification = (bodyAndParam) => {
    if (Object.keys(bodyAndParam).length < 3) throw { err: 400, message: "Debe indicar al menos un cambio." };

    switch (bodyAndParam.label) {
        case "Problem":
           return UPDATE_PROBLEM(bodyAndParam).value;

        case "Quiz":
            return UPDATE_QUIZ(bodyAndParam).value;

        case "Text":
            return UPDATE_TEXT(bodyAndParam).value;

        case "Video":
            return UPDATE_VIDEO(bodyAndParam).value;

        default:
            throw { err: 400, message: "No tiene el label correcto." };
    }
};