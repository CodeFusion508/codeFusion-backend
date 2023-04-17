const {
    createContent,
    updateContent,
    getContent,
    deleteContent
} = require("../content.ctrl.js");

describe("users controller tests", () => {
    let deps;

    beforeAll(() => {
        deps = {
            config   : {},
            ctrls    : {},
            services : {
                neo4j: {
                    session: {
                        run: null
                    }
                }
            }
        };

    });

    describe("createContent", () => {
        it("createContent should return data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

            const body = {
                label     : "d0,e",
                path      : "/3d3d3/",
                exp       : 10,
                title     : "something 1",
                desc      : "something 1/.",
                dayUuid   : "2k3-d4l42-3d-l4d23",
                contentNo : 6,
                time      : 100,
            };
            const result = await createContent(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
        });
    });

    describe("updateContent", () => {
        it("updateContent should return data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

            const body = {
                uuid  : "d45f5f-g654g645-f5f53",
                label : "SECTION_1",
                path  : "/3d3d3/",
                title : "something 1",
                desc  : "something here1.",

            };
            const result = await updateContent(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
        });
    });

    describe("getContent", () => {
        it("getContent should return data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

            const params = {
                uuid: "d54jd3-d58k543-83k45d8-9dd84"
            };
            const result = await getContent(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
        });
    });

    describe("deleteContent", () => {
        it("deleteContent should return data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

            const params = {
                uuid: "d54jd3-d58k543-83k45d8-9dd84"
            };
            const result = await deleteContent(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result).toHaveProperty("node");
        });
    });

});

let mockCreate = {
    "records": [
        {
            "keys": [
                "c"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 60,
                        "high" : 0
                    },
                    "labels": [
                        "Content",
                        "Video"
                    ],
                    "properties": {
                        "path" : "section1/Javascript/day3/example.md",
                        "time" : {
                            "low"  : 300,
                            "high" : 0
                        },
                        "title" : "Reglas de Javascript",
                        "exp"   : {
                            "low"  : 30,
                            "high" : 0
                        },
                        "uuid" : "ae29fb7d-51e2-48b7-9aa7-8ca4f258b1b6",
                        "desc" : "Hoy es un video de las reglas y los tips de javascript y como usarlo bien."
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:60"
                }
            ],
            "_fieldLookup": {
                "c": 0
            }
        }
    ],
    "summary": {
        "query": {
            "text"       : "\n            CREATE (c: Content:Video\n                {\n                    uuid  : \"ae29fb7d-51e2-48b7-9aa7-8ca4f258b1b6\", \n                    path  : \"section1/Javascript/day3/example.md\",\n                    desc  : \"Hoy es un video de las reglas y los tips de javascript y como usarlo bien.\",\n                    exp   : 30,\n                    title : \"Reglas de Javascript\",\n                    time: 300\n                }\n            )\n            WITH c\n            CREATE (c)-[:BELONGS_TO {contentNo: 3}]->(d:Day { uuid: \"3fb02acb-b22f-49b6-82d7-4a6c5843d77d\" })\n            RETURN c;\n        ",
            "parameters" : {}
        },
        "queryType" : "rw",
        "counters"  : {
            "_stats": {
                "nodesCreated"         : 2,
                "nodesDeleted"         : 0,
                "relationshipsCreated" : 1,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 8,
                "labelsAdded"          : 3,
                "labelsRemoved"        : 0,
                "indexesAdded"         : 0,
                "indexesRemoved"       : 0,
                "constraintsAdded"     : 0,
                "constraintsRemoved"   : 0
            },
            "_systemUpdates"   : 0,
            "_containsUpdates" : true
        },
        "updateStatistics": {
            "_stats": {
                "nodesCreated"         : 2,
                "nodesDeleted"         : 0,
                "relationshipsCreated" : 1,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 8,
                "labelsAdded"          : 3,
                "labelsRemoved"        : 0,
                "indexesAdded"         : 0,
                "indexesRemoved"       : 0,
                "constraintsAdded"     : 0,
                "constraintsRemoved"   : 0
            },
            "_systemUpdates"   : 0,
            "_containsUpdates" : true
        },
        "plan"          : false,
        "profile"       : false,
        "notifications" : [],
        "server"        : {
            "address"         : "470f45fb.databases.neo4j.io:7687",
            "agent"           : "Neo4j/5.6-aura",
            "protocolVersion" : 5.1
        },
        "resultConsumedAfter": {
            "low"  : 10,
            "high" : 0
        },
        "resultAvailableAfter": {
            "low"  : 159,
            "high" : 0
        },
        "database": {
            "name": "neo4j"
        }
    }
};