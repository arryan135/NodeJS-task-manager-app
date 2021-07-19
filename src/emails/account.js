const sgMail = require("@sendgrid/mail");

const sendGridAPIKey = "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";

sgMail.setApiKey(sendGridAPIKey);

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
