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
    getSprintsRelsQuery
} = require("./sprints.query.js");

module.exports = (deps) =>
    Object
        .entries(module.exports)
        .reduce((acc, [name, method]) => {
            return {
                ...acc,
                [name]: method.bind(null, Object.assign({}, module.exports, deps))
            };
        }, {});


const createSprint = async ({ services }, body) => {
    const uuid = v4();
    const query = createSprintQuery(uuid, body);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getAllSprints = async ({ services }) => {
    const query = getAllSprintsQuery();

    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0) throw { err: 404, message: "This sprint does not exist, check if you have a valid uuid." };

    data = cleanNeo4j(data);
    cleanRecords(data);

    return data;
};

const updateSprint = async ({ services }, body) => {
    if (Object.keys(body).length === 0) throw { err: 400, message: "You must provide at least one change." };
    const query = updateSprintQuery(body);

    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0) throw { err: 404, message: "This sprint does not exist, check if you have a valid uuid." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getSprint = async ({ services }, params) => {
    const query = getSprintQuery(params);

    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0) throw { err: 404, message: "This sprint does not exist, check if you have a valid uuid." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const deleteSprint = async ({ services }, params) => {
    const query = deleteSprintQuery(params);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);

    return data;
};

const getSprintRels = async ({ services }, params) => {
    const query = getSprintsRelsQuery(params);

    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0) throw { err: 404, message: "This sprint does not exist, check if you have a valid uuid." };

    data = cleanNeo4j(data);
    cleanRels(data);

    return data;
};

Object.assign(module.exports, {
    createSprint,
    getAllSprints,
    updateSprint,
    getSprint,
    deleteSprint,
    getSprintRels
});