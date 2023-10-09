const request = require("../supertest.js");
const {
    makeDummyDay,
    bulkDeleteDummyDays,
    makeDummySprint,
    bulkDeleteDummySprints,
    bulkDeleteDummyContents,
    makeDummyContent
} = require("../helpers.js");


describe("Content Integration Tests", () => {
    const path = "/contents";

    describe("POST /", () => {
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
                sprintUuid : body.node.uuid
            });

            UUID = result.node.uuid;
        });

        it("Should create Problem content", async () => {
            const reqData = {
                label     : "Problem",
                exp       : 1993,
                title     : "Test - " + "Mallsoft",
                desc      : "Calming background music that emulates a mall. Along with some echo and slight distortion",
                time      : "Forever",
                dayUuid   : UUID,
                contentNo : 1,

                language: "C+++"
            };

            const { body } = await request
                .post(path + "/problem")
                .set("admin", process.env.ADMIN_KEY)
                .send(reqData)
                .expect(200);

            expect(body.stats).toHaveProperty("nodesCreated", 1);
            expect(body.node).toHaveProperty("language", reqData.language);
            expect(body.node).toHaveProperty("title", reqData.title);
            expect(body.node).toHaveProperty("desc", reqData.desc);
        });

        it("Should create Quiz content", async () => {
            const reqData = {
                label     : "Quiz",
                exp       : 1993,
                title     : "Test - " + "Mallsoft",
                desc      : "Calming background music that emulates a mall. Along with some echo and slight distortion",
                time      : "Forever",
                dayUuid   : UUID,
                contentNo : 1,

                path: "The quite place"
            };

            const { body } = await request
                .post(path + "/quiz")
                .set("admin", process.env.ADMIN_KEY)
                .send(reqData)
                .expect(200);

            expect(body.stats).toHaveProperty("nodesCreated", 1);
            expect(body.node).toHaveProperty("path", reqData.path);
            expect(body.node).toHaveProperty("title", reqData.title);
            expect(body.node).toHaveProperty("desc", reqData.desc);
        });

        it("Should create Video content", async () => {
            const reqData = {
                label     : "Video",
                exp       : 1993,
                title     : "Test - " + "Mallsoft",
                desc      : "Calming background music that emulates a mall. Along with some echo and slight distortion",
                time      : "Forever",
                dayUuid   : UUID,
                contentNo : 1,

                link: "https://youtu.be/kovd7OzcU9s"
            };

            const { body } = await request
                .post(path + "/video")
                .set("admin", process.env.ADMIN_KEY)
                .send(reqData)
                .expect(200);

            expect(body.stats).toHaveProperty("nodesCreated", 1);
            expect(body.node).toHaveProperty("link", reqData.link);
            expect(body.node).toHaveProperty("title", reqData.title);
            expect(body.node).toHaveProperty("desc", reqData.desc);
        });

        it("Should create Text content", async () => {
            const reqData = {
                label     : "Text",
                exp       : 1993,
                title     : "Test - " + "Mallsoft",
                desc      : "Calming background music that emulates a mall. Along with some echo and slight distortion",
                time      : "Forever",
                dayUuid   : UUID,
                contentNo : 1,

                path: "Neon Palm Mall"
            };

            const { body } = await request
                .post(path + "/text")
                .set("admin", process.env.ADMIN_KEY)
                .send(reqData)
                .expect(200);

            expect(body.stats).toHaveProperty("nodesCreated", 1);
            expect(body.node).toHaveProperty("path", reqData.path);
            expect(body.node).toHaveProperty("title", reqData.title);
            expect(body.node).toHaveProperty("desc", reqData.desc);
        });
    });

    describe("PUT /:label", () => {
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
                sprintUuid : body.node.uuid
            });

            const response = await makeDummyContent({
                label     : "Video",
                exp       : 1994,
                title     : "Mallsoft",
                desc      : "Anemoia",
                time      : "Forever",
                dayUuid   : result.node.uuid,
                contentNo : 1,

                link: "https://youtu.be/wJWksPWDKOc"
            });

            UUID = response.node.uuid;
        });

        it("Should update Video content", async () => {
            const reqData = {
                label : "Video",
                uuid  : UUID,
                exp   : 1993,
                title : "Test - " + "Mallsoft",
                desc  : "Calming background music that emulates a mall. Along with some echo and slight distortion",
                time  : "Forever",

                link: "https://youtu.be/kovd7OzcU9s"
            };

            const { body } = await request
                .put(path + "/Video")
                .set("admin", process.env.ADMIN_KEY)
                .send(reqData)
                .expect(200);


            expect(body.stats).toHaveProperty("propertiesSet", 5);
            expect(body.node).toHaveProperty("link", reqData.link);
            expect(body.node).toHaveProperty("title", reqData.title);
            expect(body.node).toHaveProperty("desc", reqData.desc);
        });
    });

    describe("GET /node/:uuid", () => {
        let UUID;
        let response;

        beforeAll(async () => {
            const body = await makeDummySprint({
                sprintNo : 1993,
                title    : "The Backrooms",
                desc     : "If you're not careful and you noclip out of reality in the wrong areas"
            });

            const result = await makeDummyDay({
                desc       : "If you're not careful and you noclip out of reality in the wrong areas",
                dayNo      : 1,
                sprintUuid : body.node.uuid
            });

            response = await makeDummyContent({
                label     : "Video",
                exp       : 1994,
                title     : "Mallsoft",
                desc      : "Anemoia",
                time      : "Forever",
                dayUuid   : result.node.uuid,
                contentNo : 1,

                link: "https://youtu.be/wJWksPWDKOc"
            });

            UUID = response.node.uuid;
        });

        it("Should get content info", async () => {
            const { body } = await request
                .get(path + `/node/${UUID}`)
                .expect(200);


            for (const key in body.stats) {
                expect(body.stats[key]).toBe(0);
            }
            expect(body.node).toHaveProperty("link", response.node.link);
            expect(body.node).toHaveProperty("title", response.node.title);
            expect(body.node).toHaveProperty("desc", response.node.desc);
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
                sprintUuid : body.node.uuid
            });

            const response = await makeDummyContent({
                label     : "Video",
                exp       : 1994,
                title     : "Mallsoft",
                desc      : "Anemoia",
                time      : "Forever",
                dayUuid   : result.node.uuid,
                contentNo : 1,

                link: "https://youtu.be/wJWksPWDKOc"
            });

            UUID = response.node.uuid;
        });

        it("Should delete content node", async () => {
            const { body } = await request
                .delete(path + `/node/${UUID}`)
                .set("admin", process.env.ADMIN_KEY)
                .expect(200);

            expect(body.stats).toHaveProperty("labelsAdded", 1);
            expect(body.stats).toHaveProperty("nodesDeleted", 0);
            expect(body.stats).toHaveProperty("nodesCreated", 0);
            expect(body).toHaveProperty("node");
        });
    });

    afterAll(async () => {
        // We are executing this in this order because we are deleting relationships in order of the highest to lowest
        await bulkDeleteDummySprints();
        await bulkDeleteDummyDays();
        await bulkDeleteDummyContents();
    });
});