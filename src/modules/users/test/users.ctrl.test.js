const {
    createUser,
    deleteUser,
    getUser,
    updateUser,
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

        it("createUser should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmptyRecords);

            const body = {
                email    : "testing10390@gmail.com",
                password : "1234",
                userName : "testing800"
            };
            const result = await createUser(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("records");
            expect(result).toHaveProperty("stats");
        });
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

            expect(result).toHaveProperty("records");
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
            expect(result).toHaveProperty("records[0].properties.email");
        });
    });

    describe("updateUser", () => {
        it("updateUser should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmptyRecords);

            const body = {
                uuid: "d76abc42-cfe5-4c59-afbb-3d4e04573543",
            };
            const result = await updateUser(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("records");
            expect(result).toHaveProperty("stats");
        });
    });
});

const mockEmptyRecords = {
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

const mockValue = {
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