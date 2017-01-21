
var fs = require('fs'),
    path = require('path'),
    config = require(path.resolve('./config/config')),
    chalk = require('chalk'),
    wechat = require('wechat'),
    wechatapi = require('../controllers/wechatapi.server.controller'),
    wechatController = require('../controllers/wechat.server.controller');

module.exports = function(app) {
    initMenu();

    app.use('/', wechat(config.wechat.token, wechat.text(function (message, req, res, next) {
        res.reply(message.Content);
    }).event(wechatController.wechatEvent)));
};

function initMenu() {
    fs.readFile('./modules/Wechat/data/menu.json', 'utf8', function (err, menu) {
        if (err) {
            console.error(chalk.red('Could not read menu.json!'));
            console.log(err);
            return;
        }
        wechatapi.createMenu(menu, function() {});
    });
}