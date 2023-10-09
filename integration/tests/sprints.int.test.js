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
                .set("admin", process.env.ADMIN_KEY)
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
            const body = await makeDummySprint({
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            });

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
                .set("admin", process.env.ADMIN_KEY)
                .send(reqData)
                .expect(200);

            expect(body.stats).toHaveProperty("propertiesSet", 4);
            expect(body.node).toHaveProperty("title", reqData.title);
            expect(body.node).toHaveProperty("sprintNo", reqData.sprintNo);
            expect(body.node).toHaveProperty("totalExp", reqData.totalExp);
        });
    });

    describe("GET /node/:uuid", () => {
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
                .get(path + `/node/${UUID}/`)
                .expect(200);


            for (const key in body.stats) {
                expect(body.stats[key]).toBe(0);
            }
            expect(body.node).toHaveProperty("uuid", UUID);
            expect(body.node).toHaveProperty("title", "Test - " + dummyData.title);
            expect(body.node).toHaveProperty("sprintNo", dummyData.sprintNo);
        });
    });

    describe("DELETE /node/:uuid", () => {
        let UUID;

        beforeAll(async () => {
            const body = await makeDummySprint({
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            });

            UUID = body.node.uuid;
        });

        it("Should get delete a sprint node", async () => {
            const { body } = await request
                .delete(path + `/node/${UUID}`)
                .set("admin", process.env.ADMIN_KEY)
                .expect(200);

            expect(body.stats).toHaveProperty("labelsAdded", 1);
            expect(body).toHaveProperty("node");
        });
    });

    describe("GET /node/rels/:uuid", () => {
        let UUID;
        let dummyDay;

        beforeAll(async () => {
            const body = await makeDummySprint({
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            });

            UUID = body.node.uuid;

            dummyDay = {
                desc       : "If you're not careful and you noclip out of reality in the wrong areas",
                dayNo      : 1,
                sprintUuid : UUID,
            };
            await makeDummyDay(dummyDay);
        });

        it("Should get days and relationships of sprint node", async () => {
            const { body } = await request
                .get(path + `/node/rels/${UUID}`)
                .expect(200);

            for (const key in body.stats) {
                expect(body.stats[key]).toBe(0);
            }
            expect(body.node[0].node.uuid).not.toBe(UUID);
            expect(body.node[0].node).toHaveProperty("desc", "Test - " + dummyDay.desc);
            expect(body.node[0].rels).toHaveProperty("type", "BELONGS_TO");
            expect(body.node[0].rels.properties).toHaveProperty("dayNo", dummyDay.dayNo);
        });
    });


    afterAll(async () => {
        // We are executing this in this order because we are deleting relationships in order of the highest to lowest
        await bulkDeleteDummySprints();
        await bulkDeleteDummyDays();
    });
});