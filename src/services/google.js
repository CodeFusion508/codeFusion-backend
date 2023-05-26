const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const service = google.sheets("v4");

const credentials = require("../config/codefusion-386720-2dfac979d6f3.json");

module.exports = async () => {
    try {
        const client = await new OAuth2Client(process.env.GOOGLE_API);

        const authClient = await new google.auth.JWT(
            credentials.client_email,
            null,
            credentials.private_key.replace(/\\n/g, "\n"),
            ["https://www.googleapis.com/auth/spreadsheets"]
        );

        const token = await authClient.authorize();
        authClient.setCredentials(token);

        return { client, service, authClient };
    } catch (err) {
        throw new Error("Failed to establish connection to Google Services: " + err.message);
    }
};