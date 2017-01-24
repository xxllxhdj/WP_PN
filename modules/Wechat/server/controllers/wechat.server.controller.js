'use strict';

var path = require('path'),
    config = require(path.resolve('./config/config')),
    wechatapi = require('../controllers/wechatapi.server.controller');

exports.wechatEvent = function(message, req, res, next) {
    if (message.Event === 'subscribe') {
        res.reply('您好！感谢关注xxllxhdj的接口测试号');
        return;
    }
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
    if (message.EventKey === 'MSG_PICS') {
        res.reply([{
            title: '微信公众平台',
            description: '给企业和组织提供更强大的业务服务与用户管理能力,帮助企业快速实现全新的公众号服务平台。',
            picurl: 'http://101.251.244.131:6500/img/wechat.jpg',
            url: 'https://mp.weixin.qq.com/'
        }, {
            title: '微信UI',
            description: 'WeUI 是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信内网页和微信小程序量身设计，令用户的使用感知更加统一。',
            picurl: 'http://101.251.244.131:6500/img/weui.png',
            url: 'https://weui.io/'
        }, {
            title: '微信UI.js',
            description: 'WeUI 的轻量级 js 封装',
            picurl: 'http://101.251.244.131:6500/img/weui.png',
            url: 'https://weui.io/weui.js/'
        }, {
            title: '微信JS-SDK',
            description: '微信JS-SDK是微信公众平台面向网页开发者提供的基于微信内的网页开发工具包',
            picurl: 'http://101.251.244.131:6500/img/weui.png',
            url: 'http://demo.open.weixin.qq.com/jssdk'
        }]);
        return;
    }
    if (message.EventKey === 'MSG_TPL') {
        var templateId = 'TU0Bv_pMvTjJO0Y1fBFyXio3yu8SXaV4JhX3dJ86eFM';
        var url = 'http://weixin.qq.com/download';
        var date = new Date();
        var data = {
            first: {
                value: '尊敬的客户，您的订单已支付成功',
                color: '#173177'
            },
            keyword1: {
                value: '2017款背包',
                color: '#173177'
            },
            keyword2: {
                value: date.valueOf().toString(),
                color: '#173177'
            },
            keyword3: {
                value: '150元',
                color: '#173177'
            },
            keyword4: {
                value: date.toString(),
                color: '#173177'
            },
            remark: {
                value: '感谢您的光临',
                color: '#173177'
            }
        };
        wechatapi.sendTemplate(message.FromUserName, templateId, url, data, function (err, result) {
            res.end();
        });
        return;
    }
    next();
};
