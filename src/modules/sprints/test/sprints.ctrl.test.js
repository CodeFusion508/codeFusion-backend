const {
    createSprint,
    getAllSprints,
    updateSprint,
    getSprint,
    deleteSprint,
    getSprintRels
} = require("../sprints.ctrl.js");

describe("users controller tests", () => {
    let deps;

    beforeAll(() => {
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

    describe("createSprint", () => {
        it("createSprint should return data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

            const body = {
                path  : "/section2/nodejs",
                title : "Example Sprint 5",
                esc   : "esto es un ejemplo de un sprint en section 2 para nodejs",
                label : "Section_2"
            };

            const result = await createSprint(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
        });
    });

    describe("getAllSprints", () => {
        it("getAllSprints should return data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockAllSprints);

            const result = await getAllSprints(deps)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result).toHaveProperty("node");
        });
    });

    describe("updateSprint", () => {
        it("updateSprint should throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

            const body = {
                "uuid": "69a03f16-195e-4f82-871b-051bd82cc28b"
            };

            const result = await updateSprint(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 400);
            expect(result).toHaveProperty("message", "Debe indicar al menos un cambio.");
        });

        it("updateSprint should return correct data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

            const body = {
                uuid  : "69a03f16-195e-4f82-871b-051bd82cc28b",
                title : "new title",
                desc  : "new description"
            };

            const result = await updateSprint(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("title");
            expect(result.node).toHaveProperty("desc");
        });
    });

    describe("getSprint", () => {
        it("getSprint should return data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

            const params = {
                uuid: "69a03f16-195e-4f82-871b-051bd82cc28b",
            };

            const result = await getSprint(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("title");
        });

        it("getSprint should throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmpty);

            const params = {
                uuid: "69a03f16-195e-4f82-871b-051bd82cc28b",
            };

            const result = await getSprint(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err");
            expect(result).toHaveProperty("message");
        });
    });

    describe("deleteSprint", () => {
        it("deleteSprint should return data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmpty);

            const body = {
                uuid: "69a03f16-195e-4f82-871b-051bd82cc28b",
            };

            const result = await deleteSprint(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result).toHaveProperty("node");
        });
    });

    describe("getSprintRels", () => {
        it("getSprintRels should return data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockSprinRels);

            const params = {
                uuid: "69a03f16-195e-4f82-871b-051bd82cc28b",
            };

            const result = await getSprintRels(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node[1]).toHaveProperty("node");
            expect(result.node[1]).toHaveProperty("rels");
        });

        it("getSprintRels should throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmpty);

            const params = {
                uuid: "69a03f16-195e-4f82-871b-051bd82cc28b",
            };

            const result = await getSprintRels(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 404);
            expect(result).toHaveProperty("message", "Este sprint no existe, verifique si tiene un uuid válido.");
        });
    });
});

