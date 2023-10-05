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
            sprintNo : 1993,
            title    : "The Backrooms",
            desc     : "If you're not careful and you noclip out of reality in the wrong areas"
        };
        const uuid = "997bb6d3-b309-492e-a19d-f9cbc1af7fbf";

        const { query, queryParams } = createSprintQuery(uuid, body);

        expect(query).toContain("CREATE (s:Sprint {");
        expect(query).toContain("uuid     : $uuid");
        expect(query).toContain("sprintNo : $sprintNo");
        expect(queryParams).toHaveProperty("sprintNo", body.sprintNo);
    });

    it("getAllSprintsQuery should have proper query", () => {
        const query = getAllSprintsQuery();

        expect(query).toContain("MATCH (s:Sprint)");
        expect(query).toContain("WHERE NOT s:softDeleted");
        expect(query).toContain("RETURN s;");
    });

    it("updateSprintQuery should have proper query", () => {
        const body = {
            uuid     : "997bb6d3-b309-492e-a19d-f9cbc1af7fbf",
            sprintNo : 1993,
            title    : "Doom",
            desc     : "Avenge Daisy",
            totalExp : 1993
        };

        const { query, queryParams } = updateSprintQuery(body);

        expect(query).toContain("MATCH (s:Sprint {uuid: $uuid})");
        expect(query).toContain("SET s.sprintNo = $sprintNo, s.title = $title,");
        expect(query).toContain("RETURN s;");
        expect(queryParams).toHaveProperty("uuid", body.uuid);
        expect(queryParams).toHaveProperty("sprintNo", body.sprintNo);
    });

    it("getSprintQuery should have proper query", () => {
        const params = {
            uuid: "997bb6d3-b309-492e-a19d-f9cbc1af7fbf"
        };

        const { query, queryParams } = getSprintQuery(params);

        expect(query).toContain("MATCH (s:Sprint {uuid: $uuid})");
        expect(query).toContain("WHERE NOT s:softDeleted");
        expect(query).toContain("RETURN s;");
        expect(queryParams).toHaveProperty("uuid", params.uuid);
    });

    it("deleteSprintQuery should have proper query", () => {
        const params = {
            uuid: "997bb6d3-b309-492e-a19d-f9cbc1af7fbf"
        };

        const { query, queryParams } = deleteSprintQuery(params);

        expect(query).toContain("MATCH (s:Sprint {uuid: $uuid})");
        expect(query).toContain("SET s:softDeleted;");
        expect(queryParams).toHaveProperty("uuid", params.uuid);
    });

    it("getSprintsRelsQuery should have proper query", () => {
        const params = {
            uuid: "997bb6d3-b309-492e-a19d-f9cbc1af7fbf"
        };

        const { query, queryParams } = getSprintsRelsQuery(params);

        expect(query).toContain("MATCH (d)-[r:BELONGS_TO]->(s:Sprint {uuid: $uuid})");
        expect(query).toContain("WHERE NOT s:softDeleted AND NOT d:softDeleted");
        expect(query).toContain("RETURN d, r;");
        expect(queryParams).toHaveProperty("uuid", params.uuid);
    });
});