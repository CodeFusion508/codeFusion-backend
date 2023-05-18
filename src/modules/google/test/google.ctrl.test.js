const {
    createGUser,
    loginGUser
} = require("../google.ctrl.js");

describe("google controller tests", () => {
    let deps;

    beforeAll(() => {
        deps = {
            services: {
                neo4j: {
                    session: {
                        run: jest.fn().mockResolvedValue(mockValue)
                    }
                },
                google: {
                    client: {
                        verifyIdToken: jest.fn().mockResolvedValue({
                            getPayload: () =>  undefined
                        })
                    },
                    service: {
                        spreadsheets: {
                            values: {
                                get: jest.fn().mockResolvedValue(true)
                            }
                        }
                    },
                    authClient: true
                }
            }
        };
    });


    describe("loginGUser", () => {
        it("loginGUser should throw an error", async () => {
            const body = {
                token: "214nxcndfskhfdsf98349qxsihcsdbi"
            };

            const result = await loginGUser(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 400);
            expect(result).toHaveProperty("message", "Token Invalido");
        });
    });

    describe("createGUser", () => {
        it("createGUser should throw an error", async () => {
            deps.services.google.client.verifyIdToken = jest.fn().mockResolvedValue(undefined);

            const body = {
                email    : "testing10390@gmail.com",
                userName : "testing800"
            };

            const result = await createGUser(deps, body)
                .then((res) => res)
                .catch((err) => err);


            expect(result).toHaveProperty("err", 403);
            expect(result).toHaveProperty("message", "Autenticación de Google falló");
        });
    });
});

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