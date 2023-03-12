const createUserQuery = (body) => {
    const query = `
        CREATE (u: Student 
            {
                uuid: "${body.uuid}", 
                totalExp: "0", 
                weeklyExp: "0", 
                email: "${body.email}", 
                userName: "${body.userName}", 
                password: "${body.password}"
            }
        )
    `;

    return query;
};

const findUserQuery = (params) => `MATCH (u: User {uuid: "${params.uuid}"}) RETURN u`;

module.exports = {
    createUserQuery,
    findUserQuery
};