const { v4 } = require("uuid");

const {
    createSectionQuery,
    getSectionsQuery,
    findSectionQuery,
    updateSectionQuery,
    deleteSectionQuery
} = require("./sections.query.js");

const {
    cleanNeo4j,
    cleanRecord,
    cleanRecords
} = require("../../utils/cleanData.js");

module.exports = (deps) =>
    Object
        .entries(module.exports)
        .reduce((acc, [name, method]) => {
            return {
                ...acc,
                [name]: method.bind(null, Object.assign({}, module.exports, deps))
            };
        }, {});


const createSection = async ({ services }, body) => {
    const uuid = v4();
    const query = createSectionQuery(uuid, body);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getSections = async ({ services }) => {
    const query = getSectionsQuery();

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) throw { err: 404, message: "There are no Sections." };

    data = cleanNeo4j(data);
    cleanRecords(data);

    return data;
};

const getSection = async ({ services }, params) => {
    const query = findSectionQuery(params);

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) throw { err: 404, message: "This Section does not exist, please check if you have a valid uuid." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};


const updateSection = async ({ services }, body) => {
    const query = updateSectionQuery(body);

    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0) throw { err: 404, message: "This Section does not exist, please check if you have a valid uuid." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const deleteSection = async ({ services }, params) => {
    const query = deleteSectionQuery(params);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);

    return data;
};

Object.assign(module.exports, {
    createSection,
    getSections,
    getSection,
    updateSection,
    deleteSection
});