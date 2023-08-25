const {
    signUpQuery,
    logInQuery,
    findRegisteredEmailQuery,
    findDeletedStudentQuery,
    getStudentQuery,
    updateStudentQuery,
    deleteStudentQuery,

    createRelQuery,
    deleteRelQuery
} = require("../students.query.js");

describe("Student Query Tests", () => {
    it("signUpQuery should have proper query", () => {
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

    it("logInQuery should have proper query", () => {
        const body = {
            email: "AsyncResearch@mail.org"
        };

        const query = logInQuery(body);

        expect(query).toContain(`MATCH (u:Student {email: "${body.email}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted`);
    });

    it("findRegisteredEmailQuery should have proper query", () => {
        const body = {
            email: "AsyncResearch@mail.org"
        };

        const query = findRegisteredEmailQuery(body);

        expect(query).toContain(`MATCH (u:Student {email: "${body.email}"}) RETURN u;`);
    });

    it("getStudentQuery should have proper query", () => {
        const params = {
            uuid: "245710fd-67d0-45d4-a7a2-9e963aa45e7f"
        };

        const query = getStudentQuery(params);

        expect(query).toContain(`MATCH (u:Student {uuid: "${params.uuid}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted`);
    });

    it("updateStudentQuery should have proper query", () => {
        const body = {
            uuid     : "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
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

    it("deleteStudentQuery should have proper query", () => {
        const params = {
            uuid: "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
        };

        const query = deleteStudentQuery(params);

        expect(query).toContain(`MATCH (u:Student {uuid: "${params.uuid}"})`);
        expect(query).toContain(`SET u:softDeleted;`);
    });

    it("createRelQuery should have proper query", () => {
        const body = {
            uuid        : "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
            contentUuid : "c4fc0d8d-5608-4c1e-ab7e-1bf61392cd43",
            op          : "Day",
            relation    : "COMPLETED"
        };

        const query = createRelQuery(body);

        expect(query).toContain(`MATCH (u:Student {uuid: "${body.uuid}"}), (c:${body.contentLabel} {uuid: "${body.contentUuid}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted AND NOT c:softDeleted`);
        expect(query).toContain(`CREATE (u)-[r:${body.relation}]->(c)`);
    });

    it("deleteRelQuery should have proper query", () => {
        const body = {
            uuid        : "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
            contentUuid : "c4fc0d8d-5608-4c1e-ab7e-1bf61392cd43",
            op          : "Day",
            relation    : "COMPLETED",
        };

        const query = deleteRelQuery(body);

        expect(query).toContain(`MATCH (u:Student {uuid: "${body.uuid}"}), (c:${body.contentLabel} {uuid: "${body.contentUuid}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted AND NOT c:softDeleted`);
        expect(query).toContain(`WITH u, c`);
        expect(query).toContain(`MATCH (u)-[r:${body.relation}]->(c)`);
    });

    it("findDeletedStudentQuery should have proper query", () => {
        const body = {
            email: "AsyncResearch@mail.org"
        };

        const query = findDeletedStudentQuery(body);

        expect(query).toContain(`MATCH (u:Student {email: "${body.email}"})`);
        expect(query).toContain(`WHERE  u:softDeleted`);
        expect(query).toContain(`RETURN u;`);
    });
});