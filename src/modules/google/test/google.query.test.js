const {
    findRegisteredEmail,
    googleSignUpQuery,
} = require("../google.query.js");

describe("Google Query Tests", () => {
    it("googleSignUpQuery Test", () => {
        const body = {
            email    : "AsyncResearch@mail.org",
            userName : "Async Research Institute"
        };
        const uuid = "9e35cf4f-3caf-41e6-bd7e-ed4efa5c031c";

        const query = googleSignUpQuery(uuid, body);

        expect(query).toContain("CREATE (u:Student:User");
        expect(query).toContain(`"${uuid}"`);
        expect(query).toContain(`"${body.email}"`);
        expect(query).toContain(`"${body.userName}"`);
    });

    it("findRegisteredEmail Test", () => {
        const body = {
            email: "AsyncResearch@mail.org",
        };

        const query = findRegisteredEmail(body);

        expect(query).toContain(`MATCH (u:Student {email: "${body.email}"}) RETURN u;`);
    });
});