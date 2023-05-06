const { google } = require("googleapis");

const service = google.sheets("v4");
const credentials = require("../config/CF_credentials.json");

const authClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
);

async function authorize() {
    const token = await authClient.authorize();
    authClient.setCredentials(token);
}

authorize();

async function getAllAnswersQuery(sheet_id) {
    const res = await service.spreadsheets.values.get({
        auth          : authClient,
        spreadsheetId : sheet_id,
        range         : "A1:F4",
    });

    const rows = res.data.values;

    return rows;
}

async function getEvaluationQuery(sheet_id, email) {

    const res = await service.spreadsheets.values.get({
        auth          : authClient,
        spreadsheetId : sheet_id,
        range         : "B:C",
    });

    const rows = res.data.values;

    for (let i = 0; i < rows.length; i++) {
        if (rows[i][0] === email) {
            return rows[i][1];
        }
    }
}

module.exports = { getAllAnswersQuery, getEvaluationQuery };