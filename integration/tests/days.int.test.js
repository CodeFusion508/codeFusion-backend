const request = require("../supertest.js");
const {
    makeDummyDay,
    bulkDeleteDummyDays,
    makeDummySprint,
    bulkDeleteDummySprints,
    makeDummyContent,
    bulkDeleteDummyContents
} = require("../helpers.js");


describe("Sprints Integration Tests", () => {
    const path = "/days";

    describe("POST /", () => {
        let UUID;

        beforeAll(async () => {
            const body = await makeDummySprint({
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            });

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

        beforeAll(async () => {
            const body = await makeDummySprint({
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            });

            const result = await makeDummyDay({
                desc       : "If you're not careful and you noclip out of reality in the wrong areas",
                dayNo      : 1,
                sprintUuid : body.node.uuid,
            });

            UUID = result.node.uuid;
        });

        it("Should update specific day", async () => {
            const reqData = {
                uuid : UUID,
                exp  : 1993,
                desc : "Test - " + "BoneyM - Rasputin"
            };

            const { body } = await request
                .put(path)
                .send(reqData)
                .expect(200);

            expect(body.stats).toHaveProperty("propertiesSet", 2);
            expect(body.node).toHaveProperty("uuid", reqData.uuid);
            expect(body.node).toHaveProperty("exp", reqData.exp);
            expect(body.node).toHaveProperty("desc", reqData.desc);
        });
    });

    describe("GET /node/:uuid", () => {
        let result;

        beforeAll(async () => {
            const body = await makeDummySprint({
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            });

            result = await makeDummyDay({
                desc       : "If you're not careful and you noclip out of reality in the wrong areas",
                dayNo      : 1,
                sprintUuid : body.node.uuid,
            });
        });

        it("Should get specific day", async () => {
            const { body } = await request
                .get(path + `/node/${result.node.uuid}/`)
                .expect(200);

            for (const key in body.stats) {
                expect(body.stats[key]).toBe(0);
            }
            expect(body.node).toHaveProperty("uuid", result.node.uuid);
            expect(body.node).toHaveProperty("exp", result.node.exp);
            expect(body.node).toHaveProperty("desc", result.node.desc);
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

            const result = await makeDummyDay({
                desc       : "If you're not careful and you noclip out of reality in the wrong areas",
                dayNo      : 1,
                sprintUuid : body.node.uuid,
            });

            UUID = result.node.uuid;
        });

        it("Should delete specific day", async () => {
            const { body } = await request
                .delete(path + `/node/${UUID}`)
                .expect(200);

            expect(body.stats).toHaveProperty("labelsAdded", 1);
            expect(body.node.length < 1).toBeTruthy();
            expect(Array.isArray(body.node)).toBeTruthy();
        });
    });

    describe("GET /node/relationships/:uuid", () => {
        let UUID;

        beforeAll(async () => {
            const result = await makeDummySprint({
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            });

            const body = await makeDummyDay({
                desc       : "If you're not careful and you noclip out of reality in the wrong areas",
                dayNo      : 1,
                sprintUuid : result.node.uuid
            });

            UUID = body.node.uuid;

            await makeDummyContent({
                label     : "Text",
                exp       : 1994,
                title     : "Mallsoft",
                desc      : "Anemoia",
                time      : "Forever",
                dayUuid   : UUID,
                contentNo : 1,

                path: "https://youtu.be/wJWksPWDKOc"
            });
        });

        it("Should get days and relationships of sprint node", async () => {
            const { body } = await request
                .get(path + `/node/relationships/${UUID}`)
                .expect(200);

            for (const key in body.stats) {
                expect(body.stats[key]).toBe(0);
            }
            expect(body.node[0].node.uuid).not.toBe(UUID);
            expect(body.node[0].node).toHaveProperty("desc", "Anemoia");
            expect(body.node[0].rels).toHaveProperty("type", "BELONGS_TO");
            expect(body.node[0].rels.properties).toHaveProperty("contentNo", 1);
        });
    });

    afterAll(async () => {
        // We are executing this in this order because we are deleting relationships in order of the highest to lowest
        await bulkDeleteDummySprints();
        await bulkDeleteDummyDays();
        await bulkDeleteDummyContents();
    });
});