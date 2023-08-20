const {
    createContentQuery,
    updatedContentQuery,
    getContentQuery,
    deletedContentQuery
} = require("../content.query.js");

describe("content queries tests", () => {
    it("createContentQuery", () => {
        const body = {
            label     : "d0,e",
            path      : "/3d3d3/",
            exp       : 10,
            title     : "something 1",
            desc      : "something 1/.",
            dayUuid   : "2k3-d4l42-3d-l4d23",
            contentNo : 6,
            time      : 100
        };
        const uuid = "1c12d3x-123d1232c13";

        const query = createContentQuery(uuid, body);

        expect(query).toContain(`CREATE (c:Content:${body.label}`);
        expect(query).toContain(`"${uuid}"`);
        expect(query).toContain(`"${body.title}"`);
        expect(query).toContain(`"${body.path}"`);
        expect(query).toContain(`CREATE (c)-[:BELONGS_TO {contentNo: ${body.contentNo}}]->(d)`);
    });

    it("getContentQuery", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13"
        };

        const query = getContentQuery(params);

        expect(query).toContain(`MATCH (c:Content {uuid: "${params.uuid}"})`);
        expect(query).toContain("WHERE NOT c:softDeleted");
        expect(query).toContain("RETURN c;");
    });

    it("updatedContentQuery", () => {
        const body = {
            label : "Text",
            uuid  : "1d3-d-312s3123s12-123s",
            desc  : "lorem asd",
            path  : "3s/3sasdsrcff",
            exp   : 120,
            title : "section 1",
            time  : 1000
        };

        const query = updatedContentQuery(body);

        expect(query).toContain(`MATCH (c:Content:Text {uuid: "${body.uuid}"})`);
        expect(query).toContain(`c.path = "${body.path}"`);
        expect(query).toContain(`c.title = "${body.title}"`);
        expect(query).toContain(`c.desc = "${body.desc}"`);
        expect(query).toContain("SET");
        expect(query).toContain("RETURN c;");
    });

    it("deletedContentQuery", () => {
        const params = {
            uuid: "1c12d3x-123d1232c13"
        };

        const query = deletedContentQuery(params);

        expect(query).toContain(`MATCH (c:Content {uuid: "${params.uuid}"})`);
        expect(query).toContain("SET c:softDeleted;");
    });
});