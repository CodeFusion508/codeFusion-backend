const {
    findRegisteredEmail,
    googleSignUpQuery,
} = require("../google.query.js");

describe("google users query tests", () => {
    it("googleSignUpQuery", () => {
        const body = {
            email    : "testing10390@gmail.com",
            userName : "testing800",
        };
        const uuid = "1c12d3x-123d1232c13";

        const query = googleSignUpQuery(uuid, body);

        expect(query).toContain("CREATE (u:Student:User");
        expect(query).toContain(`"${uuid}"`);
        expect(query).toContain(`"${body.email}"`);
        expect(query).toContain(`"${body.userName}"`);
    });

    it("findRegisteredEmail", () => {
        const body = {
            email: "JohnnyAppleSeed@mail.com"
        };

        const query = findRegisteredEmail(body);

        expect(query).toContain(`MATCH (u:Student {email: "${body.email}"}) RETURN u;`);
    });
});