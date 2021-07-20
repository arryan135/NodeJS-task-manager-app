const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "arryan@umich.edu",
        subject: "Welcome to Arryan's NodeJS task manager app",
        text: `Welcome to the app, ${name}. Let me know how you get along with the different routes of this app`
    })
}

const sendGoodByeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "arryan@umich.edu",
        subject: "Thanks for using Arryan's NodeJS task manager app",
        text: `Hi ${name}! I hope you had a good time using the task manager app. Just in case you have forgotten this email is sent when you delete a user. Have a good rest of your day!`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendGoodByeEmail
}
