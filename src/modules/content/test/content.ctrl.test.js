const {
    createDay,
    getAllDays,
    updatedDay,
    getDay,
    deleteDay,
    getDaysRels
} = require("../content.ctrl.js");

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

    describe("createDay", () => {
        it("createDay should return data", async () => {
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

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
            deps.services.neo4j.session.run = jest.fn().mockResolvedValue(mockCreate);

            const params = {
                uuid: "d54jd3-d58k543-83k45d8-9dd84"
            };
            const result = await deleteDay(deps, params)
                .then((res) => res)
                .catch((err) => err);

            expect(result).toHaveProperty("stats");
            expect(result.node).toHaveProperty("uuid");
        });
    });

});