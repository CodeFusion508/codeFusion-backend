let { client } = require("../../../config/gAuth.js");

const {
    createGUser,
    loginGUser,
    getUserAnswers,
    getEvaluation
} = require("../google.ctrl.js");

describe("google controller tests", () => {
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

    /**describe("createGUser", () => {
        it("createGUser should throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);
            client.verifyIdToken = jest.fn().mockResolvedValue(undefined);
            const body = {
                email    : "testing10390@gmail.com",
                userName : "testing800"
            };

            const result = await createGUser(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 403);
            expect(result).toHaveProperty("message", "Autenticación de Google falló.");
        });
    });*/

    describe("loginGUser", () => {
        it("loginGUser should throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const body = {
                token: "214nxcndfskhfdsf98349qxsihcsdbi"
            };
            client.verifyIdToken = jest.fn().mockResolvedValue({ getPayload: () => ({ undefined }) });
            const result = await loginGUser(deps, body)
                .then((res) => res)
                .catch((err) => err);
            expect(result).toBe(true);
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
