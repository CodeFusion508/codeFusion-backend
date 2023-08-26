const request = require("../supertest.js");


describe("Sprints Integration Tests", () => {
    const path = "/sprints/";

    describe("GET /", () => {
        it("Should get sprint nodes", async () => {
            const { body } = await request()
                .get(path)
                .expect(200);


            expect(body).toHaveProperty("stats");
            expect(body).toHaveProperty("node");
            expect(body.node.length).toBeGreaterThan(1);
        });
    });
});