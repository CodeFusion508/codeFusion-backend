const {
    createContent,
    updateContent,
    getContent,
    deleteContent
} = require("../content.ctrl.js");

describe("Content Controller Tests", () => {
    let deps;

    beforeEach(() => {
        deps = {
            services: {
                neo4j: {
                    session: {
                        run: null
                    }
                }
            }
        };

    });

    describe("createContent Controller", () => {
        it("createContent should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

            const body = {
                label     : "Problem",
                exp       : 2009,
                title     : "Minecraft",
                desc      : "The creeper was a bug!",
                dayUuid   : "b994c88a-44b8-40a3-8f3e-788ccfdbb348",
                contentNo : 2009,
                time      : 2009,

                element  : "div",
                content  : "Gaming",
                language : "Java"
            };

            const result = await createContent(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
            expect(result.node).toHaveProperty("labels");
            expect(result.node).toHaveProperty("desc");
        });
    });

    describe("updateContent Controller", () => {
        it("getContent should throw an error and message", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmpty);

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

            const result = await updateContent(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err");
            expect(result).toHaveProperty("message");
        });

        it("updateContent should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

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

            const result = await updateContent(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result.stats).toHaveProperty("nodesCreated");
            expect(result.stats).toHaveProperty("propertiesSet");
            expect(result.node).toHaveProperty("uuid");
            expect(result.node).toHaveProperty("labels");
            expect(result.node).toHaveProperty("time");
        });
    });

    describe("getContent Controller", () => {
        it("getContent should throw an error and message", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmpty);

            const params = {
                uuid: "f40eeba5-392d-464f-8c3f-f246d13658bd"
            };

            const result = await getContent(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err");
            expect(result).toHaveProperty("message");
        });

        it("getContent should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

            const params = {
                uuid: "f40eeba5-392d-464f-8c3f-f246d13658bd"
            };

            const result = await getContent(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
            expect(result.node).toHaveProperty("labels");
            expect(result.node).toHaveProperty("desc");
        });
    });

    describe("deleteContent Controller", () => {
        it("deleteContent should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmpty);

            const params = {
                uuid: "f40eeba5-392d-464f-8c3f-f246d13658bd"
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

let mockEmpty = {
    "records" : [],
    "summary" : {
        "query": {
            "text"       : "\n    MATCH (c:Content {uuid: \"7bf98218-0b1d-4981-b6b7-3ab060f51b66\"})\n    SET c:softDeleted;\n",
            "parameters" : {}
        },
        "queryType" : "w",
        "counters"  : {
            "_stats": {
                "nodesCreated"         : 0,
                "nodesDeleted"         : 0,
                "relationshipsCreated" : 0,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 0,
                "labelsAdded"          : 1,
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
                "nodesCreated"         : 0,
                "nodesDeleted"         : 0,
                "relationshipsCreated" : 0,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 0,
                "labelsAdded"          : 1,
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
            "agent"           : "Neo4j/5.7-aura",
            "protocolVersion" : 5.2
        },
        "resultConsumedAfter": {
            "low"  : 0,
            "high" : 0
        },
        "resultAvailableAfter": {
            "low"  : 18,
            "high" : 0
        },
        "database": {
            "name": "neo4j"
        }
    }
};