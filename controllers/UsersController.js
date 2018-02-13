// https://github.com/adnanrahic/securing-restful-apis-with-jwt/blob/master/auth/AuthController.js


var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');
var verifyToken = require('./../common/VerifyToken');
var config = require("./../config");

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



module.exports = router;