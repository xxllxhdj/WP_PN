
var fs = require('fs'),
    chalk = require('chalk'),
    wechatapi = require('../controllers/wechatapi.server.controller'),
    wechatController = require('../controllers/wechat.server.controller');

module.exports = function(app) {
    fs.readFile('./modules/Wechat/data/menu.json', 'utf8', function (err, menu) {
        if (err) {
            console.error(chalk.red('Could not read menu.json!'));
            console.log(err);
            return;
        }
        wechatapi.createMenu(menu, function() {});
    });

    app.get('/', wechatController.checkWechatSign);
};
