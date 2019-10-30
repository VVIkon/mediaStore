"use strict";
exports.__esModule = true;
var Application_1 = require("./Application");
var routines_1 = require("./routines");
var crypto_1 = require("crypto");
function execute(config) {
    String.prototype.sha512 = function () {
        return crypto_1["default"].createHash('sha512').update(this).digest('hex').toString();
    };
    String.prototype.md5 = function () {
        return crypto_1["default"].createHash('md5').update(this).digest('hex').toString();
    };
    Date.prototype.getTimestamp = function () { return Math.floor(this.getTime() / 1000); };
    global.time = function () { return Math.floor(Date.now() / 1000); };
    global.date = function (format, timestamp) { return routines_1["default"].date(format, timestamp); };
    global.float = function (value) { return value ? parseFloat(value) : .0; };
    var app = new Application_1.Application(config);
    app.run();
}
exports.execute = execute;
