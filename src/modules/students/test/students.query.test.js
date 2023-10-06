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

        const { query, queryParams } = signUpQuery(uuid, body);

        expect(query).toContain("CREATE (u:Student:User {");
        expect(query).toContain("uuid      : $uuid,");
        expect(query).toContain("password  : $password");
        expect(queryParams).toHaveProperty("uuid", uuid);
    });

    it("logInQuery should have proper query", () => {
        const body = {
            email: "AsyncResearch@mail.org"
        };

        const { query, queryParams } = logInQuery(body);

        expect(query).toContain("MATCH (u:Student {email: $email})");
        expect(query).toContain("WHERE NOT u:softDeleted");
        expect(query).toContain("RETURN u;");
        expect(queryParams).toHaveProperty("email", body.email);
    });

    it("findRegisteredEmailQuery should have proper query", () => {
        const body = {
            email: "AsyncResearch@mail.org"
        };

        const { query, queryParams } = findRegisteredEmailQuery(body);

        expect(query).toContain("MATCH (u:Student {email: $email}) RETURN u;");
        expect(queryParams).toHaveProperty("email", body.email);
    });

    it("getStudentQuery should have proper query", () => {
        const params = {
            uuid: "245710fd-67d0-45d4-a7a2-9e963aa45e7f"
        };

        const { query, queryParams } = getStudentQuery(params);

        expect(query).toContain("MATCH (u:Student {uuid: $uuid})");
        expect(query).toContain("WHERE NOT u:softDeleted");
        expect(query).toContain("RETURN u;");
        expect(queryParams).toHaveProperty("uuid", params.uuid);
    });

    it("updateStudentQuery should have proper query", () => {
        const body = {
            uuid     : "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
            email    : "AsyncResearch@mail.org",
            password : "password",
            userName : "Async Research Institute"
        };

        const { query, queryParams } = updateStudentQuery(body);

        expect(query).toContain("MATCH (u:Student {uuid: $uuid})");
        expect(query).toContain("SET u.userName = $userName, u.email = $email,");
        expect(query).toContain("RETURN u;");
        expect(queryParams).toHaveProperty("uuid", body.uuid);
    });

    it("deleteStudentQuery should have proper query", () => {
        const params = {
            uuid: "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
        };

        const { query, queryParams } = deleteStudentQuery(params);

        expect(query).toContain("MATCH (u:Student {uuid: $uuid})");
        expect(query).toContain("SET u:softDeleted;");
        expect(queryParams).toHaveProperty("uuid", params.uuid);
    });

    it("createRelQuery should have proper query", () => {
        const body = {
            uuid        : "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
            contentUuid : "c4fc0d8d-5608-4c1e-ab7e-1bf61392cd43",
            op          : "Day",
            relation    : "COMPLETED"
        };

        const { query, queryParams } = createRelQuery(body);

        expect(query).toContain(`MATCH (u:Student {uuid: $uuid}), (c:${body.label} {uuid: $uuid2})`);
        expect(query).toContain("WHERE NOT u:softDeleted AND NOT c:softDeleted");
        expect(query).toContain(`CREATE (u)-[r:${body.relation}]->(c)`);
        expect(queryParams).toHaveProperty("uuid", body.uuid);
        expect(queryParams).toHaveProperty("uuid2", body.contentUuid);
    });

    it("deleteRelQuery should have proper query", () => {
        const body = {
            uuid        : "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
            contentUuid : "c4fc0d8d-5608-4c1e-ab7e-1bf61392cd43",
            op          : "Day",
            relation    : "COMPLETED",
        };

        const { query, queryParams } = deleteRelQuery(body);

        expect(query).toContain(`MATCH (u:Student {uuid: $uuid}), (c:${body.label} {uuid: $uuid2})`);
        expect(query).toContain("WHERE NOT u:softDeleted AND NOT c:softDeleted");
        expect(query).toContain(`MATCH (u)-[r:${body.relation}]->(c)`);
        expect(queryParams).toHaveProperty("uuid", body.uuid);
        expect(queryParams).toHaveProperty("uuid2", body.contentUuid);
    });

    it("findDeletedStudentQuery should have proper query", () => {
        const body = {
            email: "AsyncResearch@mail.org"
        };

        const { query, queryParams } = findDeletedStudentQuery(body);

        expect(query).toContain("MATCH (u:Student {email: $email})");
        expect(query).toContain("WHERE  u:softDeleted");
        expect(query).toContain("RETURN u;");
        expect(queryParams).toHaveProperty("email", body.email);
    });
});