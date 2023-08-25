const { v4 } = require("uuid");

const {
    cleanNeo4j,
    cleanRecord,
    cleanRecords,
    cleanRels
} = require("../../utils/cleanData.js");
const {
    createDayQuery,
    deleteDayQuery,
    getDayQuery,
    updateDayQuery,
    getAllDaysQuery,

    getDaysRelsQuery
} = require("./days.query.js");


module.exports = (deps) => Object.entries(module.exports).reduce((acc, [name, method]) => {
    return {
        ...acc,
        [name]: method.bind(null, { ...module.exports, ...deps })
    };
}, {});


// Day CRUD
const createDay = async ({ services }, body) => {
    const uuid = v4();
    const query = createDayQuery(uuid, body);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getAllDays = async ({ services }) => {
    const query = getAllDaysQuery();
    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0) throw { err: 404, message: "No hay resultados para su búsqueda." };

    data = cleanNeo4j(data);
    cleanRecords(data);

    return data;
};

const updateDay = async ({ services }, body) => {
    if (Object.keys(body).length < 2) throw { err: 400, message: "Debe indicar al menos un cambio." };

    const query = updateDayQuery(body);
    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0) throw { err: 404, message: "Este día no existe, verifique si tiene un uuid válido." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getDay = async ({ services }, params) => {
    const query = getDayQuery(params);
    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0) throw { err: 404, message: "Este día no existe, verifique si tiene un uuid válido." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const deleteDay = async ({ services }, params) => {
    const query = deleteDayQuery(params);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);

    return data;
};

// Day Relationships
const getDaysRels = async ({ services }, params) => {
    const query = getDaysRelsQuery(params);
    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0) throw { err: 404, message: "No existen relaciones para este nodo." };

    data = cleanNeo4j(data);
    cleanRels(data);

    return data;
};


Object.assign(module.exports, {
    createDay,
    getAllDays,
    updateDay,
    getDay,
    deleteDay,

    getDaysRels
});