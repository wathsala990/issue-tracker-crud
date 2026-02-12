const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

transporter.verify((error) => {
    if (error) {
        console.error(error.message);
    }
});

const sendEmail = async ({ to, subject, html, attachments = [] }) => {
    try {
        await transporter.sendMail({
            from: `"${process.env.PROJECT_NAME}" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
            attachments,
        });
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

module.exports = sendEmail;
