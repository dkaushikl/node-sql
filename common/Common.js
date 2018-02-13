var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "email address",
        pass: "password"
    }
});

exports.sendEmail = function (mailOptions, callback) {
    smtpTransport.sendMail(mailOptions, function (response, err) {
        callback(err, result);
    });
}
