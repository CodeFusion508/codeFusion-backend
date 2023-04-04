const { v4 } = require("uuid");

const { cleanNeo4j, cleanRecord } = require("../../utils/cleanData.js");

const {
    createContentQuery,
    getContentQuery,
    deletedContentQuery,
    updatedContentQuery
} = require("./content.query.js");

module.exports = (deps) =>
    Object
        .entries(module.exports)
        .reduce((acc, [name, method]) => {
            return {
                ...acc,
                [name]: method.bind(null, Object.assign({}, module.exports, deps))
            };
        }, {});


const createContent = async ({ services }, body) => {
    const uuid = v4();
    const query = createContentQuery(uuid, body);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getContent = async ({ services }, params) => {
    const query = getContentQuery(params);

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) throw { err: 404, message: "This content does not exist, check if you have a valid uuid." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const updateContent = async ({ services }, body) => {
    if (Object.keys(body).length < 2) throw { err: 400, message: "You must provide at least one change." };
    const query = updatedContentQuery(body);

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) throw { err: 404, message: "This content does not exist, check if you have a valid uuid." };

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
    getContent,
    updateContent,
    deleteContent
});