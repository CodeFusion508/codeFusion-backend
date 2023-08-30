const request = require("../supertest.js");
const {
    makeDummySprint,
    bulkDeleteDummySprints
} = require("../helpers.js");


describe("Sprints Integration Tests", () => {
    const path = "/sprints/";

    beforeAll(async () => {
        const dummyData = {
            sprintNo : 1993,
            title    : "The Backrooms",
            desc     : "If you're not careful and you noclip out of reality in the wrong areas"
        };
        await makeDummySprint(dummyData);
        await makeDummySprint(dummyData);
        await makeDummySprint(dummyData);
        await makeDummySprint(dummyData);
    });

    describe("GET /", () => {
        it("Should get sprint nodes", async () => {
            const { body } = await request
                .get(path)
                .expect(200);

            expect(body).toHaveProperty("stats");
            expect(body).toHaveProperty("node");
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
                .post("/sprints/")
                .send(reqData)
                .expect(200);

            expect(body).toHaveProperty("stats");
            expect(body).toHaveProperty("node");
        });
    });

    afterAll(async () => {
        await bulkDeleteDummySprints();
    });
});