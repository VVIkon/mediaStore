"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var AbstractService_1 = require("./AbstractService");
var fs_1 = require("fs");
var path_1 = require("path");
var LogType;
(function (LogType) {
    LogType["error"] = "error";
    LogType["warning"] = "warning";
})(LogType || (LogType = {}));
var LoggerService = /** @class */ (function (_super) {
    __extends(LoggerService, _super);
    function LoggerService(app) {
        var _this = _super.call(this, app) || this;
        _this.intervalExecuting = false;
        _this.interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.intervalExecuting) {
                            return [2 /*return*/];
                        }
                        this.intervalExecuting = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.getCurrentFilename()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        this.write(err_1);
                        return [3 /*break*/, 5];
                    case 4:
                        this.intervalExecuting = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); }, 60000 * 60);
        process.on('uncaughtException', _this.exceptionListener.bind(_this));
        return _this;
        // process.on('unhandledRejection', this.exceptionListener.bind(this))
    }
    LoggerService.prototype.checkCondition = function () { };
    LoggerService.prototype.exceptionListener = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.write(error);
                console.error(error);
                return [2 /*return*/];
            });
        });
    };
    LoggerService.prototype.write = function (message, log) {
        if (log === void 0) { log = LogType.error; }
        return __awaiter(this, void 0, void 0, function () {
            var file, date, _i, message_1, m, messageForWrite;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Object.values(LogType).includes(log)) {
                            this.write("Log type \"" + log + " is invalid\", reseting to \"error\"...");
                            log = LogType.error;
                        }
                        return [4 /*yield*/, this.getCurrentFilename(log)];
                    case 1:
                        file = _a.sent();
                        date = new Date();
                        message = Array.isArray(message) ? message : [message];
                        for (_i = 0, message_1 = message; _i < message_1.length; _i++) {
                            m = message_1[_i];
                            messageForWrite = m instanceof Error ? m.stack : "" + m;
                            messageForWrite = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" +
                                (String(date.getDate()).padStart(2, '0') + "T") +
                                (String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":") +
                                (String(date.getSeconds()).padStart(2, '0') + " ") +
                                messageForWrite;
                            fs_1["default"].appendFileSync(file, messageForWrite + '\n');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoggerService.prototype.getCurrentFilename = function (log) {
        if (log === void 0) { log = 'error'; }
        return __awaiter(this, void 0, void 0, function () {
            var fileName, fd, stat, date, moveFileName;
            var _this = this;
            return __generator(this, function (_a) {
                if (!fs_1["default"].existsSync('logs')) {
                    fs_1["default"].mkdirSync('logs');
                }
                fileName = "logs/" + log + ".log";
                if (!fs_1["default"].existsSync(fileName)) {
                    return [2 /*return*/, fileName];
                }
                fd = fs_1["default"].openSync(fileName, 'r');
                stat = fs_1["default"].fstatSync(fd);
                fs_1["default"].closeSync(fd);
                date = new Date();
                if (stat.mtime.getDate() !== date.getDate()) {
                    moveFileName = "logs/" + log + "-" + stat.mtime.getFullYear() + "-" + String(stat.mtime.getMonth() + 1).padStart(2, '0') + "-" +
                        (String(stat.mtime.getDate()).padStart(2, '0') + ".log");
                    moveFileName = fs_1["default"].existsSync(moveFileName) ? moveFileName + '.' + Date.now() : moveFileName;
                    fs_1["default"].renameSync(fileName, moveFileName);
                    this.sendLogToEmail(this.app.config.notification.mailHost.sender, moveFileName)["catch"](function (err) { return _this.write(err); });
                }
                return [2 /*return*/, fileName];
            });
        });
    };
    LoggerService.prototype.sendLogToEmail = function (email, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var pathInfo, _i, email_1, m;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(email)) {
                            email = [email];
                        }
                        pathInfo = path_1["default"].parse(fileName);
                        _i = 0, email_1 = email;
                        _a.label = 1;
                    case 1:
                        if (!(_i < email_1.length)) return [3 /*break*/, 4];
                        m = email_1[_i];
                        return [4 /*yield*/, this.app.mailService.send(m, "mediaStore " + pathInfo.base, "<p style=\"font-family: monospace;\">" + fs_1["default"].readFileSync(fileName).toString().replace(/\n/g, '<br>') + "</p>")];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return LoggerService;
}(AbstractService_1.AbstractService));
exports.LoggerService = LoggerService;
