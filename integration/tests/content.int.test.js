const request = require("../supertest.js");
const {
    makeDummyDay,
    bulkDeleteDummyDays,
    makeDummySprint,
    bulkDeleteDummySprints,
    bulkDeleteDummyContents
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

                element  : "H1",
                content  : "GZDoom",
                language : "C+++"
            };

            const { body } = await request
                .post(path + "/problem")
                .send(reqData)
                .expect(200);

            expect(body.stats).toHaveProperty("nodesCreated", 1);
            expect(body.node).toHaveProperty("element", reqData.element);
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
                .send(reqData)
                .expect(200);

                expect(body.stats).toHaveProperty("nodesCreated", 1);
                expect(body.node).toHaveProperty("path", reqData.path);
                expect(body.node).toHaveProperty("title", reqData.title);
                expect(body.node).toHaveProperty("desc", reqData.desc);
        });
    });

    afterAll(async () => {
        // We are executing this in this order because we are deleting relationships in order of the highest to lowest
        await bulkDeleteDummySprints();
        await bulkDeleteDummyDays();
        await bulkDeleteDummyContents();
    });
});