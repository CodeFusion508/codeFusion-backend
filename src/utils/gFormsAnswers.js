// Import dependencies
const fs = require("fs");
const { google } = require("googleapis");

const service = google.sheets("v4");
const credentials = require("../config/CF_credentials.json");

// Configure auth client
let authClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
);

// Authorize the client
async function authorize () {
    const token = await authClient.authorize();
    authClient.setCredentials(token);
};
authorize();


// Set the client credentials


async function getAllAnswersQuery (sheet_id) {
    try {
        // Get the rows
        const res = await service.spreadsheets.values.get({
            auth          : authClient,
            spreadsheetId : sheet_id,
            range         : "A1:F4",
        });

        // Set rows to equal the rows
        const rows = res.data.values;

        // Check if we have any data and if we do add it to our answers array
        /*if (rows.length) {

            // Remove the headers
            //rows.shift();

            // For each row
            for (const row of rows) {
                //answers.push({ timeStamp: row[0], answer: row[1] });
                answers.push(row);
            }

        } else {
            console.log("No data found.");
        }*/
        return rows;
        // Saved the answers
        /*fs.writeFileSync("answers.json", JSON.stringify(answers), function (err, file) {
            if (err) throw err;
            console.log("Saved!");
        });*/

    } catch (error) {

        // Log the error
        console.log(error);

        // Exit the process with error
        process.exit(1);

        return error;
    }
}

async function getEvaluationQuery (sheet_id, email) {
    console.log(sheet_id, email, "getEvaluationQuery");
    try {
        // Get the rows
        const res = await service.spreadsheets.values.get({
            auth          : authClient,
            spreadsheetId : sheet_id,
            range         : "B:C",
        });

        // Set rows to equal the rows
        const rows = res.data.values;
        console.log(rows);
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][0] === email) {
                console.log(rows[i][1]);
                return rows[i][1];
            }
        }
            // eck if we have any data and if we do add it to our answers array
    } catch (error) {

        // Log the error
        console.log(error);

        // Exit the process with error
        process.exit(1);

        return error;
    }
}

module.exports = { getAllAnswersQuery, getEvaluationQuery };