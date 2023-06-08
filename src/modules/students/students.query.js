// Student CRUD
const signUpQuery = (uuid, body) => {
    const query = `
        CREATE (u:Student:User {
            uuid      : "${uuid}", 
            totalExp  : 0, 
            weeklyExp : 0, 
            email     : "${body.email}", 
            userName  : "${body.userName}", 
            password  : "${body.password}"
        })
        RETURN u;
    `;

    return query;
};

const logInQuery = (body) => `
    MATCH (u:Student {email: "${body.email}"})
    WHERE NOT u:softDeleted
    RETURN u;
`;

const findRegisteredEmailQuery = (body) => `MATCH (u:Student {email: "${body.email}"}) RETURN u;`;

const findDeletedStudentQuery = (body) => `
    MATCH (u:Student {email: "${body.email}"})
    WHERE  u:softDeleted
    RETURN u;
`;

const getStudentQuery = (params) => `
    MATCH (u:Student {uuid: "${params.uuid}"}) 
    WHERE NOT u:softDeleted 
    RETURN u;
`;

const updateStudentQuery = (body) => {
    let propsToUpdate = [];

    if (body.totalExp) {
        propsToUpdate.push(`u.totalExp = ${body.totalExp}`);
    }
    if (body.weeklyExp) {
        propsToUpdate.push(`u.weeklyExp = ${body.weeklyExp}`);
    }
    if (body.userName) {
        propsToUpdate.push(`u.userName = "${body.userName}"`);
    }
    if (body.email) {
        propsToUpdate.push(`u.email = "${body.email}"`);
    }
    if (body.password) {
        propsToUpdate.push(`u.password = "${body.password}"`);
    }

    const updateQuery = `
        MATCH (u:Student {uuid: "${body.uuid}"})
        WHERE NOT u:softDeleted
        SET ${propsToUpdate.join(", ")}
        RETURN u;
    `;

    return updateQuery;
};

const deleteStudentQuery = (params) => `
    MATCH (u:Student {uuid: "${params.uuid}"})
    SET u:softDeleted;
`;

// Relation Queries
const createRelQuery = (body) => {
    const evalClause = body.eval ? `{eval: "${body.eval}"}` : "";

    return `
        MATCH (u:Student {uuid: "${body.uuid}"}), (c:${body.op} {uuid: "${body.contentUuid}"})
        WHERE NOT u:softDeleted AND NOT c:softDeleted
        CREATE (u)-[r:${body.relation}${evalClause}]->(c)
        RETURN r;
    `;
};

const deleteRelQuery = (body) => {
    const query = `
        MATCH (u:Student {uuid: "${body.uuid}"}), (c:${body.op} {uuid: "${body.contentUuid}"})
        WHERE NOT u:softDeleted AND NOT c:softDeleted
        WITH u, c
        MATCH (u)-[r:${body.relation}]->(c)
        DELETE r;
    `;

    return query;
};

module.exports = {
    signUpQuery,
    logInQuery,
    findRegisteredEmailQuery,
    findDeletedStudentQuery,
    getStudentQuery,
    updateStudentQuery,
    deleteStudentQuery,

    createRelQuery,
    deleteRelQuery
};