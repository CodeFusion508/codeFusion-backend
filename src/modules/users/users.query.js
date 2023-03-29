const findRegisteredUser = (body) => `MATCH (u: Student {email: "${body.email}"}) RETURN u;`;

const createUserQuery = (uuid, body) => {
    const query = `
        CREATE (u: Student:User 
            {
                uuid: "${uuid}", 
                totalExp: 0, 
                weeklyExp: 0, 
                email: "${body.email}", 
                userName: "${body.userName}", 
                password: "${body.password}"
            }
        )
        RETURN u;
    `;

    return query;
};

const deleteUserQuery = (params) => `
    MATCH (u: Student {uuid: "${params.uuid}"})
    SET u:softDeleted;
`;

const findUserQuery = (params) => `
    MATCH (u: Student {uuid: "${params.uuid}"}) 
    WHERE NOT u:softDeleted 
    RETURN u;
`;

const updateUserQuery = (body) => {
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
      MATCH (u: Student {uuid: "${body.uuid}"})
      WHERE NOT u:softDeleted
      SET ${propsToUpdate.join(", ")}
      RETURN u;
    `;

    return updateQuery;
};
const logInQuery = (body) => {
    const query = `
        MATCH (u: Student {email: "${body.email}"})
        WHERE NOT u:softDeleted
        RETURN u;
    `;

    return query;
};

module.exports = {
    createUserQuery,
    deleteUserQuery,
    findRegisteredUser,
    findUserQuery,
    updateUserQuery,
    logInQuery,
};