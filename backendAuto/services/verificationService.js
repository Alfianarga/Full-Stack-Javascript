//const transporter = require('./initService').transporter;
const hbs = require('nodemailer-express-handlebars');
let nodeMailer = require("nodemailer");
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    // host: "smtp-mail.outlook.com", // hostname
    // secureConnection: false, // TLS requires secureConnection to be false
    // port: 587, // port for secure SMTP
    // tls: {
    //    ciphers:'SSLv3',
    //    rejectUnauthorized: false
    // },
    auth: {
        user: "-",
        pass: "-"
    }
});

transporter.use('compile', hbs({
    viewEngine: {
        extName: '.hbs',
        partialsDir: './email_templates/',
        layoutsDir: './email_templates/',
        defaultLayout: 'otp.hbs',
    },

    //viewEngine: 'express-handlebars',
    viewPath: './email_templates/',
    extName: '.hbs',

}));

function sendVerificationEmail(email, jwtToken){
    return new Promise((resolve, reject) => {

        let mailOptions = {
            from: '<info@bfraxbit.com>', // sender address
            to: email, // list of receivers
            subject: 'Verify Your Account', // Subject line
            context: {
                verificationLink: `http://localhost:5001/auth/verification?email=${email}&token=${jwtToken}`
            },
            template: 'verification'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("err1 ", error);
                reject(error)

            } else {
                resolve("Activation link has been sent!")
            }
        }); 

    })
}

module.exports = {
    sendVerificationEmail: sendVerificationEmail
}