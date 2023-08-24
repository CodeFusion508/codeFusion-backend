const {
    createGUser,
    loginGUser,
    getUserAnswers,
    getEvaluation
} = require("../google.ctrl.js");

const jwt = require("../../../config/jwt.js");

describe("Google Controller Tests", () => {
    let deps;

    beforeAll(() => {
        deps = {
            services: {
                neo4j: {
                    session: {
                        run: null
                    }
                },
                google: {
                    client: {
                        verifyIdToken: null
                    },
                    service: {
                        spreadsheets: {
                            values: {
                                get: null
                            }
                        }
                    },
                    authClient: true
                }
            }
        };

        jest.spyOn(jwt, "createToken").mockReturnValue("mockedToken");
    });

    describe("createGUser Controller", () => {
        it("createGUser should throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);
            deps.services.google.client.verifyIdToken = jest.fn().mockResolvedValue(undefined);

            const body = {
                email    : "AsyncResearch@mail.org",
                userName : "Async Research Institute",
            };

            const result = await createGUser(deps, body)
                .then((res) => res)
                .catch((err) => err);


            expect(result).toHaveProperty("err");
            expect(result).toHaveProperty("message");
        });

        it("createGUser should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValueOnce(mockEmptyRecords).mockResolvedValue(mockValue);

            const body = {
                email    : "AsyncResearch@mail.org",
                userName : "Async Research Institute",
            };

            const result = await createGUser(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("token", "mockedToken");
            expect(result.data.node).toHaveProperty("email");
            expect(result.data.node).toHaveProperty("userName");
            expect(result.data.node).toHaveProperty("uuid");
        });
    });

    describe("loginGUser Controller", () => {
        it("loginGUser should throw an error if token fails", async () => {
            deps.services.google.client.verifyIdToken = jest.fn().mockResolvedValue({
                getPayload: jest.fn().mockReturnValue(undefined)
            });

            const body = {
                token: "Super Secret Token"
            };

            const result = await loginGUser(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err");
            expect(result).toHaveProperty("message");
        });

        it("loginGUser should return formatted result", async () => {
            deps.services.google.client.verifyIdToken = jest.fn().mockResolvedValue({
                getPayload: jest.fn().mockReturnValue(true)
            });

            const body = {
                token: "Super Secret Token"
            };

            const result = await loginGUser(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toBe(true);
        });
    });

    describe("getUserAnswers Controller", () => {
        it("getUserAnswers should throw an error if spreadsheets throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);
            deps.services.google.client.verifyIdToken = jest.fn().mockResolvedValue(undefined);
            deps.services.google.service.spreadsheets.values.get = jest.fn().mockImplementation(() => {
                throw new Error("Corrupted!");
            });

            const body = {
                sheet_id: "Sheet ID"
            };

            const result = await getUserAnswers(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err");
            expect(result).toHaveProperty("message");
        });
    });

    describe("getEvaluation Controller", () => {
        it("getEvaluation should throw an error", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);
            deps.services.google.client.verifyIdToken = jest.fn().mockResolvedValue(undefined);

            const body = {
                sheet_id : "Sheet ID",
                email    : "AsyncResearch@mail.org"
            };

            const result = await getEvaluation(deps, body)
                .then((res) => res)
                .catch((err) => err);


            expect(result).toHaveProperty("err");
            expect(result).toHaveProperty("message");
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