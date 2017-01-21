'use strict';

var path = require('path'),
    config = require(path.resolve('./config/config'));

exports.wechatEvent = function(message, req, res, next) {
    if (message.EventKey === 'MSG_TEXT') {
        res.reply('文本消息');
        return;
    }
    next();
};
