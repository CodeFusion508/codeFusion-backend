const {
    createSprintQuery,
    getAllSprintsQuery,
    updateSprintQuery,
    getSprintQuery,
    deleteSprintQuery,
    getSprintsRelsQuery
} = require("./sprints.query.js");

describe("users query tests", () => {
    it("createSprintQuery", () => {
        const body = {
            email    : "testing10390@gmail.com",
            password : "1234",
            userName : "testing800",
        };
        const uuid = "1c12d3x-123d1232c13";

        const query = createSprintQuery(uuid, body);

        expect(query).toContain("CREATE (u:Student:User");
        expect(query).toContain(`"${uuid}"`);
        expect(query).toContain(`"${body.email}"`);
        expect(query).toContain(`"${body.password}"`);
        expect(query).toContain(`"${body.userName}"`);
    });


});