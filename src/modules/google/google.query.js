// Student CRUD
const findRegisteredEmail = (body) => `MATCH (u:Student {email: "${body.email}"}) RETURN u;`;
const googleSignUpQuery = (uuid, body) => {
    const query = `
        CREATE (u:Student:User 
            {
                uuid      : "${uuid}", 
                totalExp  : 0, 
                weeklyExp : 0, 
                email     : "${body.email}", 
                userName  : "${body.userName}"
            }
        )
        RETURN u;
    `;

    return query;
};

module.exports = { findRegisteredEmail, googleSignUpQuery };