'use strict';

var path = require('path'),
    config = require(path.resolve('./config/config'));

exports.wechatEvent = function(message, req, res, next) {
    if (message.EventKey === 'MSG_TEXT') {
        res.reply('文本消息');
        return;
    }
    if (message.EventKey === 'MSG_PIC') {
        res.reply([{
            title: '微信UI',
            description: 'WeUI 是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。',
            picurl: 'http://101.251.244.131:6500/img/weui.png',
            url: 'https://weui.io/'
        }]);
        return;
    }
    next();
};
