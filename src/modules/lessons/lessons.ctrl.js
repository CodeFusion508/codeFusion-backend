const {v4} = require("uuid");

const {
    createLessonQuery,
    getLessonsQuery,
    updateLessonQuery
} = require("./lessons.query.js");
//const {cleanNeo4j} = require("../users/users.clean");
const {
    cleanNeo4j,
    cleanRecord,
    cleanRecords
} = require("../users/users.clean.js");
const {updateUserQuery} = require("../users/users.query");

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
    //data = cleanNeo4j(data);
    console.log(data);
    return data;
};

const getLessons = async ({ services }) => {
    const query = getLessonsQuery();

    let data = await services.neo4j.session.run(query);

    if (data.records.length == 0) {
        throw { err: 404, message: "There a no lesson to get" };
    } else {
        data = cleanNeo4j(data);
        cleanRecords(data);

        return data;
    }
};

const updateLesson = async ({ services }, body) => {
    const query = updateLessonQuery(body);

    let data = await services.neo4j.session.run(query);

    if (data.records.length !== 0) {
        data = cleanNeo4j(data);
        cleanRecord(data);

        return data;
    } else {
        throw { err: 404, message: "This lesson does not exist, please check if you have a valid uuid." };
    }
};

Object.assign(module.exports, {
createLesson,
getLessons,
updateLesson
});