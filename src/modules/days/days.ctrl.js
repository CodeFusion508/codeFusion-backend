const { v4 } = require("uuid");

const {
    cleanNeo4j,
    cleanRecord
} = require("../../utils/cleanData.js");

const {
    createDayQuery,
    deleteDayQuery,
    getDayQuery,
    updateDayQuery
} = require("./days.query.js");

module.exports = (deps) =>
    Object
        .entries(module.exports)
        .reduce((acc, [name, method]) => {
            return {
                ...acc,
                [name]: method.bind(null, Object.assign({}, module.exports, deps))
            };
        }, {});


const createDay = async ({ services }, body) => {
    const uuid = v4();
    const query = createDayQuery(uuid, body);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getDay = async ({ services }, params) => {
    const query = getDayQuery(params);

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) throw { err: 404, message: "This day does not exist, please check if you have a valid uuid." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const updatedDay = async ({ services }, body) => {
    if (!body.desc && !body.exp) throw { err: 400, message: "You must provide a description or an experience value." };
    const query = updateDayQuery(body);

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) throw { err: 404, message: "This day does not exist, please check if you have a valid uuid." };

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

Object.assign(module.exports, {
    createDay,
    getDay,
    updatedDay,
    deleteDay,
});