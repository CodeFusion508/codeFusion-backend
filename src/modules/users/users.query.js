const createUserQuery = (data) => {
    const query = `
        CREATE (u: Student 
            {
                uuid: "${data.uuid}", 
                totalExp: "0", 
                weeklyExp: "0", 
                email: "${data.email}", 
                userName: "${data.userName}"
            }
        )
    `;

    return query;
}

const findUserQuery = (data) => `MATCH (u: User {uuid: "${data.uuid}"}) RETURN u`;

module.exports = {
    createUserQuery,
    findUserQuery
};