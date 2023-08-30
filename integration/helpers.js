const request = require("./supertest.js");

/*
Currently gives issues running this probably due to JEST, supertest and how we use fs to write UUIDs. You can fix it by setting a timeout for 2 seconds,
however that is unacceptable due to performance and we have to make dummy data lots of times.
*/
/*
const fs = require("fs");
const path = require("path");

const keepTrackOfUuids = async (UUID) => {
    try {
        const filePath = path.join(__dirname, "mockData.json");
        const jsonData = fs.readFileSync(filePath, "utf8");
        const data = await JSON.parse(jsonData);

        data.dummyNodes.push(UUID);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        console.log(`UUID ${UUID} added to the array.`);
    } catch (error) {
        console.error("Error:", error);
    }
};
*/

const makeSprint = async ({ sprintNo, title, desc }) => {
    const reqData = {
        sprintNo,
        title: "Test -" + title,
        desc
    };

    await request
        .post("/sprints/")
        .send(reqData)
        .expect(200);
};


module.exports = {
    makeSprint
};
