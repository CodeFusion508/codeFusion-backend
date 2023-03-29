const { v4 } = require("uuid");

const {
    cleanNeo4j,
    cleanRecord,
    cleanRecords
} = require("../users/users.clean.js")

const { createSprintQuery, deleteSprintQuery, getSprintQuery, updateSprintQuery } = require('./sprints.query.js')

module.exports = (deps) =>
    Object
        .entries(module.exports)
        .reduce((acc, [name, method]) => {
            return {
                ...acc,
                [name]: method.bind(null, Object.assign({}, module.exports, deps))
            };
        }, {});


// Functions for created sprint 
// With two params
// services and body
// return String
const createSprint = async ({ services }, body) => {

    const uuid = v4()
    const query = createSprintQuery(uuid, body)

    const data = cleanRecord(cleanNeo4j(await services.neo4j.session.run(query)))

    return data

}

// Functions for get One Sprint by uuid 
// With two params
// services and body
// return Object
const getSprint = async ({ services }, params) => {

    const query = getSprintQuery(params);

    const data = cleanRecord(cleanNeo4j(await services.neo4j.session.run(query)))

    if(data === undefined) throw { err: 404, message: "There are no sprint" }

    return data
}

// Functions for updated Sprint By uuid
// With two params
// services and body
// return Object
const updatedSprint = async ({ services }, body) => {

    const query = updateSprintQuery(body);

    const data = cleanRecord(cleanNeo4j(await services.neo4j.session.run(query)))
    if(data === undefined) throw { err: 404, message: "This sprint does not exist, please check if you have a valid uuid." }

    return data
}

// Functions for updated Sprint By uuid
// With two params
// services and body
// return Object
const deleteSprint = async ({ services }, params) => {

    const query = deleteSprintQuery(params);

    const data = cleanNeo4j(await services.neo4j.session.run(query))
    if(data === undefined) throw { err: 404, message: "This sprint does not exist, please check if you have a valid uuid." }

    return data
}

Object.assign(module.exports, {
    createSprint,
    getSprint,
    updatedSprint,
    deleteSprint,
})