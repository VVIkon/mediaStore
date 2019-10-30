"use strict";
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
var path_1 = require("path");
var express_1 = require("express");
var connect_multiparty_1 = require("connect-multiparty");
var DbService_1 = require("./Base/Services/DbService");
var AbstractConsoleCommand_1 = require("./Base/Consoles/AbstractConsoleCommand");
var LoggerService_1 = require("./Base/Services/LoggerService");
var MailService_1 = require("./Base/Services/MailService");
var Router_1 = require("./Modules/Router");
var StoreController_1 = require("./Modules/Store/StoreController");
var StoreService_1 = require("./Modules/Store/StoreService");
var StorePointsModel_1 = require("./Modules/Store/StorePointsModel");
var CrossStoreSelectorModel_1 = require("./Modules/Store/CrossStoreSelectorModel");
var FileModel_1 = require("./Modules/Store/FileModel");
var RefFileTypeModel_1 = require("./Modules/Store/RefFileTypeModel");
var UserController_1 = require("./Modules/User/UserController");
var UserService_1 = require("./Modules/User/UserService");
var UserModel_1 = require("./Modules/User/UserModel");
var DepartmentModel_1 = require("./Modules/User/DepartmentModel");
var RefPermissionModel_1 = require("./Modules/User/RefPermissionModel");
var Application = /** @class */ (function () {
    function Application(config) {
        this.config = config;
        this.rootDir = path_1["default"].dirname(__dirname);
    }
    Object.defineProperty(Application.prototype, "isConsole", {
        get: function () {
            return !!process.argv[2];
        },
        enumerable: true,
        configurable: true
    });
    Application.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.initializeServices();
                if (this.isConsole) {
                    this.mode = 'command';
                    this.runConsole();
                }
                else {
                    this.mode = 'server';
                    this.runWebServer();
                }
                return [2 /*return*/];
            });
        });
    };
    Application.prototype.runConsole = function () {
        return __awaiter(this, void 0, void 0, function () {
            var command, _i, _a, commandInstance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        command = process.argv[2];
                        this.initializeConsoleCommands();
                        _i = 0, _a = Object.values(this);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        commandInstance = _a[_i];
                        if (!(commandInstance instanceof AbstractConsoleCommand_1.AbstractConsoleCommand)) return [3 /*break*/, 3];
                        if (!(commandInstance.name === command)) return [3 /*break*/, 3];
                        return [4 /*yield*/, commandInstance.execute()];
                    case 2:
                        _b.sent();
                        process.exit();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log("Command \"" + command + "\" not found");
                        process.exit();
                        return [2 /*return*/];
                }
            });
        });
    };
    Application.prototype.runWebServer = function () {
        var _this = this;
        this.http = express_1["default"]();
        this.http.use(express_1["default"].json());
        this.http.use(express_1["default"].urlencoded({ extended: true }));
        this.http.use(connect_multiparty_1["default"]());
        this.initializeControllers();
        this.router = new Router_1.Router(this);
        this.http.listen(this.config.port, function () {
            console.log("Web server started at port " + _this.config.port);
        });
    };
    Application.prototype.initializeConsoleCommands = function () {
        // this.testCommand = new TestCommand(this)
    };
    Application.prototype.initializeControllers = function () {
        this.storeController = new StoreController_1.StoreController(this);
        this.userController = new UserController_1.UserController(this);
    };
    Application.prototype.initializeServices = function () {
        this.dbService = new DbService_1.DbService(this);
        this.mailService = new MailService_1.MailService(this);
        this.loggerService = new LoggerService_1.LoggerService(this);
        this.storePointsModel = new StorePointsModel_1.StorePointsModel(this);
        this.refFileTypeModel = new RefFileTypeModel_1.RefFileTypeModel(this);
        this.fileModel = new FileModel_1.FileModel(this);
        this.crossStoreSelectorModel = new CrossStoreSelectorModel_1.CrossStoreSelectorModel(this);
        this.storeService = new StoreService_1.StoreService(this);
        this.departmentModel = new DepartmentModel_1.DepartmentModel(this);
        this.refPermissionModel = new RefPermissionModel_1.RefPermissionModel(this);
        this.userModel = new UserModel_1.UserModel(this);
        this.userService = new UserService_1.UserService(this);
    };
    return Application;
}());
exports.Application = Application;