let mockEmpty = {
    "records" : [],
    "summary" : {
        "query": {
            "text"       : "\n        CREATE (s:Sprint:Section_2\n            {\n                uuid     : \"56a4ef4e-9dfe-4198-b493-998abc867bf7\", \n                totalExp : 0,\n                title    : \"Example Sprint 5\",\n                desc     : \"esto es un ejemplo de un sprint en section 2 para nodejs\"\n            }\n        )\n        RETURN s;\n    ",
            "parameters" : {}
        },
        "queryType" : "rw",
        "counters"  : {
            "_stats": {
                "nodesCreated"         : 1,
                "nodesDeleted"         : 0,
                "relationshipsCreated" : 0,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 4,
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
                "nodesCreated"         : 1,
                "nodesDeleted"         : 0,
                "relationshipsCreated" : 0,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 4,
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
            "low"  : 6,
            "high" : 0
        },
        "resultAvailableAfter": {
            "low"  : 116,
            "high" : 0
        },
        "database": {
            "name": "neo4j"
        }
    }
};

let mockCreate = {
    "records": [
        {
            "keys": [
                "s"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 53,
                        "high" : 0
                    },
                    "labels": [
                        "Sprint",
                        "Section_2"
                    ],
                    "properties": {
                        "title"    : "Example Sprint 5",
                        "uuid"     : "56a4ef4e-9dfe-4198-b493-998abc867bf7",
                        "totalExp" : {
                            "low"  : 0,
                            "high" : 0
                        },
                        "desc": "esto es un ejemplo de un sprint en section 2 para nodejs"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:53"
                }
            ],
            "_fieldLookup": {
                "s": 0
            }
        }
    ],
    "summary": {
        "query": {
            "text"       : "\n        CREATE (s:Sprint:Section_2\n            {\n                uuid     : \"56a4ef4e-9dfe-4198-b493-998abc867bf7\", \n                totalExp : 0,\n                title    : \"Example Sprint 5\",\n                desc     : \"esto es un ejemplo de un sprint en section 2 para nodejs\"\n            }\n        )\n        RETURN s;\n    ",
            "parameters" : {}
        },
        "queryType" : "rw",
        "counters"  : {
            "_stats": {
                "nodesCreated"         : 1,
                "nodesDeleted"         : 0,
                "relationshipsCreated" : 0,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 4,
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
                "nodesCreated"         : 1,
                "nodesDeleted"         : 0,
                "relationshipsCreated" : 0,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 4,
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
            "low"  : 6,
            "high" : 0
        },
        "resultAvailableAfter": {
            "low"  : 116,
            "high" : 0
        },
        "database": {
            "name": "neo4j"
        }
    }
};

let mockAllSprints = {
    "records": [
        {
            "keys": [
                "s"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 29,
                        "high" : 0
                    },
                    "labels": [
                        "Sprint",
                        "Section_3"
                    ],
                    "properties": {
                        "title"    : "Example Sprint 3",
                        "uuid"     : "85e5436f-cbe2-4e98-bb67-05b394fa9d4c",
                        "totalExp" : {
                            "low"  : 0,
                            "high" : 0
                        },
                        "desc": "esto es un ejemplo de un sprint en section 3"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:29"
                }
            ],
            "_fieldLookup": {
                "s": 0
            }
        },
        {
            "keys": [
                "s"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 31,
                        "high" : 0
                    },
                    "labels": [
                        "Sprint"
                    ],
                    "properties": {
                        "path"     : "/section1/HTML",
                        "title"    : "HTML",
                        "uuid"     : "4d7a64eb-2e65-4164-aa76-181e5d5d2dca",
                        "totalExp" : {
                            "low"  : 0,
                            "high" : 0
                        },
                        "desc": "Hoy van a aprender HTML, como crear sitios webs muy simple"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:31"
                }
            ],
            "_fieldLookup": {
                "s": 0
            }
        },
        {
            "keys": [
                "s"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 32,
                        "high" : 0
                    },
                    "labels": [
                        "Sprint"
                    ],
                    "properties": {
                        "path"     : "/section1/CSS",
                        "title"    : "CSS",
                        "uuid"     : "22366e07-3c47-4637-b62b-f236adc34441",
                        "totalExp" : {
                            "low"  : 0,
                            "high" : 0
                        },
                        "desc": "Hoy van a aprender CSS, como crear sitios webs muy simple"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:32"
                }
            ],
            "_fieldLookup": {
                "s": 0
            }
        },
        {
            "keys": [
                "s"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 33,
                        "high" : 0
                    },
                    "labels": [
                        "Sprint"
                    ],
                    "properties": {
                        "path"     : "/section1/javascript",
                        "title"    : "JAVASCRIPT",
                        "uuid"     : "c522f197-0248-4d2e-b80a-7997f00382f6",
                        "totalExp" : {
                            "low"  : 0,
                            "high" : 0
                        },
                        "desc": "Hoy van a aprender JAVASCRIPT, con information y logica"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:33"
                }
            ],
            "_fieldLookup": {
                "s": 0
            }
        },
        {
            "keys": [
                "s"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 37,
                        "high" : 0
                    },
                    "labels": [
                        "Sprint",
                        "Section_1"
                    ],
                    "properties": {
                        "title"    : "Example Section 1",
                        "uuid"     : "c16b6119-9c85-498c-a7cd-ad6bc24c4978",
                        "totalExp" : {
                            "low"  : 0,
                            "high" : 0
                        },
                        "desc": "esto es un ejemplo de un sprint en section 1"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:37"
                }
            ],
            "_fieldLookup": {
                "s": 0
            }
        },
        {
            "keys": [
                "s"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 38,
                        "high" : 0
                    },
                    "labels": [
                        "Sprint",
                        "Section_2"
                    ],
                    "properties": {
                        "title"    : "Example Section 2",
                        "uuid"     : "376a3024-28ae-4c04-8c2e-33ebec6d7eed",
                        "totalExp" : {
                            "low"  : 0,
                            "high" : 0
                        },
                        "desc": "esto es un ejemplo de un sprint en section 2"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:38"
                }
            ],
            "_fieldLookup": {
                "s": 0
            }
        },
        {
            "keys": [
                "s"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 45,
                        "high" : 0
                    },
                    "labels": [
                        "Sprint",
                        "Section_4"
                    ],
                    "properties": {
                        "title"    : "Example Sprint 4",
                        "uuid"     : "08cdb340-f81b-4ac0-b23f-5f39e67d3e26",
                        "totalExp" : {
                            "low"  : 0,
                            "high" : 0
                        },
                        "desc": "esto es un ejemplo de un sprint en section 4"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:45"
                }
            ],
            "_fieldLookup": {
                "s": 0
            }
        },
        {
            "keys": [
                "s"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 47,
                        "high" : 0
                    },
                    "labels": [
                        "Sprint",
                        "Section_4"
                    ],
                    "properties": {
                        "title"    : "Example Sprint 4",
                        "uuid"     : "1aa433a7-c797-4be5-8a26-132df5e17038",
                        "totalExp" : {
                            "low"  : 0,
                            "high" : 0
                        },
                        "desc": "esto es un ejemplo de un sprint en section 4"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:47"
                }
            ],
            "_fieldLookup": {
                "s": 0
            }
        },
        {
            "keys": [
                "s"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 53,
                        "high" : 0
                    },
                    "labels": [
                        "Sprint",
                        "Section_2"
                    ],
                    "properties": {
                        "title"    : "Example Sprint 5",
                        "uuid"     : "56a4ef4e-9dfe-4198-b493-998abc867bf7",
                        "totalExp" : {
                            "low"  : 0,
                            "high" : 0
                        },
                        "desc": "esto es un ejemplo de un sprint en section 2 para nodejs"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:53"
                }
            ],
            "_fieldLookup": {
                "s": 0
            }
        }
    ],
    "summary": {
        "query": {
            "text"       : "\n        MATCH (s:Sprint) \n        WHERE NOT s:softDeleted \n        RETURN s;\n    ",
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
            "low"  : 2,
            "high" : 0
        },
        "resultAvailableAfter": {
            "low"  : 2,
            "high" : 0
        },
        "database": {
            "name": "neo4j"
        }
    }
};

