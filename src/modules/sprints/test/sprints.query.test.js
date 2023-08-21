const {
    createSprintQuery,
    getAllSprintsQuery,
    updateSprintQuery,
    getSprintQuery,
    deleteSprintQuery,

    getSprintsRelsQuery
} = require("../sprints.query.js");

describe("Sprints Query Tests", () => {
    it("createSprintQuery should have proper query", () => {
        const body = {
            title : "something1!here",
            desc  : "something1!here"
        };
        const uuid = "1c12d3x-123d1232c13";

        const query = createSprintQuery(uuid, body);

        expect(query).toContain(`CREATE (s:Sprint:${body.label}`);
        expect(query).toContain(`"${uuid}"`);
        expect(query).toContain(`"${body.title}"`);
        expect(query).toContain(`"${body.desc}"`);
        expect(query).toContain("RETURN s;");
    });

    it("getAllSprintsQuery should have proper query", () => {
        const query = getAllSprintsQuery();

        expect(query).toContain("MATCH (s:Sprint)");
        expect(query).toContain("WHERE NOT s:softDeleted");
        expect(query).toContain("RETURN s;");
    });

    it("updateSprintQuery should have proper query", () => {
        const body = {
            uuid  : "1c12d3x-123d1232c13",
            title : "something1!here",
            desc  : "something1!here"
        };

        const query = updateSprintQuery(body);

        expect(query).toContain(`MATCH (s:Sprint {uuid: "${body.uuid}"})`);
        expect(query).toContain("WHERE NOT s:softDeleted");
        expect(query).toContain("SET");
        expect(query).toContain(`s.title = "${body.title}"`);
        expect(query).toContain(`s.desc = "${body.desc}"`);
    });

    it("getSprintQuery should have proper query", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13"
        };

        const query = getSprintQuery(params);

        expect(query).toContain(`MATCH (s:Sprint {uuid: "${params.uuid}"})`);
        expect(query).toContain("WHERE NOT s:softDeleted");
        expect(query).toContain("RETURN s;");
    });

    it("deleteSprintQuery should have proper query", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13"
        };

        const query = deleteSprintQuery(params);

        expect(query).toContain(`MATCH (s:Sprint {uuid: "${params.uuid}"})`);
        expect(query).toContain("SET s:softDeleted;");
    });

    it("getSprintsRelsQuery should have proper query", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13"
        };

        const query = getSprintsRelsQuery(params);

        expect(query).toContain(`MATCH (d)-[r:BELONGS_TO]->(s:Sprint {uuid: "${params.uuid}"})`);
        expect(query).toContain("WHERE NOT s:softDeleted AND NOT d:softDeleted");
        expect(query).toContain("RETURN d, r;");
    });
});