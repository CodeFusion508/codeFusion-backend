const {
    createDay,
    updateDay,
    getDay,
    deleteDay,

    getDaysRels
} = require("../days.ctrl.js");

describe("Days Controller Tests", () => {
    let deps;

    beforeEach(() => {
        deps = {
            services: {
                neo4j: {
                    session: {
                        run: jest.fn().mockResolvedValue(mockCreate)
                    }
                }
            }
        };

    });

    describe("createDay Controller", () => {
        it("createDay should return formatted result", async () => {
            const body = {
                desc       : "BFG",
                dayNo      : 1993,
                sprintUuid : "356a0665-e499-408b-95d9-93aec11a9544"
            };

            const result = await createDay(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
        });
    });

    describe("updateDay Controller", () => {
        it("updateDay should throw an error and message", async () => {
            const body = {
                uuid: "e1fa1541-a533-4936-bcbd-19221ad5da9e"
            };

            const result = await updateDay(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err");
            expect(result).toHaveProperty("message");
        });

        it("updateDay should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

            const body = {
                uuid : "e1fa1541-a533-4936-bcbd-19221ad5da9e",
                exp  : 1994,
                desc : "Hell on Earth"
            };

            const result = await updateDay(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
            expect(result.node).toHaveProperty("exp");
            expect(result.node).toHaveProperty("desc");
        });
    });

    describe("getDay Controller", () => {
        it("getDay should throw an error and message", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmpty);

            const params = {
                uuid: "e1fa1541-a533-4936-bcbd-19221ad5da9e"
            };

            const result = await getDay(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err");
            expect(result).toHaveProperty("message");
        });

        it("getDay should return formatted result", async () => {
            const params = {
                uuid: "e1fa1541-a533-4936-bcbd-19221ad5da9e"
            };

            const result = await getDay(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
            expect(result.node).toHaveProperty("exp");
            expect(result.node).toHaveProperty("desc");
        });
    });

    describe("deleteDay Controller", () => {
        it("deleteDay should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmpty);

            const params = {
                uuid: "e1fa1541-a533-4936-bcbd-19221ad5da9e"
            };

            const result = await deleteDay(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result).toHaveProperty("node");
        });
    });

    describe("getDaysRels", () => {
        it("getDaysRels should throw an error and message", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmpty);

            const params = {
                uuid: "e1fa1541-a533-4936-bcbd-19221ad5da9e"
            };

            const result = await getDaysRels(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err");
            expect(result).toHaveProperty("message");
        });

        it("getDaysRels should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockDayRels);

            const params = {
                uuid: "e1fa1541-a533-4936-bcbd-19221ad5da9e"
            };

            const result = await getDaysRels(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node[0].node).toHaveProperty("labels");
            expect(result.node[0].node).toHaveProperty("uuid");
            expect(result.node[0].rels).toHaveProperty("type");
            expect(result.node[0].rels).toHaveProperty("properties");
        });
    });

});

let mockCreate = {
    "records": [
        {
            "keys": [
                "d"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 56,
                        "high" : 0
                    },
                    "labels": [
                        "Day"
                    ],
                    "properties": {
                        "exp": {
                            "low"  : 0,
                            "high" : 0
                        },
                        "uuid" : "12b4783c-d0ad-4268-94a4-1c8694723d0f",
                        "desc" : "HTML la esctructura"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:56"
                }
            ],
            "_fieldLookup": {
                "d": 0
            }
        }
    ],
    "summary": {
        "query": {
            "text"       : "\n        CREATE (d:Day \n            {\n                uuid : \"12b4783c-d0ad-4268-94a4-1c8694723d0f\",\n                exp  : 0,\n                desc : \"HTML la esctructura\"\n            }\n        )\n        WITH d\n        CREATE (d)-[:BELONGS_TO {dayNo: 4}]->(s:Sprint {uuid: \"56a4ef4e-9dfe-4198-b493-998abc867bf7\"})\n        RETURN d;\n    ",
            "parameters" : {}
        },
        "queryType" : "rw",
        "counters"  : {
            "_stats": {
                "nodesCreated"         : 2,
                "nodesDeleted"         : 0,
                "relationshipsCreated" : 1,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 5,
                "labelsAdded"          : 2,
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
                "propertiesSet"        : 5,
                "labelsAdded"          : 2,
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
            "low"  : 5,
            "high" : 0
        },
        "resultAvailableAfter": {
            "low"  : 45,
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
            "text"       : "\n    MATCH (d: Day {uuid: \"e3f31830-e0a1-4644-a071-e2cce76b6dd4\"})\n    SET d:softDeleted;\n",
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
            "low"  : 358,
            "high" : 0
        },
        "database": {
            "name": "neo4j"
        }
    }
};

