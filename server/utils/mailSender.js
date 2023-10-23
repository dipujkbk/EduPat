const nodemailer = require("nodemailer");
require("dotenv").config()


async function mailSender(email, title, body){

    try {
        
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from: 'Edupat || Your Education Partner',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })

        console.log("Mail sent: ", info);
        return info;

    } catch (error) {
        console.log(error)
    }
}

module.exports = mailSender