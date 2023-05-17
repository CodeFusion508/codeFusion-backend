<<<<<<< HEAD
const { google } = require("googleapis");

const service = google.sheets("v4");
const credentials = require("../config/credentials.json");

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
=======
async function getAllAnswersQuery({ service, authClient }, sheet_id) {
>>>>>>> 12bbcd00201cc1156f1680d6333804cb3557139e
    try {
        const res = await service.spreadsheets.values.get({
            auth          : authClient,
            spreadsheetId : sheet_id,
            range         : "'Respuestas de formulario 1'",
        });

        const rows = res.data.values;

        return rows;
    } catch (error) {
        return error;
    }
}

async function getEvaluationQuery({ service, authClient }, sheet_id, email) {
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