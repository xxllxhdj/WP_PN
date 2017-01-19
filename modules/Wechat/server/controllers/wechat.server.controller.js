'use strict';

var path = require('path'),
    config = require(path.resolve('./config/config')),
    crypto = require('crypto');

exports.checkWechatSign = function(req, res, next) {
    if (checkSignature(req.query, config.wechat.token)) {
        res.writeHead(200);
        res.end(req.query.echostr);
        return;
    }
    next();
};

function checkSignature(query, token) {
    var signature = query.signature;
    var timestamp = query.timestamp;
    var nonce = query.nonce;

    if (!timestamp || !nonce) {
        return false;
    }

    var shasum = crypto.createHash('sha1');
    var arr = [token, timestamp, nonce].sort();
    shasum.update(arr.join(''));

    return shasum.digest('hex') === signature;
};
