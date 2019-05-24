const nodemailer = require('nodemailer');

const mailConfig = require('../config/nodemailer.json')
const appConfig = require('../config/app.json')
const tranporter = nodemailer.createTransport(mailConfig);

module.exports = {
    sendActivationCode: (sendTo, code) => {

        const output = `
        <h3>Activation link</h3>
        <a href=${appConfig.host}/activation/${code}>Activate</a>
        `;
        const mailOptions = {
            from: mailConfig.auth.user,
            to: sendTo,
            subject: 'Activation code from ' + appConfig.host,
            html: output
        };
        return tranporter.sendMail(mailOptions);
    }
};