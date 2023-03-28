const { v4 } = require("uuid");

const {
    createLessonQuery,
    getLessonsQuery,
    findLessonQuery,
    updateLessonQuery,
    deleteLessonQuery
} = require("./lessons.query.js");

const {
    cleanNeo4j,
    cleanRecord,
    cleanRecords
} = require("../users/users.clean.js");

module.exports = (deps) =>
    Object
        .entries(module.exports)
        .reduce((acc, [name, method]) => {
            return {
                ...acc,
                [name]: method.bind(null, Object.assign({}, module.exports, deps))
            };
        }, {});

const createLesson = async ({ services }, body) => {
    const uuid = v4();
    const query = createLessonQuery(uuid, body);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getLessons = async ({ services }) => {
    const query = getLessonsQuery();

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) {
        throw { err: 404, message: "There are no lessons." };
    } else {
        data = cleanNeo4j(data);
        cleanRecords(data);

        return data;
    }
};

const getLesson = async ({ services }, params) => {
    const query = findLessonQuery(params);

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) {
        throw { err: 404, message: "This lesson does not exist, please check if you have a valid uuid." };
    } else {
        data = cleanNeo4j(data);
        cleanRecord(data);

        return data;
    }
};


const updateLesson = async ({ services }, body) => {
    const query = updateLessonQuery(body);

    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0) {
        throw { err: 404, message: "This lesson does not exist, please check if you have a valid uuid." };
    } else {
        data = cleanNeo4j(data);
        cleanRecord(data);

        return data;
    }
};

const deleteLesson = async ({ services }, params) => {
    const query = deleteLessonQuery(params);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);

    return data;
};

Object.assign(module.exports, {
    createLesson,
    getLessons,
    getLesson,
    updateLesson,
    deleteLesson
});