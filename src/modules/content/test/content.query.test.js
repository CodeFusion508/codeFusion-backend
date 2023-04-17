const {
    createDayQuery,
    getAllDaysQuery,
    updateDayQuery,
    getDayQuery,
    deleteDayQuery,
    getDaysRelsQuery
} = require("../content.query.js");

describe("day querys tests", () => {
    it("createDayQuery", () => {
        const body = {
            desc: "something1!here"
        };
        const uuid = "1c12d3x-123d1232c13";

        const query = createDayQuery(uuid, body);

        expect(query).toContain(`CREATE (d:Day`);
        expect(query).toContain(`"${uuid}"`);
        expect(query).toContain(`CREATE (d)-[:BELONGS_TO {dayNo: ${body.dayNo}}]->(s:Sprint {uuid: "${body.sprintUuid}"})`);
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
});