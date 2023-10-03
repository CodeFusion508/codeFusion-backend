// Student CRUD
const signUpQuery = (uuid, body) => {
    const query = `
        CREATE (u:Student:User {
            uuid      : $uuid, 
            totalExp  : 0, 
            weeklyExp : 0, 
            email     : $email, 
            userName  : $userName, 
            password  : $password
        })
        RETURN u;
    `;

    const queryParams = {
        uuid,
        email    : body.email,
        userName : body.userName,
        password : body.password
    };

    return { query, queryParams };
};

const logInQuery = (body) => {
    const query = `
        MATCH (u:Student {email: $email})
        WHERE NOT u:softDeleted
        RETURN u;
    `;

    const queryParams = { email: body.email };

    return { query, queryParams };
};


const findRegisteredEmailQuery = (body) => {
    const query = "MATCH (u:Student {email: $email}) RETURN u;";

    const queryParams = { email: body.email };

    return { query, queryParams };
};

const findDeletedStudentQuery = (body) => {
    const query = `
        MATCH (u:Student {email: $email})
        WHERE  u:softDeleted
        RETURN u;
    `;

    const queryParams = { email: body.email };

    return { query, queryParams };
};

const getStudentQuery = (params) => {
    const query = `
        MATCH (u:Student {uuid: $uuid}) 
        WHERE NOT u:softDeleted 
        RETURN u;
    `;

    const queryParams = { uuid: params.uuid };

    return { query, queryParams };
};

const updateStudentQuery = (body) => {
    let propsToUpdate = [];
    const queryParams = { uuid: body.uuid };

    if (body.totalExp) {
        propsToUpdate.push("u.totalExp = $totalExp");
        queryParams.totalExp = body.totalExp;
    }
    if (body.weeklyExp) {
        propsToUpdate.push("u.weeklyExp = $weeklyExp");
        queryParams.weeklyExp = body.weeklyExp;
    }
    if (body.userName) {
        propsToUpdate.push("u.userName = $userName");
        queryParams.userName = body.userName;
    }
    if (body.email) {
        propsToUpdate.push("u.email = $email");
        queryParams.email = body.email;
    }
    if (body.password) {
        propsToUpdate.push("u.password = $password");
        queryParams.password = body.password;
    }

    const query = `
        MATCH (u:Student {uuid: $uuid})
        WHERE NOT u:softDeleted
        SET ${propsToUpdate.join(", ")}
        RETURN u;
    `;

    return { query, queryParams };
};

const deleteStudentQuery = (params) => {
    const query = `
        MATCH (u:Student {uuid: $uuid})
        SET u:softDeleted;
    `;

    const queryParams = { uuid: params.uuid };

    return { query, queryParams };
};

// Relation Queries
const createRelQuery = (body) => {
    const query = `
        MATCH (u:Student {uuid: $uuid}), (c:$label {uuid: $uuid2})
        WHERE NOT u:softDeleted AND NOT c:softDeleted
        CREATE (u)-[r:$relation]->(c)
        RETURN r;
    `;

    const queryParams = {
        uuid     : body.uuid,
        uuid2    : body.contentUuid,
        label    : body.contentLabel,
        relation : body.relation
    };

    return { query, queryParams };
};


const deleteRelQuery = (body) => {
    const query = `
        MATCH (u:Student {uuid: $uuid}), (c:$label {uuid: $uuid2})
        WHERE NOT u:softDeleted AND NOT c:softDeleted
        WITH u, c
        MATCH (u)-[r:$relation]->(c)
        DELETE r;
    `;

    const queryParams = {
        uuid     : body.uuid,
        uuid2    : body.contentUuid,
        label    : body.contentLabel,
        relation : body.relation
    };

    return { query, queryParams };
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