const findRegisteredEmail = (body) => {
    const query = `
        MATCH (u:Student {email: $email})
        RETURN u;
    `;

    const queryParams = { email: body.email };

    return { query, queryParams };
};

const googleSignUpQuery = (uuid, body) => {
    const query = `
        CREATE (u:Student:User {
            uuid      : $uuid, 
            totalExp  : 0, 
            weeklyExp : 0, 
            email     : $email, 
            userName  : $userName, 
        })
        RETURN u;
    `;

    const queryParams = {
        uuid,
        email    : body.email,
        userName : body.userName
    };

    return { query, queryParams };
};

module.exports = { findRegisteredEmail, googleSignUpQuery };