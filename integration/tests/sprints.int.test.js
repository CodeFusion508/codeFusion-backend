const request = require("../supertest.js");
const helpers = require("../helpers.js");


describe("Sprints Integration Tests", () => {
    const path = "/sprints/";

    beforeAll(async () => {
        const dummyData = {
            sprintNo : 1993,
            title    : "The Backrooms",
            desc     : "If you're not careful and you noclip out of reality in the wrong areas"
        };
        await helpers.makeSprint(dummyData);
        await helpers.makeSprint(dummyData);
        await helpers.makeSprint(dummyData);
        await helpers.makeSprint(dummyData);
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

    // describe("POST /", () => {
    //     it("Should create a sprint node", async () => {
    //         const reqData = {
    //             sprintNo : 1993,
    //             title    : "The Backrooms",
    //             desc     : "If you're not careful and you noclip out of reality in the wrong areas"
    //         };

    //         const { body } = await request
    //             .post(path)
    //             .send(reqData);

    //         expect(body).toHaveProperty("stats");
    //         expect(body).toHaveProperty("node");
    //     });
    // });
});