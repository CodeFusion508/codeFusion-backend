const {
    createUserQuery,
    deleteUserQuery,
    findRegisteredUser,
    findUserQuery,
    // updateUserQuery,
    logInQuery
} = require("../users.query.js");

describe("users query tests", () => {
    it("createUserQuery", () => {
        const body = {
            email    : "testing10390@gmail.com",
            password : "1234",
            userName : "testing800",
        };
        const uuid = "1c12d3x-123d1232c13";

        const query = createUserQuery(uuid, body);

        expect(query).toContain("CREATE (u: Student:User");
        expect(query).toContain(`uuid: "${uuid}",`);
        expect(query).toContain(`"${body.email}"`);
        expect(query).toContain(`"${body.password}"`);
        expect(query).toContain(`"${body.userName}"`);
    });

    it("deleteUserQuery", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13",
        };

        const query = deleteUserQuery(params);

        expect(query).toContain(`MATCH (u: User {uuid: "${params.uuid}"})`);
        expect(query).toContain(`SET u:softDeleted;`);
    });

    it("findRegisteredUser", () => {
        const body = {
            email: "JohnnyAppleSeed@mail.com"
        };

        const query = findRegisteredUser(body);

        expect(query).toContain(`MATCH (u: Student {email: "${body.email}"}) RETURN u;`);
    });

    it("logInQuery", () => {
        const body = {
            email: "JohnnyAppleSeed@mail.com"
        };

        const query = logInQuery(body);

        expect(query).toContain(`MATCH (u: Student {email: "${body.email}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted`);
    });

    // it("updateUserQuery", () => {
    //     const params = {
    //         uuid: "1c12d3x-123d1232c13",
    //     };

    //     const query = updateUserQuery(params);

    //     expect(query).toContain(`MATCH (u: User {uuid: "${params.uuid}"})`);
    //     expect(query).toContain(`WHERE NOT u:softDeleted`);
    // });

    it("findUserQuery", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13",
        };

        const query = findUserQuery(params);

        expect(query).toContain(`MATCH (u: User {uuid: "${params.uuid}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted`);
    });
});