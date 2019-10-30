"use strict";
exports.__esModule = true;
var ConsoleColors;
(function (ConsoleColors) {
    ConsoleColors["Reset"] = "\u001B[0m";
    ConsoleColors["Bright"] = "\u001B[1m";
    ConsoleColors["Dim"] = "\u001B[2m";
    ConsoleColors["Underscore"] = "\u001B[4m";
    ConsoleColors["Blink"] = "\u001B[5m";
    ConsoleColors["Reverse"] = "\u001B[7m";
    ConsoleColors["Hidden"] = "\u001B[8m";
    ConsoleColors["FgBlack"] = "\u001B[30m";
    ConsoleColors["FgRed"] = "\u001B[31m";
    ConsoleColors["FgGreen"] = "\u001B[32m";
    ConsoleColors["FgYellow"] = "\u001B[33m";
    ConsoleColors["FgBlue"] = "\u001B[34m";
    ConsoleColors["FgMagenta"] = "\u001B[35m";
    ConsoleColors["FgCyan"] = "\u001B[36m";
    ConsoleColors["FgWhite"] = "\u001B[37m";
    ConsoleColors["BgBlack"] = "\u001B[40m";
    ConsoleColors["BgRed"] = "\u001B[41m";
    ConsoleColors["BgGreen"] = "\u001B[42m";
    ConsoleColors["BgYellow"] = "\u001B[43m";
    ConsoleColors["BgBlue"] = "\u001B[44m";
    ConsoleColors["BgMagenta"] = "\u001B[45m";
    ConsoleColors["BgCyan"] = "\u001B[46m";
    ConsoleColors["BgWhite"] = "\u001B[47m";
})(ConsoleColors = exports.ConsoleColors || (exports.ConsoleColors = {}));
var AbstractConsoleCommand = /** @class */ (function () {
    function AbstractConsoleCommand(app, name, description, usage) {
        this.app = app;
        this.name = name;
        this.description = description;
        this.usage = usage;
    }
    AbstractConsoleCommand.prototype.colorize = function (color, text) {
        return "" + color + text + ConsoleColors.Reset;
    };
    AbstractConsoleCommand.prototype.writeLn = function (text, color) {
        if (color === void 0) { color = ConsoleColors.Reset; }
        console.log(this.colorize(color, text));
    };
    AbstractConsoleCommand.prototype.write = function (text, color) {
        if (color === void 0) { color = ConsoleColors.Reset; }
        process.stdout.write(this.colorize(color, text));
    };
    AbstractConsoleCommand.prototype.readLn = function () {
        return new Promise(function (r) {
            process.stdout.once('data', function (d) { return r(d.toString()); });
        });
    };
    return AbstractConsoleCommand;
}());
exports.AbstractConsoleCommand = AbstractConsoleCommand;
