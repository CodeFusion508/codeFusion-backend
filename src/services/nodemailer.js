const nodemailer = require("nodemailer");

const emailSupport = process.env.EMAIL_SUPPORT;
const passwordSupport = process.env.KEY_EMAIL_SUPPORT;
const hostSupport = process.env.HOST_EMAIL;
const portSupport = process.env.PORT_EMAIL;
const secureSupport = process.env.SECURE_EMAIL === true;

module.exports = () => {
    try {
        const auth = { user: emailSupport, pass: passwordSupport };

        const transporter = nodemailer.createTransport({
            host   : hostSupport,
            port   : portSupport,
            secure : secureSupport,
            auth
        });

        const send = (to = "", title = "", template = "") => {
            transporter.sendMail({
                from    : auth.user, to,
                subject : title, html    : template
            });
        };

        return { send };
    } catch (err) {
        throw new Error("Failed to establish connection to nodemailer: " + err.message);
    }
};