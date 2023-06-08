const {
    signUpQuery,
    logInQuery,
    findRegisteredEmailQuery,
    findDeletedUserQuery,
    getStudentQuery,
    updateStudentQuery,
    deleteStudentQuery,

    createRelQuery,
    deleteRelQuery
} = require("../students.query.js");

describe("Student Query Tests", () => {
    it("signUpQuery Test", () => {
        const body = {
            email    : "AsyncResearch@mail.org",
            password : "password",
            userName : "Async Research Institute"
        };
        const uuid = "1c12d3x-123d1232c13";

        const query = signUpQuery(uuid, body);

        expect(query).toContain("CREATE (u:Student:User");
        expect(query).toContain(`"${uuid}"`);
        expect(query).toContain(`"${body.email}"`);
        expect(query).toContain(`"${body.password}"`);
        expect(query).toContain(`"${body.userName}"`);
    });

    it("logInQuery", () => {
        const body = {
            email: "AsyncResearch@mail.org",
        };

        const query = logInQuery(body);

        expect(query).toContain(`MATCH (u:Student {email: "${body.email}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted`);
    });

    it("findRegisteredEmailQuery", () => {
        const body = {
            email: "AsyncResearch@mail.org",
        };

        const query = findRegisteredEmailQuery(body);

        expect(query).toContain(`MATCH (u:Student {email: "${body.email}"}) RETURN u;`);
    });

    it("getStudentQuery", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13",
        };

        const query = getStudentQuery(params);

        expect(query).toContain(`MATCH (u:Student {uuid: "${params.uuid}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted`);
    });

    it("updateStudentQuery", () => {
        const body = {
            uuid     : "1c12d3x-123d1232c13",
            email    : "AsyncResearch@mail.org",
            password : "password",
            userName : "Async Research Institute"
        };

        const query = updateStudentQuery(body);

        expect(query).toContain(`MATCH (u:Student {uuid: "${body.uuid}"})`);
        expect(query).toContain(`SET`);
        expect(query).toContain(`u.email = "${body.email}"`);
        expect(query).toContain(`u.password = "${body.password}"`);
        expect(query).toContain(`u.userName = "${body.userName}"`);
    });

    it("deleteStudentQuery", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13",
        };

        const query = deleteStudentQuery(params);

        expect(query).toContain(`MATCH (u:Student {uuid: "${params.uuid}"})`);
        expect(query).toContain(`SET u:softDeleted;`);
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
        expect(query).toContain(`CREATE (u)-[r:${body.relation}`);
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