let mockSprinRels = {
    "records": [
        {
            "keys": [
                "d",
                "r"
            ],
            "length"  : 2,
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
                },
                {
                    "identity": {
                        "low"  : 38,
                        "high" : 0
                    },
                    "start": {
                        "low"  : 46,
                        "high" : 0
                    },
                    "end": {
                        "low"  : 31,
                        "high" : 0
                    },
                    "type"       : "BELONGS_TO",
                    "properties" : {
                        "dayNo": {
                            "low"  : 3,
                            "high" : 0
                        }
                    },
                    "elementId"          : "5:fa284c45-c13e-4980-8dbe-982377fdef6e:38",
                    "startNodeElementId" : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:46",
                    "endNodeElementId"   : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:31"
                }
            ],
            "_fieldLookup": {
                "d" : 0,
                "r" : 1
            }
        },
        {
            "keys": [
                "d",
                "r"
            ],
            "length"  : 2,
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
                },
                {
                    "identity": {
                        "low"  : 8,
                        "high" : 0
                    },
                    "start": {
                        "low"  : 44,
                        "high" : 0
                    },
                    "end": {
                        "low"  : 31,
                        "high" : 0
                    },
                    "type"       : "BELONGS_TO",
                    "properties" : {
                        "dayNo": {
                            "low"  : 3,
                            "high" : 0
                        }
                    },
                    "elementId"          : "5:fa284c45-c13e-4980-8dbe-982377fdef6e:8",
                    "startNodeElementId" : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:44",
                    "endNodeElementId"   : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:31"
                }
            ],
            "_fieldLookup": {
                "d" : 0,
                "r" : 1
            }
        },
        {
            "keys": [
                "d",
                "r"
            ],
            "length"  : 2,
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
                },
                {
                    "identity": {
                        "low"  : 7,
                        "high" : 0
                    },
                    "start": {
                        "low"  : 43,
                        "high" : 0
                    },
                    "end": {
                        "low"  : 31,
                        "high" : 0
                    },
                    "type"       : "BELONGS_TO",
                    "properties" : {
                        "dayNo": {
                            "low"  : 2,
                            "high" : 0
                        }
                    },
                    "elementId"          : "5:fa284c45-c13e-4980-8dbe-982377fdef6e:7",
                    "startNodeElementId" : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:43",
                    "endNodeElementId"   : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:31"
                }
            ],
            "_fieldLookup": {
                "d" : 0,
                "r" : 1
            }
        },
        {
            "keys": [
                "d",
                "r"
            ],
            "length"  : 2,
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
                },
                {
                    "identity": {
                        "low"  : 6,
                        "high" : 0
                    },
                    "start": {
                        "low"  : 42,
                        "high" : 0
                    },
                    "end": {
                        "low"  : 31,
                        "high" : 0
                    },
                    "type"       : "BELONGS_TO",
                    "properties" : {
                        "dayNo": {
                            "low"  : 1,
                            "high" : 0
                        }
                    },
                    "elementId"          : "5:fa284c45-c13e-4980-8dbe-982377fdef6e:6",
                    "startNodeElementId" : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:42",
                    "endNodeElementId"   : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:31"
                }
            ],
            "_fieldLookup": {
                "d" : 0,
                "r" : 1
            }
        }
    ],
    "summary": {
        "query": {
            "text"       : "\n        MATCH (d)-[r:BELONGS_TO]->(s:Sprint {uuid: \"4d7a64eb-2e65-4164-aa76-181e5d5d2dca\"})\n        WHERE NOT s:softDeleted AND NOT d:softDeleted\n        RETURN d, r;\n    ",
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
            "low"  : 6,
            "high" : 0
        },
        "resultAvailableAfter": {
            "low"  : 170,
            "high" : 0
        },
        "database": {
            "name": "neo4j"
        }
    }
};