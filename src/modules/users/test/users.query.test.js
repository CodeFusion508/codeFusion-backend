const {
    findRegisteredEmail,
    signUpQuery,
    logInQuery,
    getUserQuery,
    updateUserQuery,
    deleteUserQuery,

    createRelQuery,
    deleteRelQuery
} = require("../users.query.js");

describe("users query tests", () => {
    it("createUserQuery", () => {
        const body = {
            email    : "testing10390@gmail.com",
            password : "1234",
            userName : "testing800",
        };
        const uuid = "1c12d3x-123d1232c13";

        const query = signUpQuery(uuid, body);

        expect(query).toContain("CREATE (u:Student:User");
        expect(query).toContain(`"${uuid}"`);
        expect(query).toContain(`"${body.email}"`);
        expect(query).toContain(`"${body.password}"`);
        expect(query).toContain(`"${body.userName}"`);
    });

    it("deleteUserQuery", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13",
        };

        const query = deleteUserQuery(params);

        expect(query).toContain(`MATCH (u:Student {uuid: "${params.uuid}"})`);
        expect(query).toContain(`SET u:softDeleted;`);
    });

    it("findRegisteredEmail", () => {
        const body = {
            email: "JohnnyAppleSeed@mail.com"
        };

        const query = findRegisteredEmail(body);

        expect(query).toContain(`MATCH (u:Student {email: "${body.email}"}) RETURN u;`);
    });

    it("logInQuery", () => {
        const body = {
            email: "JohnnyAppleSeed@mail.com"
        };

        const query = logInQuery(body);

        expect(query).toContain(`MATCH (u:Student {email: "${body.email}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted`);
    });

    it("getUserQuery", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13",
        };

        const query = getUserQuery(params);

        expect(query).toContain(`MATCH (u:Student {uuid: "${params.uuid}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted`);
    });

    it("updateUserQuery", () => {
        const body = {
            uuid     : "1c12d3x-123d1232c13",
            email    : "testing10390@gmail.com",
            password : "1234",
            userName : "testing800",
        };

        const query = updateUserQuery(body);

        expect(query).toContain(`MATCH (u:Student {uuid: "${body.uuid}"})`);
        expect(query).toContain(`SET`);
        expect(query).toContain(`u.email = "${body.email}"`);
        expect(query).toContain(`u.password = "${body.password}"`);
        expect(query).toContain(`u.userName = "${body.userName}"`);
    });

    it("createRelQuery", () => {
        const body = {
            uuid        : "73d45f70-2f67-46ba-9609-1302f454065a",
            contentUuid : "4b0e6156-cb5b-4c6a-9cf0-fdf98e1c24b8",
            op          : "Day",
            relation    : "COMPLETED",
        };

        const query = createRelQuery(body);

        expect(query).toContain(`MATCH (u:Student {uuid: "${body.uuid}"}), (c:${body.op} {uuid: "${body.contentUuid}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted AND NOT c:softDeleted`);
        expect(query).toContain(`WITH u, c`);
        expect(query).toContain(`CREATE (u)-[r:${body.relation}]->(c)`);
    });

    it("deleteRelQuery", () => {
        const body = {
            uuid        : "73d45f70-2f67-46ba-9609-1302f454065a",
            contentUuid : "4b0e6156-cb5b-4c6a-9cf0-fdf98e1c24b8",
            op          : "Day",
            relation    : "COMPLETED",
        };

        const query = deleteRelQuery(body);

        expect(query).toContain(`MATCH (u:Student {uuid: "${body.uuid}"}), (c:${body.op} {uuid: "${body.contentUuid}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted AND NOT c:softDeleted`);
        expect(query).toContain(`WITH u, c`);
        expect(query).toContain(`MATCH (u)-[r:${body.relation}]->(c)`);
    });
});