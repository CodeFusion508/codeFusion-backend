const { v4 } = require("uuid");

const {
    cleanNeo4j,
    cleanRecord,
    cleanRels
} = require("../../utils/cleanData.js");
const {
    createDayQuery,
    deleteDayQuery,
    getDayQuery,
    updateDayQuery,

    getDaysRelsQuery,

    deleteTestRels,
    deleteTestDaysQuery
} = require("./days.query.js");


module.exports = (deps) => Object.entries(module.exports).reduce((acc, [name, method]) => ({
    ...acc,
    [name]: method.bind(null, { ...module.exports, ...deps })
}), {});


// Day CRUD
const createDay = async ({ services }, body) => {
    const uuid = v4();
    const { query, queryParams } = createDayQuery(uuid, body);

    let data = await services.neo4j.session.run(query, queryParams);
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const updateDay = async ({ services }, body) => {
    if (Object.keys(body).length < 2) throw { err: 400, message: "Debe indicar al menos un cambio." };

    const { query, queryParams } = updateDayQuery(body);
    let data = await services.neo4j.session.run(query, queryParams);

    if (data.records.length === 0) throw { err: 404, message: "Este día no existe, verifique si tiene un uuid válido." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getDay = async ({ services }, params) => {
    const { query, queryParams } = getDayQuery(params);
    let data = await services.neo4j.session.run(query, queryParams);

    if (data.records.length === 0) throw { err: 404, message: "Este día no existe, verifique si tiene un uuid válido." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const deleteDay = async ({ services }, params) => {
    const { query, queryParams } = deleteDayQuery(params);

    let data = await services.neo4j.session.run(query, queryParams);
    data = cleanNeo4j(data);

    return data;
};

// Day Relationships
const getDaysRels = async ({ services }, params) => {
    const { query, queryParams } = getDaysRelsQuery(params);
    let data = await services.neo4j.session.run(query, queryParams);

    if (data.records.length === 0) throw { err: 404, message: "No existen relaciones para este nodo." };

    data = cleanNeo4j(data);
    cleanRels(data);

    return data;
};

// Delete Test Data
const bulkTestDelete = async ({ services }) => {
    // First we have to delete relationships
    const query1 = deleteTestRels();
    await services.neo4j.session.run(query1);

    // Then we have to delete the test nodes
    const query2 = deleteTestDaysQuery();
    let data = await services.neo4j.session.run(query2);
    data = cleanNeo4j(data);

    return data;
};

Object.assign(module.exports, {
    createDay,
    updateDay,
    getDay,
    deleteDay,

    getDaysRels,

    bulkTestDelete
});