const {
    createDayQuery,
    getAllDaysQuery,
    updateDayQuery,
    getDayQuery,
    deleteDayQuery,

    getDaysRelsQuery
} = require("../days.query.js");

describe("Day Query Tests", () => {
    it("createDayQuery should have proper query", () => {
        const body = {
            desc       : 12,
            dayNo      : 4,
            sprintUuid : "356a0665-e499-408b-95d9-93aec11a9544"
        };
        const uuid = "e1fa1541-a533-4936-bcbd-19221ad5da9e";

        const query = createDayQuery(uuid, body);

        expect(query).toContain(`CREATE (d:Day`);
        expect(query).toContain(`"${uuid}"`);
        expect(query).toContain(`"${body.sprintUuid}"`);
        expect(query).toContain(`CREATE (d)-[:BELONGS_TO {dayNo: ${body.dayNo}}]->(s)`);
    });

    it("getAllDaysQuery should have proper query", () => {
        const query = getAllDaysQuery();

        expect(query).toContain("MATCH (d:Day)");
        expect(query).toContain("WHERE NOT d:softDeleted");
        expect(query).toContain("RETURN d;");
    });

    it("updateDayQuery should have proper query", () => {
        const body = {
            uuid : "e1fa1541-a533-4936-bcbd-19221ad5da9e",
            exp  : 1994,
            desc : "Hell on Earth"
        };

        const query = updateDayQuery(body);

        expect(query).toContain(`MATCH (d:Day {uuid: "${body.uuid}"})`);
        expect(query).toContain("SET");
        expect(query).toContain(`d.exp = ${body.exp}`);
        expect(query).toContain(`d.desc = "${body.desc}"`);
    });

    it("getDayQuery should have proper query", () => {
        const params = {
            uuid: "e1fa1541-a533-4936-bcbd-19221ad5da9e"
        };

        const query = getDayQuery(params);

        expect(query).toContain(`MATCH (d:Day {uuid: "${params.uuid}"})`);
        expect(query).toContain("WHERE NOT d:softDeleted");
        expect(query).toContain("RETURN d;");
    });

    it("deleteDayQuery should have proper query", () => {
        const params = {
            uuid: "e1fa1541-a533-4936-bcbd-19221ad5da9e"
        };

        const query = deleteDayQuery(params);

        expect(query).toContain(`MATCH (d: Day {uuid: "${params.uuid}"})`);
        expect(query).toContain("SET d:softDeleted;");
    });

    it("getDaysRelsQuery should have proper query", () => {
        const params = {
            uuid: "e1fa1541-a533-4936-bcbd-19221ad5da9e"
        };

        const query = getDaysRelsQuery(params);

        expect(query).toContain(`MATCH (c:Content)-[r:BELONGS_TO]->(d:Day {uuid: "${params.uuid}"})`);
        expect(query).toContain("WHERE NOT d:softDeleted AND NOT c:softDeleted");
        expect(query).toContain("RETURN c, r;");
    });
});