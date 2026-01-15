import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme : "default",
        product : {
            name : "Task manager",
            link : "https://taskmanagerlink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
    const emailHtml = mailGenerator.generate(options.mailgenContent);

    const transporter = nodemailer.createTransport({
        host : process.env.MAILTRAP_SMTP_HOST,
        port : process.env.MAILTRAP_SMTP_PORT,
        auth : {
            user : process.env.MAILTRAP_SMTP_USER,
            pass : process.env.MAILTRAP_SMTP_PASS,
        }
    })

    const mail = {
        from : "mail.taskmanager@example.com",
        to : options.email,
        subject : options.subject,
        text : emailTextual,
        html : emailHtml
    }

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error("email service failed. make sure you have provided your MAILTRAP credentials in .env file")
        console.error("Error :" , error );
    }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body : {
            name : username,
            intro : "Welcome to our app! We are so happy to have you onboard",
            action : {
                instructions : "to verify your email, please click on the following button",
                button : {
                    color : "green",
                    text : "verify your email",
                    link : verificationUrl
                }
            },
            outro : "need help? right to this email!",
        }
    }
}

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body : {
            name : username,
            intro : "We got a request to reset the password of your account",
            action : {
                instructions : "to reset your password email, please click on the following button",
                button : {
                    color : "red",
                    text : "reset password",
                    link : passwordResetUrl
                }
            },
            outro : "need help? right to this email!",
        }
    }
}

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
};