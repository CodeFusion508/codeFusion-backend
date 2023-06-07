const {
    createDayQuery,
    getAllDaysQuery,
    updateDayQuery,
    getDayQuery,
    deleteDayQuery,

    getDaysRelsQuery
} = require("../days.query.js");

describe("day querys tests", () => {
    it("createDayQuery", () => {
        const body = {
            desc: "something1!here"
        };
        const uuid = "1c12d3x-123d1232c13";

        const query = createDayQuery(uuid, body);

        expect(query).toContain(`CREATE (d:Day`);
        expect(query).toContain(`"${uuid}"`);
        expect(query).toContain(`CREATE (d)-[:BELONGS_TO {dayNo: ${body.dayNo}}]->(s)`);
    });

    it("getAllDaysQuery", () => {
        const query = getAllDaysQuery();

        expect(query).toContain("MATCH (d:Day)");
        expect(query).toContain("WHERE NOT d:softDeleted");
        expect(query).toContain("RETURN d;");
    });

    it("updateDayQuery", () => {
        const body = {
            uuid : "1c12d3x-123d1232c13",
            desc : "something1!here",
            exp  : 10
        };

        const query = updateDayQuery(body);

        expect(query).toContain(`MATCH (d:Day {uuid: "${body.uuid}"})`);
        expect(query).toContain("SET");
        expect(query).toContain(`d.exp = ${body.exp}`);
        expect(query).toContain(`d.desc = "${body.desc}"`);
    });

    it("getDayQuery", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13"
        };

        const query = getDayQuery(params);

        expect(query).toContain(`MATCH (d: Day {uuid: "${params.uuid}"})`);
        expect(query).toContain("WHERE NOT d:softDeleted");
        expect(query).toContain("RETURN d;");
    });

    it("deleteDayQuery", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13"
        };

        const query = deleteDayQuery(params);

        expect(query).toContain(`MATCH (d: Day {uuid: "${params.uuid}"})`);
        expect(query).toContain("SET d:softDeleted;");
    });

    it("getDaysRelsQuery", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13"
        };

        const query = getDaysRelsQuery(params);

        expect(query).toContain(`MATCH (c)-[r:BELONGS_TO]->(d:Day {uuid: "${params.uuid}"})`);
        expect(query).toContain("WHERE NOT d:softDeleted AND NOT c:softDeleted");
        expect(query).toContain("RETURN c, r;");
    });
});