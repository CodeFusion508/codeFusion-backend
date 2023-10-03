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

        const { query, queryParams } = createDayQuery(uuid, body);

        expect(query).toContain("CREATE (d:Day {");
        expect(query).toContain("MATCH (s:Sprint {uuid: $sprintUuid})");
        expect(query).toContain("CREATE (d)-[:BELONGS_TO {dayNo: $dayNo}]->(s)");
        expect(queryParams).toHaveProperty("sprintUuid", body.sprintUuid);
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

        const { query, queryParams } = updateDayQuery(body);

        expect(query).toContain("MATCH (d:Day {uuid: $uuid})");
        expect(query).toContain("SET d.exp = $exp, d.desc = $desc");
        expect(query).toContain("RETURN d;");
        expect(queryParams).toHaveProperty("uuid", body.uuid);
    });

    it("getDayQuery should have proper query", () => {
        const params = {
            uuid: "e1fa1541-a533-4936-bcbd-19221ad5da9e"
        };

        const { query, queryParams } = getDayQuery(params);

        expect(query).toContain("MATCH (d:Day {uuid: $uuid})");
        expect(query).toContain("WHERE NOT d:softDeleted");
        expect(query).toContain("RETURN d;");
        expect(queryParams).toHaveProperty("uuid", params.uuid);
    });

    it("deleteDayQuery should have proper query", () => {
        const params = {
            uuid: "e1fa1541-a533-4936-bcbd-19221ad5da9e"
        };

        const { query, queryParams } = deleteDayQuery(params);

        expect(query).toContain("MATCH (d:Day {uuid: $uuid})");
        expect(query).toContain("SET d:softDeleted;");
        expect(queryParams).toHaveProperty("uuid", params.uuid);
    });

    it("getDaysRelsQuery should have proper query", () => {
        const params = {
            uuid: "e1fa1541-a533-4936-bcbd-19221ad5da9e"
        };

        const { query, queryParams } = getDaysRelsQuery(params);

        expect(query).toContain("MATCH (c:Content)-[r:BELONGS_TO]->(d:Day {uuid: $uuid})");
        expect(query).toContain("WHERE NOT d:softDeleted AND NOT c:softDeleted");
        expect(query).toContain("RETURN c, r;");
        expect(queryParams).toHaveProperty("uuid", params.uuid);
    });
});