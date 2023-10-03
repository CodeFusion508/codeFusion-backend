const { v4 } = require("uuid");

const {
    cleanNeo4j,
    cleanRecord,
    cleanRecords,
    cleanRels
} = require("../../utils/cleanData.js");
const {
    createSprintQuery,
    getAllSprintsQuery,
    updateSprintQuery,
    getSprintQuery,
    deleteSprintQuery,

    getSprintsRelsQuery,

    deleteTestRels,
    deleteTestSprints
} = require("./sprints.query.js");


module.exports = (deps) => Object.entries(module.exports).reduce((acc, [name, method]) => ({
    ...acc,
    [name]: method.bind(null, { ...module.exports, ...deps })
}), {});


// Sprint CURD
const createSprint = async ({ services }, body) => {
    const uuid = v4();
    const { query, queryParams } = createSprintQuery(uuid, body);

    let data = await services.neo4j.session.run(query, queryParams);
    cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getAllSprints = async ({ services }) => {
    const query = getAllSprintsQuery();
    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0) throw { err: 404, message: "No existen sprints" };

    cleanNeo4j(data);
    cleanRecords(data);

    return data;
};

const updateSprint = async ({ services }, body) => {
    if (Object.keys(body).length < 2) throw { err: 400, message: "Debe indicar al menos un cambio." };

    const { query, queryParams } = updateSprintQuery(body);
    let data = await services.neo4j.session.run(query, queryParams);

    if (data.records.length === 0) throw { err: 404, message: "Este sprint no existe, verifique si tiene un uuid válido." };

    cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getSprint = async ({ services }, params) => {
    const { query, queryParams } = getSprintQuery(params);
    let data = await services.neo4j.session.run(query, queryParams);

    if (data.records.length === 0) throw { err: 404, message: "Este sprint no existe, verifique si tiene un uuid válido." };

    cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const deleteSprint = async ({ services }, params) => {
    const { query, queryParams } = deleteSprintQuery(params);

    let data = await services.neo4j.session.run(query, queryParams);
    cleanNeo4j(data);

    return data;
};

// Sprint Relationships
const getSprintRels = async ({ services }, params) => {
    const { query, queryParams } = getSprintsRelsQuery(params);
    let data = await services.neo4j.session.run(query, queryParams);

    if (data.records.length === 0) throw { err: 404, message: "Este sprint no existe, verifique si tiene un uuid válido." };

    cleanNeo4j(data);
    cleanRels(data);

    return data;
};

// Delete Test Data
const bulkTestDelete = async ({ services }) => {
    // First we have to delete relationships
    const query1 = deleteTestRels();
    await services.neo4j.session.run(query1);

    // Then we have to delete the test nodes
    const query2 = deleteTestSprints();
    let data = await services.neo4j.session.run(query2);
    cleanNeo4j(data);

    return data;
};

Object.assign(module.exports, {
    createSprint,
    getAllSprints,
    updateSprint,
    getSprint,
    deleteSprint,

    getSprintRels,

    bulkTestDelete
});