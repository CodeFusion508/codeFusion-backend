const {
    createContentQuery,
    updatedContentQuery,
    getContentQuery,
    deletedContentQuery
} = require("../content.query.js");

describe("Content Query Tests", () => {
    it("createContentQuery should have proper query", () => {
        const body = {
            label     : "Problem",
            exp       : 2009,
            title     : "Minecraft",
            desc      : "The creeper was a bug!",
            dayUuid   : "",
            contentNo : 2009,
            time      : 2009,

            language: "Java"
        };
        const uuid = "f40eeba5-392d-464f-8c3f-f246d13658bd";

        const { query, queryParams } = createContentQuery(uuid, body);

        expect(query).toContain(`CREATE (c:Content:${body.label} {`);
        expect(query).toContain("MATCH (d:Day {uuid: $dayUuid})");
        expect(query).toContain("CREATE (c)-[:BELONGS_TO {contentNo: $contentNo}]->(d)");
        expect(queryParams).toHaveProperty("dayUuid", body.dayUuid);
    });

    it("getContentQuery should have proper query", () => {
        const params = {
            uuid: "f40eeba5-392d-464f-8c3f-f246d13658bd"
        };

        const { query, queryParams } = getContentQuery(params);

        expect(query).toContain("MATCH (c:Content {uuid: $uuid})");
        expect(query).toContain("WHERE NOT c:softDeleted");
        expect(query).toContain("RETURN c;");
        expect(queryParams).toHaveProperty("uuid", params.uuid);
    });

    it("updatedContentQuery should have proper query", () => {
        const body = {
            uuid      : "f40eeba5-392d-464f-8c3f-f246d13658bd",
            label     : "Problem",
            exp       : 2009,
            title     : "Minecraft",
            desc      : "The creeper was a bug!",
            contentNo : 2009,
            time      : 2009,

            language: "Java"
        };

        const { query, queryParams } = updatedContentQuery(body);

        expect(query).toContain(`MATCH (c:Content:${body.label} {uuid: $uuid})`);
        expect(query).toContain("SET c.exp = $exp, c.title = $title,");
        expect(query).toContain("RETURN c;");
        expect(queryParams).toHaveProperty("uuid", body.uuid);
    });

    it("deletedContentQuery should have proper query", () => {
        const params = {
            uuid: "f40eeba5-392d-464f-8c3f-f246d13658bd",
        };

        const { query, queryParams } = deletedContentQuery(params);

        expect(query).toContain("MATCH (c:Content {uuid: $uuid})");
        expect(query).toContain("SET c:softDeleted;");
        expect(queryParams).toHaveProperty("uuid", params.uuid);
    });
});