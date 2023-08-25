const request = require("../supertest.js");


describe("Students Integration Tests", () => {
    const path = "/sprints/";

    describe("Students Integration Describe", () => {
        it("Testing supertest for testing our endpoints", async () => {
            const { body } = await request().get(path);
            console.log(body);
            expect(false).toBeTruthy();
        });
    });
});