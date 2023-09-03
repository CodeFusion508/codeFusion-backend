const request = require("../supertest.js");
const {
    makeDummyDay,
    bulkDeleteDummyDays,
    makeDummySprint,
    bulkDeleteDummySprints
} = require("../helpers.js");


describe("Sprints Integration Tests", () => {
    const path = "/days";

    describe("POST /", () => {
        let UUID;

        beforeAll(async () => {
            const dummySprint = {
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            };
            const body = await makeDummySprint(dummySprint);
            UUID = body.node.uuid;
        });

        it("Should get days and relationships of sprint node", async () => {
            const reqData = {
                desc       : "Test - " + "If you're not careful and you noclip out of reality in the wrong areas",
                dayNo      : 1,
                sprintUuid : UUID,
            };

            const { body } = await request
                .post(path)
                .send(reqData)
                .expect(200);

            expect(body.stats).toHaveProperty("nodesCreated", 1);
            expect(body.stats).toHaveProperty("relationshipsCreated", 1);
            expect(body.stats).toHaveProperty("propertiesSet", 4);
            expect(body.node.uuid).not.toBe(UUID);
            expect(body.node).toHaveProperty("desc", reqData.desc);
        });
    });

    describe("GET /", () => {
        it("Should get all days", async () => {
            const { body } = await request
                .get(path)
                .expect(200);

            for (const key in body.stats) {
                expect(body.stats[key]).toBe(0);
            }
            expect(body.node.length > 1).toBeTruthy();
        });
    });

    describe("PUT /", () => {
        let UUID;
        let dummyDay;

        beforeAll(async () => {
            const dummySprint = {
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            };
            const body = await makeDummySprint(dummySprint);
            const sprintUuid = body.node.uuid;

            dummyDay = {
                desc  : "If you're not careful and you noclip out of reality in the wrong areas",
                dayNo : 1,
                sprintUuid,
            };
            const result = await makeDummyDay(dummyDay);
            UUID = result.node.uuid;
        });

        it("Should get days and relationships of sprint node", async () => {
            const reqData = {
                uuid : UUID,
                exp  : 1993,
                desc : "Test - " + "BoneyM - Rasputin"
            };

            const { body } = await request
                .put(path)
                .send(reqData)
                .expect(200);

            expect(body.stats).toHaveProperty("propertiesSet",2);
            expect(body.node).toHaveProperty("uuid", reqData.uuid);
            expect(body.node).toHaveProperty("exp", reqData.exp);
            expect(body.node).toHaveProperty("desc", reqData.desc);
        });
    });

    afterAll(async () => {
        // bulkDeleteDummySprints goes first because it deletes the relationships between sprints and days
        await bulkDeleteDummySprints();
        await bulkDeleteDummyDays();
    });
});