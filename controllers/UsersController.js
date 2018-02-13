// https://github.com/adnanrahic/securing-restful-apis-with-jwt/blob/master/auth/AuthController.js


var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');
var verifyToken = require('./../common/VerifyToken');
var config = require("./../config");
var common = require('./../common/Common');
//var nodemailer = require("nodemailer");

router.post("/login", function (req, res) {
    // create a token
    const token = jwt.sign({ id: req.body.id }, config.secretKey, {
        expiresIn: 86400 // expires in 24 hours
    });
    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
});

router.get('/logout', verifyToken, function (req, res) {
    res.status(200).send({ auth: false, token: null });
});


router.get('/me', verifyToken, function (req, res, next) {
    res.status(200).send("Ok");
});

//var smtpTransport = nodemailer.createTransport({
//    service: "gmail",
//    host: "smtp.gmail.com",
//    auth: {
//        user: "YOUR EMAIL HERE",
//        pass: "YOUR PASSWORD HERE"
//    }
//});

router.post('/sendmail', function (req, res) {
    var mailOptions = {
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    }

    common.sendEmail(mailOptions, function (err, result) {
        if (err)
            res.send(JSON.stringify(err));
        else
            res.send(JSON.stringify(result.recordsets));
    });

    //console.log(mailOptions);
    //smtpTransport.sendMail(mailOptions, function (error, response) {
    //    if (error) {
    //        console.log(error);
    //        res.end("error");
    //    } else {
    //        console.log("Message sent: " + response.message);
    //        res.end("sent");
    //    }
    //});
});


module.exports = router;