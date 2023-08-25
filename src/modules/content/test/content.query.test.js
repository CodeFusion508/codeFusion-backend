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

            element  : "div",
            content  : "Gaming",
            language : "Java"
        };
        const uuid = "f40eeba5-392d-464f-8c3f-f246d13658bd";

        const query = createContentQuery(uuid, body);

        expect(query).toContain(`CREATE (c:Content:${body.label}`);
        expect(query).toContain(`"${uuid}"`);
        expect(query).toContain(`"${body.title}"`);
        expect(query).toContain(`"${body.content}"`);
        expect(query).toContain(`CREATE (c)-[:BELONGS_TO {contentNo: ${body.contentNo}}]->(d)`);
    });

    it("getContentQuery should have proper query", () => {
        const params = {
            uuid: "f40eeba5-392d-464f-8c3f-f246d13658bd"
        };

        const query = getContentQuery(params);

        expect(query).toContain(`MATCH (c:Content {uuid: "${params.uuid}"})`);
        expect(query).toContain("WHERE NOT c:softDeleted");
        expect(query).toContain("RETURN c;");
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

            element  : "div",
            content  : "Gaming",
            language : "Java"
        };

        const query = updatedContentQuery(body);

        expect(query).toContain(`MATCH (c:Content:${body.label} {uuid: "${body.uuid}"})`);
        expect(query).toContain(`c.content = "${body.content}"`);
        expect(query).toContain(`c.title = "${body.title}"`);
        expect(query).toContain(`c.desc = "${body.desc}"`);
        expect(query).toContain("SET");
        expect(query).toContain("RETURN c;");
    });

    it("deletedContentQuery should have proper query", () => {
        const params = {
            uuid: "f40eeba5-392d-464f-8c3f-f246d13658bd",
        };

        const query = deletedContentQuery(params);

        expect(query).toContain(`MATCH (c:Content {uuid: "${params.uuid}"})`);
        expect(query).toContain("SET c:softDeleted;");
    });
});