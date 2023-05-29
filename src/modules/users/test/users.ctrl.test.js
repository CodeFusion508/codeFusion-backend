const {
    createUser,
    logIn,
    getUser,
    updateUser,
    deleteUser,

    createRel,
    deleteRel
} = require("../users.ctrl.js");

const jwt = require("../../../config/jwt.js");


describe("users controller tests", () => {
    let deps;

    beforeAll(() => {
        deps = {
            services: {
                neo4j: {
                    session: { run: null }
                }
            }
        };

        jest.spyOn(jwt, "createToken").mockReturnValue("mockedToken");
    });

    describe("createUser", () => {
        it("createUser should throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const body = {
                email    : "AsyncResearch@mail.org",
                password : "1234",
                userName : "Async Research Institute"
            };

            const result = await createUser(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 403);
            expect(result).toHaveProperty("message", "Este correo electrónico ya ha sido registrado, utilice otro o inicie sesión.");
        });

        it("createUser should return back token and data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValueOnce(mockEmptyRecords).mockResolvedValue(mockValue);

            const body = {
                email    : "AsyncResearch@mail.org",
                password : "1234",
                userName : "Async Research Institute"
            };

            const result = await createUser(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("token", "mockedToken");
            expect(result.data.node).toHaveProperty("email", "AsyncResearch@mail.org");
        });
    });

    describe("logIn", () => {
        it("logIn should throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const body = {
                email    : "AsyncResearch@mail.org",
                password : "12345",
                userName : "Async Research Institute"
            };

            const result = await logIn(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 403);
            expect(result).toHaveProperty("message", "Este correo electrónico o contraseña es incorrecto, inténtalo de nuevo.");
        });

        it("logIn should return data and token", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockLogIn);

            const body = {
                email    : "AsyncResearch@mail.org",
                password : "password",
                userName : "Async Research Institute"
            };

            const result = await logIn(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("data");
            expect(result.data).toHaveProperty("stats");
            expect(result.data.node).toHaveProperty("userName");

            expect(result).toHaveProperty("token");
        });
    });

    describe("deleteUser", () => {
        it("deleteUser should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmptyRecords);

            const param = {
                uuid: "MOCK-cfe5-4c59-afbb-3d4e04573543",
            };

            const result = await deleteUser(deps, param)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("node");
            expect(result).toHaveProperty("stats");
        });
    });

    describe("getUser", () => {
        it("getUser should throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmptyRecords);

            const param = {
                uuid: "MOCK-cfe5-4c59-afbb-3d4e04573543",
            };

            const result = await getUser(deps, param)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 404);
            expect(result).toHaveProperty("message", "Este usuario no existe, verifique si tiene el uuid válido.");
        });

        it("getUser should return formatted result and records", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const param = {
                uuid: "MOCK-cfe5-4c59-afbb-3d4e04573543",
            };

            const result = await getUser(deps, param)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result).toHaveProperty("node.email");
        });
    });

    describe("updateUser", () => {
        it("updateUser should throw an error if body has no changes", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const body = {
                uuid: "MOCK-cfe5-4c59-afbb-3d4e04573543",
            };

            const result = await updateUser(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 400);
            expect(result).toHaveProperty("message", "Debe indicar al menos un cambio.");
        });

        it("updateUser should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const body = {
                uuid  : "MOCK-cfe5-4c59-afbb-3d4e04573543",
                email : "AsyncResearch@mail.org"
            };

            const result = await updateUser(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
        });
    });

    describe("createRel", () => {
        it("createRel should throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmptyRecords);

            const body = {
                "uuid"        : "87f2925a-df5d-4461-973e-2b18cadbecf0",
                "contentUuid" : "c522f197-0248-4d2e-b80a-7997f00382f6",
                "op"          : "Sprint",
                "relation"    : "orgPLETED"
            };

            const result = await createRel(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 404);
            expect(result).toHaveProperty("message", "Este usuario no existe, verifique si tiene el uuid válido.");
        });

        it("createRel should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreateRel);

            const body = {
                "uuid"        : "87f2925a-df5d-4461-973e-2b18cadbecf0",
                "contentUuid" : "c522f197-0248-4d2e-b80a-7997f00382f6",
                "op"          : "Sprint",
                "relation"    : "orgPLETED"
            };

            const result = await createRel(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("type");
            expect(result.node).toHaveProperty("properties");
        });
    });

    describe("deleteRel", () => {
        it("deleteRel should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreateRel);

            const body = {
                "uuid"        : "87f2925a-df5d-4461-973e-2b18cadbecf0",
                "contentUuid" : "c522f197-0248-4d2e-b80a-7997f00382f6",
                "op"          : "Sprint",
                "relation"    : "orgPLETED"
            };

            const result = await deleteRel(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("node");
            expect(result).toHaveProperty("stats");
        });
    });
});

let mockEmptyRecords = {
    "records" : [],
    "summary" : {
        "query": {
            "text"       : "MATCH (u: Student {email: \"AsyncResearch@mail.org\"}) RETURN u;",
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
            "protocolVersion" : 5
        },
        "resultConsumedAfter": {
            "low"  : 2,
            "high" : 0
        },
        "resultAvailableAfter": {
            "low"  : 35,
            "high" : 0
        },
        "database": {
            "name": "neo4j"
        }
    }
};

