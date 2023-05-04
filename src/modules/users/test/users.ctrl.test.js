const {
    createUser,
    logIn,
    getUser,
    updateUser,
    deleteUser,

    createRel,
    deleteRel
} = require("../users.ctrl.js");

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

    describe("createUser", () => {
        it("createUser should throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const body = {
                email    : "testing10390@gmail.com",
                password : "1234",
                userName : "testing800"
            };

            const result = await createUser(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 403);
            expect(result).toHaveProperty("message", "This email has already been registered, please use another or log in.");
        });
    });

    describe("logIn", () => {
        it("logIn should throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const body = {
                email    : "testing10390@gmail.com",
                password : "12345",
                userName : "testing800"
            };
            const result = await logIn(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 403);
            expect(result).toHaveProperty("message", "This email or password is incorrect, please try again.");
        });

        // it("logIn should give back data and token", async () => {
        //     deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockLogIn);

        //     const body = {
        //         email    : "testing45@mail.com",
        //         password : "password",
        //         userName : "test300"
        //     };
        //     const result = await logIn(deps, body)
        //         .then((res) => res)
        //         .catch((err) => err);

        //     expect(result).toHaveProperty("data");
        //     expect(result.data).toHaveProperty("stats");
        //     expect(result.data.node).toHaveProperty("userName");

        //     expect(result).toHaveProperty("token");
        // });
    });

    describe("deleteUser", () => {
        it("deleteUser should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmptyRecords);

            const param = {
                uuid: "d76abc42-cfe5-4c59-afbb-3d4e04573543",
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
                uuid: "d76abc42-cfe5-4c59-afbb-3d4e04573543",
            };
            const result = await getUser(deps, param)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 404);
            expect(result).toHaveProperty("message", "This user does not exist, please check if you have the valid uuid.");
        });

        it("getUser should return formatted result and records", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const param = {
                uuid: "d76abc42-cfe5-4c59-afbb-3d4e04573543",
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
                uuid: "d76abc42-cfe5-4c59-afbb-3d4e04573543",
            };
            const result = await updateUser(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 400);
            expect(result).toHaveProperty("message", "You must provide at least one change.");
        });

        it("updateUser should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const body = {
                uuid  : "d76abc42-cfe5-4c59-afbb-3d4e04573543",
                email : "JuanDoe@mail.com"
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
                "relation"    : "COMPLETED"
            };
            const result = await createRel(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 404);
            expect(result).toHaveProperty("message", "This user does not exist, please check if you have the valid uuid.");
        });

        it("createRel should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreateRel);

            const body = {
                "uuid"        : "87f2925a-df5d-4461-973e-2b18cadbecf0",
                "contentUuid" : "c522f197-0248-4d2e-b80a-7997f00382f6",
                "op"          : "Sprint",
                "relation"    : "COMPLETED"
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
                "relation"    : "COMPLETED"
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
            "text"       : "MATCH (u: Student {email: \"testing10390@gmail.com\"}) RETURN u;",
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
                        "userName" : "testing800",
                        "uuid"     : "d76abc42-cfe5-4c59-afbb-3d4e04573543",
                        "totalExp" : {
                            "low"  : 0,
                            "high" : 0
                        },
                        "email": "testing10390@gmail.com"
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
            "text"       : "MATCH (u: Student {email: \"testing10390@gmail.com\"}) RETURN u;",
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
                        "userName" : "test300",
                        "uuid"     : "61accdac-6a32-4dc4-9fdd-fbe2bb6580cd",
                        "email"    : "testing45@mail.com",
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
            "text"       : "\n        CREATE (u:Student:User \n            {\n                uuid      : \"61accdac-6a32-4dc4-9fdd-fbe2bb6580cd\", \n                totalExp  : 0, \n                weeklyExp : 0, \n                email     : \"testing45@mail.com\", \n                userName  : \"test300\", \n                password  : \"$2b$10$7G2NQAknmOLoh8zJTjd.6OwKRUzwlBeOzOaQ9Zc80UD.40LQLf9Hm\"\n            }\n        )\n        RETURN u;\n    ",
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
                    "type"               : "COMPLETED",
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
            "text"       : "\n            MATCH (u:Student {uuid: \"87f2925a-df5d-4461-973e-2b18cadbecf0\"}), (c:Sprint {uuid: \"c522f197-0248-4d2e-b80a-7997f00382f6\"})\n            WHERE NOT u:softDeleted AND NOT c:softDeleted\n            WITH u, c\n            CREATE (u)-[r:COMPLETED]->(c)\n            RETURN r;\n        ",
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