let mockDayRels = {
    "records": [
        {
            "keys": [
                "c",
                "r"
            ],
            "length"  : 2,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 12,
                        "high" : 0
                    },
                    "labels": [
                        "Content",
                        "Text"
                    ],
                    "properties": {
                        "path" : "section1/HTML/day2/example.md",
                        "exp"  : {
                            "low"  : 30,
                            "high" : 0
                        },
                        "title" : "HTML lo basico",
                        "uuid"  : "7defa5ae-05b0-4645-bb1d-f4111a6134de",
                        "desc"  : "vamos a aprender como crear un archivo de HTML, como declarar algo es HTML, y mucho mas"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:12"
                },
                {
                    "identity": {
                        "low"  : 10,
                        "high" : 0
                    },
                    "start": {
                        "low"  : 12,
                        "high" : 0
                    },
                    "end": {
                        "low"  : 42,
                        "high" : 0
                    },
                    "type"       : "BELONGS_TO",
                    "properties" : {
                        "contentNo": {
                            "low"  : 2,
                            "high" : 0
                        }
                    },
                    "elementId"          : "5:fa284c45-c13e-4980-8dbe-982377fdef6e:10",
                    "startNodeElementId" : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:12",
                    "endNodeElementId"   : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:42"
                }
            ],
            "_fieldLookup": {
                "c" : 0,
                "r" : 1
            }
        },
        {
            "keys": [
                "c",
                "r"
            ],
            "length"  : 2,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 11,
                        "high" : 0
                    },
                    "labels": [
                        "Content",
                        "Text"
                    ],
                    "properties": {
                        "path"  : "section1/HTML/day1/example.md",
                        "title" : "El comienzo de HTML",
                        "exp"   : {
                            "low"  : 30,
                            "high" : 0
                        },
                        "uuid" : "a4b949d9-fb47-4913-b503-a0b405ad2a4a",
                        "desc" : "Que es HTML? lo basico de HTML para que tengas una idea de que es y para que se usa."
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:11"
                },
                {
                    "identity": {
                        "low"  : 9,
                        "high" : 0
                    },
                    "start": {
                        "low"  : 11,
                        "high" : 0
                    },
                    "end": {
                        "low"  : 42,
                        "high" : 0
                    },
                    "type"       : "BELONGS_TO",
                    "properties" : {
                        "contentNo": {
                            "low"  : 1,
                            "high" : 0
                        }
                    },
                    "elementId"          : "5:fa284c45-c13e-4980-8dbe-982377fdef6e:9",
                    "startNodeElementId" : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:11",
                    "endNodeElementId"   : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:42"
                }
            ],
            "_fieldLookup": {
                "c" : 0,
                "r" : 1
            }
        }
    ],
    "summary": {
        "query": {
            "text"       : "\n        MATCH (c)-[r:BELONGS_TO]->(d:Day {uuid: \"a3a030a5-8d4b-404d-9d97-0ef39c16a57c\"})\n        WHERE NOT d:softDeleted AND NOT c:softDeleted\n        RETURN c, r;\n    ",
            "parameters" : {}
        },
        "queryType" : "r",
        "counters"  : {
            "_stats": {
                "nodesCreated"         : 0,
                "nodesDeleted"         : 0,
                "relationshipsCreated" : 0,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 0,
                "labelsAdded"          : 0,
                "labelsRemoved"        : 0,
                "indexesAdded"         : 0,
                "indexesRemoved"       : 0,
                "constraintsAdded"     : 0,
                "constraintsRemoved"   : 0
            },
            "_systemUpdates": 0
        },
        "updateStatistics": {
            "_stats": {
                "nodesCreated"         : 0,
                "nodesDeleted"         : 0,
                "relationshipsCreated" : 0,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 0,
                "labelsAdded"          : 0,
                "labelsRemoved"        : 0,
                "indexesAdded"         : 0,
                "indexesRemoved"       : 0,
                "constraintsAdded"     : 0,
                "constraintsRemoved"   : 0
            },
            "_systemUpdates": 0
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
            "low"  : 1,
            "high" : 0
        },
        "resultAvailableAfter": {
            "low"  : 1,
            "high" : 0
        },
        "database": {
            "name": "neo4j"
        }
    }
};