let mockValue = {
    "records": [
        {
            "keys": [
                "u"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 0,
                        "high" : 0
                    },
                    "labels": [
                        "Student",
                        "User"
                    ],
                    "properties": {
                        "weeklyExp": {
                            "low"  : 0,
                            "high" : 0
                        },
                        "password" : "1234",
                        "userName" : "Async Research Institute",
                        "uuid"     : "MOCK-cfe5-4c59-afbb-3d4e04573543",
                        "totalExp" : {
                            "low"  : 0,
                            "high" : 0
                        },
                        "email": "AsyncResearch@mail.org"
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:0"
                }
            ],
            "_fieldLookup": {
                "u": 0
            }
        }
    ],
    "summary": {
        "query": {
            "text"       : "MATCH (u: Student {email: \"AsyncResearch@mail.org\"}) RETURN u;",
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
            "protocolVersion" : 5
        },
        "resultConsumedAfter": {
            "low"  : 2,
            "high" : 0
        },
        "resultAvailableAfter": {
            "low"  : 35,
            "high" : 0
        },
        "database": {
            "name": "neo4j"
        }
    }
};

let mockLogIn = {
    "records": [
        {
            "keys": [
                "u"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 52,
                        "high" : 0
                    },
                    "labels": [
                        "Student",
                        "User"
                    ],
                    "properties": {
                        "weeklyExp": {
                            "low"  : 0,
                            "high" : 0
                        },
                        "password" : "$2b$10$7G2NQAknmOLoh8zJTjd.6OwKRUzwlBeOzOaQ9Zc80UD.40LQLf9Hm",
                        "userName" : "Async Research Institute",
                        "uuid"     : "61accdac-6a32-4dc4-9fdd-fbe2bb6580cd",
                        "email"    : "AsyncResearch@mail.org",
                        "totalExp" : {
                            "low"  : 0,
                            "high" : 0
                        }
                    },
                    "elementId": "4:fa284c45-c13e-4980-8dbe-982377fdef6e:52"
                }
            ],
            "_fieldLookup": {
                "u": 0
            }
        }
    ],
    "summary": {
        "query": {
            "text"       : "\n        CREATE (u:Student:User \n            {\n                uuid      : \"61accdac-6a32-4dc4-9fdd-fbe2bb6580cd\", \n                totalExp  : 0, \n                weeklyExp : 0, \n                email     : \"AsyncResearch@mail.org\", \n                userName  : \"Async Research Institute\", \n                password  : \"$2b$10$7G2NQAknmOLoh8zJTjd.6OwKRUzwlBeOzOaQ9Zc80UD.40LQLf9Hm\"\n            }\n        )\n        RETURN u;\n    ",
            "parameters" : {}
        },
        "queryType" : "rw",
        "counters"  : {
            "_stats": {
                "nodesCreated"         : 1,
                "nodesDeleted"         : 0,
                "relationshipsCreated" : 0,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 6,
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
                "propertiesSet"        : 6,
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
            "low"  : 2,
            "high" : 0
        },
        "resultAvailableAfter": {
            "low"  : 15,
            "high" : 0
        },
        "database": {
            "name": "neo4j"
        }
    }
};

let mockCreateRel = {
    "records": [
        {
            "keys": [
                "r"
            ],
            "length"  : 1,
            "_fields" : [
                {
                    "identity": {
                        "low"  : 31,
                        "high" : 0
                    },
                    "start": {
                        "low"  : 30,
                        "high" : 0
                    },
                    "end": {
                        "low"  : 33,
                        "high" : 0
                    },
                    "type"               : "orgPLETED",
                    "properties"         : {},
                    "elementId"          : "5:fa284c45-c13e-4980-8dbe-982377fdef6e:31",
                    "startNodeElementId" : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:30",
                    "endNodeElementId"   : "4:fa284c45-c13e-4980-8dbe-982377fdef6e:33"
                }
            ],
            "_fieldLookup": {
                "r": 0
            }
        }
    ],
    "summary": {
        "query": {
            "text"       : "\n            MATCH (u:Student {uuid: \"87f2925a-df5d-4461-973e-2b18cadbecf0\"}), (c:Sprint {uuid: \"c522f197-0248-4d2e-b80a-7997f00382f6\"})\n            WHERE NOT u:softDeleted AND NOT c:softDeleted\n            WITH u, c\n            CREATE (u)-[r:orgPLETED]->(c)\n            RETURN r;\n        ",
            "parameters" : {}
        },
        "queryType" : "rw",
        "counters"  : {
            "_stats": {
                "nodesCreated"         : 0,
                "nodesDeleted"         : 0,
                "relationshipsCreated" : 1,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 0,
                "labelsAdded"          : 0,
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
                "relationshipsCreated" : 1,
                "relationshipsDeleted" : 0,
                "propertiesSet"        : 0,
                "labelsAdded"          : 0,
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
        "notifications" : [
            {
                "code"        : "Neo.ClientNotification.Statement.CartesianProduct",
                "title"       : "This query builds a cartesian product between disconnected patterns.",
                "description" : "If a part of a query contains multiple disconnected patterns, this will build a cartesian product between all those parts. This may produce a large amount of data and slow down query processing. While occasionally intended, it may often be possible to reformulate the query that avoids the use of this cross product, perhaps by adding a relationship between the different parts or by using OPTIONAL MATCH (identifier is: (c))",
                "severity"    : "INFORMATION",
                "position"    : {
                    "offset" : 13,
                    "line"   : 2,
                    "column" : 1
                },
                "severityLevel"    : "INFORMATION",
                "rawSeverityLevel" : "INFORMATION",
                "category"         : "UNKNOWN"
            }
        ],
        "server": {
            "address"         : "470f45fb.databases.neo4j.io:7687",
            "agent"           : "Neo4j/5.6-aura",
            "protocolVersion" : 5.1
        },
        "resultConsumedAfter": {
            "low"  : 9,
            "high" : 0
        },
        "resultAvailableAfter": {
            "low"  : 167,
            "high" : 0
        },
        "database": {
            "name": "neo4j"
        }
    }
};