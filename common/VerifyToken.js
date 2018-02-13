// https://github.com/adnanrahic/securing-restful-apis-with-jwt/blob/master/config.js

var jwt = require("jsonwebtoken");
var config = require('../config');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secretKey, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        next();

        // ReSharper disable once NotAllPathsReturnValue
    });
    // ReSharper disable once NotAllPathsReturnValue
}

module.exports = verifyToken;