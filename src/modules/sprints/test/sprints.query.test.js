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
        const uuid = "MOCK-0e32-486c-9205-cc6c2b87eaf0";

        const query = createSprintQuery(uuid, body);

        expect(query).toContain(`CREATE (s:Sprint`);
        expect(query).toContain(`"${uuid}"`);
        expect(query).toContain(`${body.sprintNo}`);
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
            uuid     : "MOCK-0e32-486c-9205-cc6c2b87eaf0",
            sprintNo : 1993,
            title    : "Doom",
            desc     : "Avenge Daisy",
            totalExp : 1993
        };

        const query = updateSprintQuery(body);

        expect(query).toContain(`MATCH (s:Sprint {uuid: "${body.uuid}"})`);
        expect(query).toContain("WHERE NOT s:softDeleted");
        expect(query).toContain("SET");
        expect(query).toContain(`s.sprintNo = ${body.sprintNo}`);
        expect(query).toContain(`s.title = "${body.title}"`);
        expect(query).toContain(`s.desc = "${body.desc}"`);
        expect(query).toContain(`s.totalExp = ${body.totalExp}`);
    });

    it("getSprintQuery should have proper query", () => {
        const params = {
            uuid: "MOCK-0e32-486c-9205-cc6c2b87eaf0"
        };

        const query = getSprintQuery(params);

        expect(query).toContain(`MATCH (s:Sprint {uuid: "${params.uuid}"})`);
        expect(query).toContain("WHERE NOT s:softDeleted");
        expect(query).toContain("RETURN s;");
    });

    it("deleteSprintQuery should have proper query", () => {
        const params = {
            uuid: "MOCK-0e32-486c-9205-cc6c2b87eaf0"
        };

        const query = deleteSprintQuery(params);

        expect(query).toContain(`MATCH (s:Sprint {uuid: "${params.uuid}"})`);
        expect(query).toContain("SET s:softDeleted;");
    });

    it("getSprintsRelsQuery should have proper query", () => {
        const params = {
            uuid: "MOCK-0e32-486c-9205-cc6c2b87eaf0"
        };

        const query = getSprintsRelsQuery(params);

        expect(query).toContain(`MATCH (d)-[r:BELONGS_TO]->(s:Sprint {uuid: "${params.uuid}"})`);
        expect(query).toContain("WHERE NOT s:softDeleted AND NOT d:softDeleted");
        expect(query).toContain("RETURN d, r;");
    });
});