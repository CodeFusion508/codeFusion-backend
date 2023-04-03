const { v4 } = require("uuid");

const {
    cleanNeo4j,
    cleanRecord,
    cleanRecords
} = require("../../utils/cleanData.js");

const {
    createdContentDays,
    deletedContentDays,
    getContentDaysQuery,
    updatedContentDays,
    getContentDaysRelationsQuery
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

const updateContentDays = async ({ services }, body) => {
    
    if (Object.keys(body).length < 2) throw { err: 400, message: "You must provide at least one change." };
    const query = updatedContentDays(body);

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

const getOneContentDayByUuid = async ({ services }, params) => {

    console.log(params)
    const query = getContentDaysRelationsQuery(params)
    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) throw { err: 404, message: "This content days does not exist, please check if you have a valid uuid." };

    data = cleanNeo4j(data);
    // cleanRecords(data);

    return data;
    
}

Object.assign(module.exports, {
    createContentDays,
    getContentDays,
    updateContentDays,
    deleteContentDays,
    getOneContentDayByUuid
});