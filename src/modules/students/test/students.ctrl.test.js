const {
    signUp,
    logIn,
    getStudent,
    updateStudent,
    deleteStudent,

    createRel,
    deleteRel,

    WaitingForAccountConfirmation,
    recoveryAccount,
    confirmAccount
} = require("../students.ctrl.js");

const jwt = require("../../../config/jwt.js");


describe("Students Controller Tests", () => {
    let deps;

    beforeAll(() => {
        deps = {
            services: {
                neo4j: {
                    session: { run: null }
                },
                email    : { send: null },
                template : { confirmEmail: null }
            }
        };

        jest.spyOn(jwt, "createToken").mockReturnValue("mockedToken");
    });

    describe("signUp Controller", () => {
        it("signUp should throw an error if email has been registered", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const body = {
                email    : "AsyncResearch@mail.org",
                password : "password",
                userName : "Async Research Institute"
            };

            const result = await signUp(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 403);
            expect(result).toHaveProperty("message", "Este correo electrónico ya ha sido registrado, utilice otro o inicie sesión.");
        });

        it("signUp should return token and data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValueOnce(mockEmptyRecords).mockResolvedValue(mockValue);

            const body = {
                email    : "AsyncResearch@mail.org",
                password : "password",
                userName : "Async Research Institute"
            };

            const result = await signUp(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("token", "mockedToken");
            expect(result.data.node).toHaveProperty("email", "AsyncResearch@mail.org");
        });
    });

    describe("logIn Controller", () => {
        it("logIn should throw an error if password is incorrect", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const body = {
                email    : "AsyncResearch@mail.org",
                password : "incorrectPassword",
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

    describe("deleteStudent Controller", () => {
        it("deleteStudent should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmptyRecords);

            const param = {
                uuid: "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
            };

            const result = await deleteStudent(deps, param)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("node");
            expect(result).toHaveProperty("stats");
        });
    });

    describe("getStudent Controller", () => {
        it("getStudent should throw an error if user doesn't exist", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmptyRecords);

            const param = {
                uuid: "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
            };

            const result = await getStudent(deps, param)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 404);
            expect(result).toHaveProperty("message", "Este usuario no existe, verifique si tiene el uuid válido.");
        });

        it("getStudent should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const param = {
                uuid: "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
            };

            const result = await getStudent(deps, param)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result).toHaveProperty("node.email");
        });
    });

    describe("updateStudent Controller", () => {
        it("updateStudent should throw an error if body has less than one change", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const body = {
                uuid: "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
            };

            const result = await updateStudent(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("err", 400);
            expect(result).toHaveProperty("message", "Debe indicar al menos un cambio.");
        });

        it("updateStudent should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);

            const body = {
                uuid      : "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
                totalExp  : 1993,
                weeklyExp : 1993,
                userName  : "Async Research Institute",
                password  : "password"
            };

            const result = await updateStudent(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
        });
    });

    describe("createRel Controller", () => {
        it("createRel should throw an error if user doesn't exist", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockEmptyRecords);

            const body = {
                uuid         : "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
                contentUuid  : "c4fc0d8d-5608-4c1e-ab7e-1bf61392cd43",
                contentLabel : "Problem",
                relation     : "FAILED"
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
                uuid         : "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
                contentUuid  : "c4fc0d8d-5608-4c1e-ab7e-1bf61392cd43",
                contentLabel : "Problem",
                relation     : "FAILED"
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
                uuid         : "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
                contentUuid  : "c4fc0d8d-5608-4c1e-ab7e-1bf61392cd43",
                contentLabel : "Problem",
                relation     : "FAILED"
            };

            const result = await deleteRel(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("node");
            expect(result).toHaveProperty("stats");
        });
    });

    describe("WaitingForAccountConfirmation Controller", () => {
        it("WaitingForAccountConfirmation should return message", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);
            deps.services.email.send = jest.fn().mockResolvedValue("Email Sent!");
            deps.services.template.confirmEmail = jest.fn().mockResolvedValue("Email Confirmed!");

            const body = {
                email    : "AsyncResearch@mail.org",
                password : "password",
                userName : "Async Research Institute"
            };

            const result = await WaitingForAccountConfirmation(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result.data).toBe("Se ha enviado un mensaje a " + body.email + " para confirmar tu cuenta");
        });
    });

    describe("confirmAccount Controller", () => {
        it("confirmAccount should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValueOnce(mockEmptyRecords).mockResolvedValue(mockValue);
            deps.services.email.send = jest.fn().mockResolvedValue("Email Sent!");
            deps.services.template.confirmEmail = jest.fn().mockResolvedValue("Email Confirmed!");

            jest.spyOn(jwt, "decodeToken").mockReturnValue({
                email    : "AsyncResearch@mail.org",
                password : "password",
                userName : "Async Research Institute"
            });


            const body = {
                email    : "AsyncResearch@mail.org",
                password : "password",
                userName : "Async Research Institute"
            };

            const result = await confirmAccount(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("title", "Confirmación de Cuenta");
            expect(result).toHaveProperty("message", "Bienvenido a CodeFusion508");
        });
    });

    describe("recoveryAccount Controller", () => {
        it("recoveryAccount should return formatted result", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockValue);
            deps.services.email.send = jest.fn().mockResolvedValue("Email Sent!");
            deps.services.template.confirmEmail = jest.fn().mockResolvedValue("Email Confirmed!");

            jest.spyOn(jwt, "decodeToken").mockReturnValue({
                email    : "AsyncResearch@mail.org",
                password : "password",
                userName : "Async Research Institute"
            });


            const body = {
                email    : "AsyncResearch@mail.org",
                password : "password",
                userName : "Async Research Institute"
            };

            const result = await recoveryAccount(deps, body)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("message", "Se ha enviado un mensaje al correo " + body.email + " para recuperar tu cuenta");
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
                        "uuid"     : "G1bB3ri$-X5Y9-!nv4l!d-#c0d3-Z7T8X@7",
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