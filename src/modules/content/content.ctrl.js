const { v4 } = require("uuid");

const { cleanNeo4j, cleanRecord } = require("../../utils/cleanData.js");
const {
    createContentQuery,
    updatedContentQuery,
    getContentQuery,
    deletedContentQuery
} = require("./content.query.js");


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

const updateContent = async ({ services }, body) => {
    if (Object.keys(body).length < 2) throw { err: 400, message: "Debe indicar al menos un cambio." };
    const query = updatedContentQuery(body);

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