const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SG_MAIL_APIKEY)

const sendWelcomeEmail = (name, email) => {
    sgMail.send({
        from: process.env.APP_EMAIL,
        to: email,
        subject: 'Welcome to the app!',
        text: `Hello ${name}, welcome to the task app!`
    })
}

const sendGoodbyeEmail = (name, email) => {
    sgMail.send({
        from: process.env.APP_EMAIL,
        to: email,
        subject: `Goodbye, ${name}.`,
        text: `Hey ${name}, sorry to see you go. Hope we see you again.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}
