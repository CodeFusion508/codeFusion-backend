const request = require("./supertest.js");

// Content Helpers
const makeDummyContent = async (reqBody) => {
    const reqData = {
        label     : reqBody.label,
        exp       : reqBody.exp,
        title     : "Test - " + reqBody.title,
        desc      : reqBody.desc,
        time      : reqBody.time,
        dayUuid   : reqBody.dayUuid,
        contentNo : reqBody.contentNo
    };
    switch (reqBody.label) {
        case "Text":
            reqData.path = reqBody.path;

            break;
        case "Video":
            reqData.link = reqBody.link;

            break;
        case "Problem":
            reqData.language = reqBody.language;

            break;
        case "Quiz":
            reqData.path = reqBody.path;

            break;
        default:
            throw new Error("Did not provide a label!");
    }

    const { body } = await request
        .post("/contents/" + reqBody.label.toLowerCase())
        .set("admin", process.env.ADMIN_KEY_KEY)
        .send(reqData)
        .expect(200);

    return body;
};

const bulkDeleteDummyContents = async () => {
    await request
        .delete("/contents/bulk-test")
        .expect(200);
};

// Day Helpers
const makeDummyDay = async ({
    dayNo,
    sprintUuid,
    desc
}) => {
    const reqData = {
        desc: "Test - " + desc,
        dayNo,
        sprintUuid,
    };

    const { body } = await request
        .post("/days")
        .set("admin", process.env.ADMIN_KEY)
        .send(reqData)
        .expect(200);

    return body;
};

const bulkDeleteDummyDays = async () => {
    await request
        .delete("/days/bulk-test")
        .expect(200);
};


// Sprint Helpers
const makeDummySprint = async ({
    sprintNo,
    title,
    desc
}) => {
    const reqData = {
        sprintNo,
        title: "Test - " + title,
        desc
    };

    const { body } = await request
        .post("/sprints")
        .set("admin", process.env.ADMIN_KEY)
        .send(reqData)
        .expect(200);

    return body;
};

const bulkDeleteDummySprints = async () => {
    await request
        .delete("/sprints/bulk-test")
        .expect(200);
};


module.exports = {
    makeDummyDay,
    bulkDeleteDummyDays,
    makeDummySprint,
    bulkDeleteDummySprints,
    makeDummyContent,
    bulkDeleteDummyContents
};


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