const { v4 } = require("uuid");

const {
    cleanNeo4j,
    cleanRecord,
    cleanRecords
} = require("../../utils/cleanData.js");

const {
    createSprintQuery,
    deleteSprintQuery,
    getSprintQuery,
    updateSprintQuery,
    getAllSprintsQuery,
    getSprintsRelationsQuery
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

const getSprint = async ({ services }, params) => {
    const query = getSprintQuery(params);

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) throw { err: 404, message: "This sprint does not exist, please check if you have a valid uuid." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getAllSprints = async ({ services }) => {
    const query = getAllSprintsQuery();

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) throw { err: 404, message: "This sprint does not exist, please check if you have a valid uuid." };

    data = cleanNeo4j(data, "before cleanRecords");
    cleanRecords(data);

    return data;
};


const getSprintRelations = async ({ services }, params) => {
    const query = getSprintsRelationsQuery(params);

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) throw { err: 404, message: "This sprint does not exist, please check if you have a valid uuid." };

    data = cleanNeo4j(data);
    cleanRecords(data);

    return data;
};

const deleteSprint = async ({ services }, params) => {
    const query = deleteSprintQuery(params);

    let data = await services.neo4j.session.run(query);

    data = cleanNeo4j(data);

    return data;
};

const updatedSprint = async ({ services }, body) => {
    if (Object.keys(body).length < 2) throw { err: 400, message: "You must provide at least one change." };
    const query = updateSprintQuery(body);

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) throw { err: 404, message: "This sprint does not exist, please check if you have a valid uuid." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

Object.assign(module.exports, {
    createSprint,
    getSprint,
    updatedSprint,
    deleteSprint,
    getSprintRelations,
    getAllSprints
});