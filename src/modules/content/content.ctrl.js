const { v4 } = require("uuid");

const { cleanNeo4j, cleanRecord } = require("../../utils/cleanData.js");
const {
    createContentQuery,
    updatedContentQuery,
    getContentQuery,
    deletedContentQuery,

    deleteTestContentQuery
} = require("./content.query.js");
const {
    UPDATE_PROBLEM,
    UPDATE_QUIZ,
    UPDATE_VIDEO,
    UPDATE_TEXT
} = require("./content.joi.js");


module.exports = (deps) => Object.entries(module.exports).reduce((acc, [name, method]) => ({
    ...acc,
    [name]: method.bind(null, { ...module.exports, ...deps })
}), {});


// Content CRUD
const createContent = async ({ services }, body) => {
    const uuid = v4();
    const { query, queryParams } = createContentQuery(uuid, body);

    let data = await services.neo4j.session.run(query, queryParams);
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const updateContent = async ({ services }, bodyAndParam) => {
    const cleanData = contentUpdateVerification(bodyAndParam);

    const { query, queryParams } = updatedContentQuery(cleanData);

    let data = await services.neo4j.session.run(query, queryParams);

    if (data.records.length === 0) throw { err: 404, message: "Este contenido no existe, verifique si tiene un uuid válido." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getContent = async ({ services }, params) => {
    const { query, queryParams } = getContentQuery(params);

    let data = await services.neo4j.session.run(query, queryParams);

    if (data.records.length === 0) throw { err: 404, message: "Este contenido no existe, verifique si tiene un uuid válido." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const deleteContent = async ({ services }, params) => {
    const { query, queryParams } = deletedContentQuery(params);

    let data = await services.neo4j.session.run(query, queryParams);
    data = cleanNeo4j(data);

    return data;
};

// Delete Test Data
const bulkTestDelete = async ({ services }) => {
    const query = deleteTestContentQuery();

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);

    return data;
};


Object.assign(module.exports, {
    createContent,
    updateContent,
    getContent,
    deleteContent,

    bulkTestDelete
});


// Helper Functions
const contentUpdateVerification = async (bodyAndParam) => {
    if (Object.keys(bodyAndParam).length < 3) throw { err: 400, message: "Debe indicar al menos un cambio." };

    switch (bodyAndParam.label) {
        case "Problem":
            return await UPDATE_PROBLEM.validate(bodyAndParam).value;

        case "Quiz":
            return await UPDATE_QUIZ.validate(bodyAndParam).value;

        case "Text":
            return await UPDATE_TEXT.validate(bodyAndParam).value;

        case "Video":
            return await UPDATE_VIDEO.validate(bodyAndParam).value;

        default:
            throw { err: 400, message: "No tiene el label correcto." };
    }
};