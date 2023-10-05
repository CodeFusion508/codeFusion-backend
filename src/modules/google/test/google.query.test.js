const {
    findRegisteredEmail,
    googleSignUpQuery,
} = require("../google.query.js");

describe("Google Query Tests", () => {
    it("googleSignUpQuery should have proper query", () => {
        const body = {
            email    : "AsyncResearch@mail.org",
            userName : "Async Research Institute"
        };
        const uuid = "9e35cf4f-3caf-41e6-bd7e-ed4efa5c031c";

        const { query, queryParams } = googleSignUpQuery(uuid, body);

        expect(query).toContain("CREATE (u:Student:User {");
        expect(query).toContain("uuid      : $uuid,");
        expect(query).toContain("email     : $email,");
        expect(query).toContain("userName  : $userName,");
        expect(queryParams).toHaveProperty("uuid", uuid);
    });

    it("findRegisteredEmail should have proper query", () => {
        const body = {
            email: "AsyncResearch@mail.org",
        };

        const { query, queryParams } = findRegisteredEmail(body);

        expect(query).toContain("MATCH (u:Student {email: $email})");
        expect(query).toContain("RETURN u;");
        expect(queryParams).toHaveProperty("email", body.email);
    });
});