/* eslint-disable no-undef */
const createUserQuery = `
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

const findUserQuery = `MATCH (u: User {uuid: "${data.uuid}"}) RETURN u`;

module.exports = {
    createUserQuery,
    findUserQuery
};