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

    it("logInQuery Test", () => {
        const body = {
            email: "AsyncResearch@mail.org"
        };

        const query = logInQuery(body);

        expect(query).toContain(`MATCH (u:Student {email: "${body.email}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted`);
    });

    it("findRegisteredEmailQuery Test", () => {
        const body = {
            email: "AsyncResearch@mail.org"
        };

        const query = findRegisteredEmailQuery(body);

        expect(query).toContain(`MATCH (u:Student {email: "${body.email}"}) RETURN u;`);
    });

    it("getStudentQuery Test", () => {
        const params = {
            uuid: "G1bB3ri$-X5Y9-!nv4l!d-#c0d3-Z7T8X@7"
        };

        const query = getStudentQuery(params);

        expect(query).toContain(`MATCH (u:Student {uuid: "${params.uuid}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted`);
    });

    it("updateStudentQuery Test", () => {
        const body = {
            uuid     : "G1bB3ri$-X5Y9-!nv4l!d-#c0d3-Z7T8X@7",
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

    it("deleteStudentQuery Test", () => {
        const params = {
            uuid: "G1bB3ri$-X5Y9-!nv4l!d-#c0d3-Z7T8X@7",
        };

        const query = deleteStudentQuery(params);

        expect(query).toContain(`MATCH (u:Student {uuid: "${params.uuid}"})`);
        expect(query).toContain(`SET u:softDeleted;`);
    });

    it("createRelQuery Test", () => {
        const body = {
            uuid        : "G1bB3ri$-X5Y9-!nv4l!d-#c0d3-Z7T8X@7",
            contentUuid : "@B9D3F1-!XZ@QP-9876-PL0M9N-A#C2E4",
            op          : "Day",
            relation    : "COMPLETED"
        };

        const query = createRelQuery(body);

        expect(query).toContain(`MATCH (u:Student {uuid: "${body.uuid}"}), (c:${body.op} {uuid: "${body.contentUuid}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted AND NOT c:softDeleted`);
        expect(query).toContain(`CREATE (u)-[r:${body.relation}`);
    });

    it("deleteRelQuery Test", () => {
        const body = {
            uuid        : "G1bB3ri$-X5Y9-!nv4l!d-#c0d3-Z7T8X@7",
            contentUuid : "@B9D3F1-!XZ@QP-9876-PL0M9N-A#C2E4",
            op          : "Day",
            relation    : "COMPLETED",
        };

        const query = deleteRelQuery(body);

        expect(query).toContain(`MATCH (u:Student {uuid: "${body.uuid}"}), (c:${body.op} {uuid: "${body.contentUuid}"})`);
        expect(query).toContain(`WHERE NOT u:softDeleted AND NOT c:softDeleted`);
        expect(query).toContain(`WITH u, c`);
        expect(query).toContain(`MATCH (u)-[r:${body.relation}]->(c)`);
    });

    it("findDeletedStudentQuery Test", () => {
        const body = {
            email: "AsyncResearch@mail.org"
        };

        const query = findDeletedStudentQuery(body);

        expect(query).toContain(`MATCH (u:Student {email: "${body.email}"})`);
        expect(query).toContain(`WHERE  u:softDeleted`);
        expect(query).toContain(`RETURN u;`);
    });
});