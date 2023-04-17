const {
    createSprintQuery,
    getAllSprintsQuery,
    updateSprintQuery,
    getSprintQuery,
    deleteSprintQuery,
    getSprintsRelsQuery
} = require("../days.query.js");

describe("users query tests", () => {
    it("createSprintQuery", () => {
        const body = {
            title : "something1!here",
            desc  : "something1!here"
        };
        const uuid = "1c12d3x-123d1232c13";

        const query = createSprintQuery(uuid, body);

        expect(query).toContain(`CREATE (s:Sprint:${body.label}`);
        expect(query).toContain(`"${uuid}"`);
    });

});