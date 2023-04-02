const { v4 } = require("uuid");

const {
    cleanNeo4j,
    cleanRecord
} = require("../../utils/cleanData.js");

const {
   createdContentDays,
   deletedContentDays,
   getContentDaysQuery,
   updatedContentDays
} = require("./contentDays.query.js");

module.exports = (deps) =>
    Object
        .entries(module.exports)
        .reduce((acc, [name, method]) => {
            return {
                ...acc,
                [name]: method.bind(null, Object.assign({}, module.exports, deps))
            };
        }, {});


const createContentDays = async ({ services }, body) => {
    const uuid = v4();
    const query = createdContentDays(uuid, body);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getContentDays = async ({ services }, params) => {
    const query = getContentDaysQuery(params);

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) throw { err: 404, message: "This content day does not exist, please check if you have a valid uuid." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const updatedContentDays = async ({ services }, body) => {
    if (!body.desc && !body.exp) throw { err: 400, message: "You must provide a description or an experience value." };
    const query = updateDayQuery(body);

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) throw { err: 404, message: "This content day does not exist, please check if you have a valid uuid." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const deleteContentDays = async ({ services }, params) => {
    const query = deletedContentDays(params);

    let data = await services.neo4j.session.run(query);

    data = cleanNeo4j(data);

    return data;
};

Object.assign(module.exports, {
    createContentDays,
    getContentDays,
    updatedContentDays,
    deleteContentDays,
});