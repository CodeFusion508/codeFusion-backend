const request = require("../supertest.js");
const {
    makeDummyDay,
    bulkDeleteDummyDays,
    makeDummySprint,
    bulkDeleteDummySprints
} = require("../helpers.js");


describe("Sprints Integration Tests", () => {
    const path = "/sprints";

    describe("GET /", () => {
        it("Should get all sprint nodes", async () => {
            const { body } = await request
                .get(path)
                .expect(200);

            for (const key in body.stats) {
                expect(body.stats[key]).toBe(0);
            }
            expect(body.node.length > 1).toBeTruthy();
        });
    });

    describe("POST /", () => {
        it("Should create a sprint node", async () => {
            const reqData = {
                sprintNo : 1993,
                title    : "Test - The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            };

            const { body } = await request
                .post(path)
                .send(reqData)
                .expect(200);

            expect(body.stats).toHaveProperty("nodesCreated", 1);
            expect(body.stats).toHaveProperty("labelsAdded", 1);
            expect(body.node).toHaveProperty("title", reqData.title);
            expect(body.node).toHaveProperty("sprintNo", reqData.sprintNo);
        });
    });

    describe("PUT /", () => {
        let UUID;

        beforeAll(async () => {
            const dummyData = {
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            };

            const body = await makeDummySprint(dummyData);
            UUID = body.node.uuid;
        });

        it("Should update sprint node", async () => {
            const reqData = {
                uuid     : UUID,
                sprintNo : 1994,
                title    : "Test - Doom II",
                desc     : "Hell on Earth!",
                totalExp : 1994
            };

            const { body } = await request
                .put(path)
                .send(reqData)
                .expect(200);

            expect(body.stats).toHaveProperty("propertiesSet", 4);
            expect(body.node).toHaveProperty("title", reqData.title);
            expect(body.node).toHaveProperty("sprintNo", reqData.sprintNo);
            expect(body.node).toHaveProperty("totalExp", reqData.totalExp);
        });
    });

    describe("GET /:uuid/info", () => {
        let UUID;
        let dummyData;

        beforeAll(async () => {
            dummyData = {
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            };

            const body = await makeDummySprint(dummyData);
            UUID = body.node.uuid;
        });

        it("Should get sprint node", async () => {
            const { body } = await request
                .get(path + `/${UUID}/info`)
                .expect(200);


            for (const key in body.stats) {
                expect(body.stats[key]).toBe(0);
            }
            expect(body.node).toHaveProperty("uuid", UUID);
            expect(body.node).toHaveProperty("title", "Test - " + dummyData.title);
            expect(body.node).toHaveProperty("sprintNo", dummyData.sprintNo);
        });
    });

    describe("DELETE /:uuid/node", () => {
        let UUID;
        let dummyData;

        beforeAll(async () => {
            dummyData = {
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            };

            const body = await makeDummySprint(dummyData);
            UUID = body.node.uuid;
        });

        it("Should get delete a sprint node", async () => {
            const { body } = await request
                .delete(path + `/${UUID}/node`)
                .expect(200);

            expect(body.stats).toHaveProperty("labelsAdded", 1);
            expect(body).toHaveProperty("node");
        });
    });

    describe("GET /:uuid/rel", () => {
        let UUID;

        beforeAll(async () => {
            const dummySprint = {
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            };
            const body = await makeDummySprint(dummySprint);
            UUID = body.node.uuid;

            const dummyDay = {
                desc       : "If you're not careful and you noclip out of reality in the wrong areas",
                dayNo      : 1,
                sprintUuid : UUID,
            };
            await makeDummyDay(dummyDay);
        });

        it("Should get days and relationships of sprint node", async () => {
            const { body } = await request
                .get(path + `/${UUID}/rel`)
                .expect(200);

            console.log(body);
            expect(body).toHaveProperty("node");
        });
    });


    afterAll(async () => {
        await bulkDeleteDummySprints();
        await bulkDeleteDummyDays();
    });
});