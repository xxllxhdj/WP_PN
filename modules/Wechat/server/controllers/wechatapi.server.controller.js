
var path = require('path'),
    config = require(path.resolve('./config/config')),
    WechatAPI = require('wechat-api');

module.exports = new WechatAPI(config.wechat.appid, config.wechat.appsecret);
