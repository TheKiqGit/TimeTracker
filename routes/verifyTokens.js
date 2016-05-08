var jwt = require('jsonwebtoken');
var config = require('../config/configToken');

exports.getToken = function(user) {
    var payload = {
        username: user.username,
        admin: user.admin
    };
    return jwt.sign(payload, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function(req, res, next) {

    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    //decode token
    if (token) {
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if (err) {
                var err_ = new Error('You are not authenticated');
                err_.status = 403;
                return res.json(err);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        var err = new Error('No token provided');
        err.status = 403;
        return res.json(err);
    }
};

exports.verifyAdmin = function(req, res, next) {
    if (req.decoded.admin) {
        next()
    } else {
        return res.status(401).json({
            error: 'Not enough privileges'
        });
    }
};