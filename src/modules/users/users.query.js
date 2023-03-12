const createUserQuery = (body) => {
    const query = `
        CREATE (u: Student 
            {
                uuid: "${body.uuid}", 
                totalExp: 0, 
                weeklyExp: 0, 
                email: "${body.email}", 
                userName: "${body.userName}", 
                password: "${body.password}"
            }
        )
    `;

    return query;
};

const findUserQuery = (params) => `MATCH (u: Student {uuid: "${params.uuid}"}) RETURN u`;
const findRegisteredUser = (body) => `MATCH (u: Student {email: "${body.email}"}) RETURN u`;

const updateUserQuery = (body) => {
    const query = `
        MATCH (u: Student {uuid: "${body.uuid}"})
        SET u.totalExp = "${body.totalExp}", u.weeklyExp = "${body.weeklyExp}", u.userName = "${body.userName}", u.email = "${body.email}", u.password = "${body.password}"
        RETURN u
    `;

    return query;
};

module.exports = {
    createUserQuery,
    findRegisteredUser,
    findUserQuery,
    updateUserQuery
};