'use strict';

var validator = require('validator'),
    path = require('path'),
    config = require(path.resolve('./config/config')),
    crypto = require('crypto');

/**
 * Render the main application page
 */
exports.renderIndex = function(req, res) {
    if (checkSignature(req)) {
        res.end(req.query.echostr);
        return;
    }
    var safeUserObject = null;
    if (req.user) {
        safeUserObject = {
            displayName: validator.escape(req.user.displayName),
            provider: validator.escape(req.user.provider),
            username: validator.escape(req.user.username),
            created: req.user.created.toString(),
            roles: req.user.roles,
            profileImageURL: req.user.profileImageURL,
            email: validator.escape(req.user.email),
            lastName: validator.escape(req.user.lastName),
            firstName: validator.escape(req.user.firstName),
            additionalProvidersData: req.user.additionalProvidersData
        };
    }

    res.render('modules/core/server/views/index', {
        user: JSON.stringify(safeUserObject),
        sharedConfig: JSON.stringify(config.shared)
    });
};

/**
 * Render the server error page
 */
exports.renderServerError = function(req, res) {
    res.status(500).render('modules/core/server/views/500', {
        error: 'Oops! Something went wrong...'
    });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function(req, res) {

    res.status(404).format({
        'text/html': function() {
            res.render('modules/core/server/views/404', {
                url: req.originalUrl
            });
        },
        'application/json': function() {
            res.json({
                error: 'Path not found'
            });
        },
        'default': function() {
            res.send('Path not found');
        }
    });
};

function checkSignature(req) {
    var timestamp = req.query.timestamp,
        nonce = req.query.nonce;
    if (!timestamp || !nonce) {
        return false;
    }
    var key =[config.wechat.token, timestamp, nonce].sort().join('');
    var sha1 = crypto.createHash('sha1').update(key).digest('hex');
    return sha1 === req.query.signature;
}
