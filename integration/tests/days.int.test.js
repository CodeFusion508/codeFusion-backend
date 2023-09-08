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

    describe("GET /:uuid/info", () => {
        let result;
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
            result = await makeDummyDay(dummyDay);
        });

        it("Should get specific day", async () => {
            const { body } = await request
                .get(path + `/${result.node.uuid}/info`)
                .expect(200);

            for (const key in body.stats) {
                expect(body.stats[key]).toBe(0);
            }
            expect(body.node).toHaveProperty("uuid", result.node.uuid);
            expect(body.node).toHaveProperty("exp", result.node.exp);
            expect(body.node).toHaveProperty("desc", result.node.desc);
        });
    });

    describe("DELETE /:uuid/node", () => {
        let result;
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
            result = await makeDummyDay(dummyDay);
        });

        it("Should delete specific day", async () => {
            const { body } = await request
                .delete(path + `/${result.node.uuid}/node`)
                .expect(200);

            expect(body.stats).toHaveProperty("labelsAdded", 1);
            expect(body.node.length < 1).toBeTruthy();
            expect(Array.isArray(body.node)).toBeTruthy();
        });
    });

    describe("GET /:uuid/rel", () => {
        let UUID;
        let dummyDay;

        beforeAll(async () => {
            const result = await makeDummySprint({
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            });

            dummyDay = {
                desc       : "If you're not careful and you noclip out of reality in the wrong areas",
                dayNo      : 1,
                sprintUuid : result.node.uuid
            };
            const body = await makeDummyDay(dummyDay);
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
                .get(path + `/${UUID}/rel`)
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
        // bulkDeleteDummySprints goes first because it deletes the relationships between sprints and days
        await bulkDeleteDummySprints();
        await bulkDeleteDummyDays();
        await bulkDeleteDummyContents();
    });
});