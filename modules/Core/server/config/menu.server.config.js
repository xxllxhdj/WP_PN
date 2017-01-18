
var fs = require('fs'),
    chalk = require('chalk'),
    wechat = require('../controllers/wechat.server.controller');

module.exports = function() {
    fs.readFile('./wechat/menu.json', 'utf8', function (err, menu) {
        if (err) {
            console.error(chalk.red('Could not read menu.json!'));
            console.log(err);
            return;
        }
        wechat.createMenu(menu, function() {});
    });
};
