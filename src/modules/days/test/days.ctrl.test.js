const {
    createDay,
    getAllDays,
    updatedDay,
    getDay,
    deleteDay,
    getDaysRels
} = require("../days.ctrl.js");

describe("users controller tests", () => {
    let deps;

    beforeAll(() => {
        deps = {
            config   : {},
            ctrls    : {},
            services : {
                neo4j: {
                    session: {
                        run: jest.fn().mockResolvedValue(mockCreate)
                    }
                }
            }
        };

    });

    describe("createDay", () => {
        it("createDay should return data", async () => {
            const body = {
                desc       : "something 123 g!",
                dayNo      : 4,
                sprintUuid : "d54jd3-d58k543-83k45d8-9dd84"
            };

            const result = await createDay(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
        });
    });

    describe("deleteDay", () => {
        it("deleteDay should return data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmpty);

            const params = {
                uuid: "d54jd3-d58k543-83k45d8-9dd84"
            };

            const result = await deleteDay(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result).toHaveProperty("node");
        });
    });

    describe("getAllDays", () => {
        it("getAllDays should return data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockAllDays);

            const result = await getAllDays(deps)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node[0]).toHaveProperty("uuid");
        });
    });

    describe("updatedDay", () => {
        it("updatedDay should return data", async () => {
            const body = {
                uuid : "28k9-d490dk-2md94k-903d",
                exp  : 12,
                desc : "It's all in your head."
            };

            const result = await updatedDay(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
        });
    });

    describe("getDay", () => {
        it("getDay should return data", async () => {
            const params = {
                uuid: "d54jd3-d58k543-83k45d8-9dd84"
            };

            const result = await getDay(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
        });
    });

    describe("getDaysRels", () => {
        it("getDaysRels should return data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockDayRels);

            const params = {
                uuid: "d54jd3-d58k543-83k45d8-9dd84"
            };
            const result = await getDaysRels(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node[0]).toHaveProperty("node");
            expect(result.node[0]).toHaveProperty("rels");
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

let mockAllDays = {
    "records": [
        {
            "keys": [
                "d"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 34,
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
                        "uuid" : "c7a7ec99-5f2c-447e-8225-0e6b9a742ec4",
                        "desc" : "You will learn what is JS and the basics of the web with JS"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:34"
                }
            ],
            "_fieldLookup": {
                "d": 0
            }
        },
        {
            "keys": [
                "d"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 35,
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
                        "uuid" : "66b5d751-caac-4e4d-859d-baa91dced943",
                        "desc" : "van a aprender como hacer loops, variables, y funciones"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:35"
                }
            ],
            "_fieldLookup": {
                "d": 0
            }
        },
        {
            "keys": [
                "d"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 36,
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
                        "uuid" : "3fb02acb-b22f-49b6-82d7-4a6c5843d77d",
                        "desc" : "Van a aprender de curring, scopes y cosas mas advansadas"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:36"
                }
            ],
            "_fieldLookup": {
                "d": 0
            }
        },
        {
            "keys": [
                "d"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 39,
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
                        "uuid" : "2d5096cb-eae7-4abf-aba4-f62589119c69",
                        "desc" : "que es CSS? y para que se usa?"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:39"
                }
            ],
            "_fieldLookup": {
                "d": 0
            }
        },
        {
            "keys": [
                "d"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 40,
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
                        "uuid" : "8520150f-c339-4e4d-a1e2-6543de21f9b5",
                        "desc" : "como crear mas cosas con CSS, por ejemplo cajas, imagenes para perfiles, y mucho mas"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:40"
                }
            ],
            "_fieldLookup": {
                "d": 0
            }
        },
        {
            "keys": [
                "d"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 41,
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
                        "uuid" : "b9569011-95d4-4afe-94cc-987cce5095ea",
                        "desc" : "ya cosas mas advansadas, como un navbar, footer, y mucho mas"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:41"
                }
            ],
            "_fieldLookup": {
                "d": 0
            }
        },
        {
            "keys": [
                "d"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 42,
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
                        "uuid" : "a3a030a5-8d4b-404d-9d97-0ef39c16a57c",
                        "desc" : "el comienzo de HTML, y cosas muy basicas de HTML"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:42"
                }
            ],
            "_fieldLookup": {
                "d": 0
            }
        },
        {
            "keys": [
                "d"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 43,
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
                        "uuid" : "2f57e4ce-7d82-4f6c-a041-f79ae3753c91",
                        "desc" : "como crear imagenes, div, footer y much mas de la esctructura"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:43"
                }
            ],
            "_fieldLookup": {
                "d": 0
            }
        },
        {
            "keys": [
                "d"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 44,
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
                        "uuid" : "0bde912c-38e9-4608-b2e7-c19ec595afc1",
                        "desc" : "mas advancado como CDNs, las reglas y esctructura recommendada"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:44"
                }
            ],
            "_fieldLookup": {
                "d": 0
            }
        },
        {
            "keys": [
                "d"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 46,
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
                        "uuid" : "e7206d40-6745-4450-baec-1e9beca02102",
                        "desc" : "mas advancado como CDNs, las reglas y esctructura recommendada"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:46"
                }
            ],
            "_fieldLookup": {
                "d": 0
            }
        },
        {
            "keys": [
                "d"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 54,
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
                        "uuid" : "6efefc58-5900-41e8-87e0-67cd10255ff6",
                        "desc" : "HTML la esctructura"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:54"
                }
            ],
            "_fieldLookup": {
                "d": 0
            }
        },
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
        },
        {
            "keys": [
                "d"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 58,
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
                        "uuid" : "e3f31830-e0a1-4644-a071-e2cce76b6dd4",
                        "desc" : "HTML la esctructura"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:58"
                }
            ],
            "_fieldLookup": {
                "d": 0
            }
        }
    ],
    "summary": {
        "query": {
            "text"       : "\n        MATCH (d:Day) \n        WHERE NOT d:softDeleted\n        RETURN d;\n    ",
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
            "low"  : 3,
            "high" : 0
        },
        "resultAvailableAfter": {
            "low"  : 96,
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