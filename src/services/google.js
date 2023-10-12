const { OAuth2Client } = require("google-auth-library");

module.exports = async () => {
    try {
        const client = await new OAuth2Client(process.env.GOOGLE_API);

        return { client };
    } catch (err) {
        process.stdout.write("\x1b[31mFailed to establish connection to Google Services: " + err.message + "\x1b[0m\n");
    }
};