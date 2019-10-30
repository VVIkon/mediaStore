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
var sequelize_1 = require("sequelize");
var AbstractModel_1 = require("../../Base/Services/AbstractModel");
var UserModel = /** @class */ (function (_super) {
    __extends(UserModel, _super);
    function UserModel(app) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
        _this.model = app.dbService.sequelize.define('users', {
            id: {
                type: sequelize_1["default"].INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            departmentId: {
                type: sequelize_1["default"].INTEGER(),
                field: 'department_id',
                allowNull: false,
                references: { model: 'department', key: 'id' }
            },
            storePointSet: {
                type: sequelize_1["default"].INTEGER(),
                field: 'store_point_set',
                allowNull: false
            },
            userName: {
                type: sequelize_1["default"].STRING(255),
                field: 'user_name',
                allowNull: false
            },
            login: {
                type: sequelize_1["default"].STRING(50),
                field: 'login',
                allowNull: true
            },
            password: {
                type: sequelize_1["default"].STRING(512),
                field: 'password',
                allowNull: true
            },
            token: {
                type: sequelize_1["default"].STRING(512),
                field: 'token',
                allowNull: true
            },
            salt: {
                type: sequelize_1["default"].BIGINT,
                field: 'salt',
                defaultValue: 0
            },
            tokenExpare: {
                type: sequelize_1["default"].BIGINT,
                field: 'token_expare',
                allowNull: true
            },
            permitionGroupSet: {
                type: sequelize_1["default"].STRING(255),
                field: 'permission_group_set',
                defaultValue: 0
            },
            email: {
                type: sequelize_1["default"].STRING(100),
                field: 'email',
                allowNull: true
            },
            phone: {
                type: sequelize_1["default"].STRING(100),
                field: 'phone',
                allowNull: true
            },
            mobile: {
                type: sequelize_1["default"].STRING(100),
                field: 'mobile',
                allowNull: true
            },
            deletedAt: {
                type: sequelize_1["default"].INTEGER,
                field: 'deleted_at',
                allowNull: false,
                defaultValue: 0
            },
            updatedAt: {
                type: sequelize_1["default"].INTEGER,
                field: 'updated_at',
                allowNull: false
            },
            createdAt: {
                type: sequelize_1["default"].INTEGER,
                field: 'created_at',
                allowNull: false
            }
        }, { tableName: 'users', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true });
        _this.model.belongsTo(_this.app.departmentModel.model);
        return _this;
    }
    ///======================================================== getters =========================
    UserModel.prototype.getUsersAttr = function (deleteIt) {
        if (deleteIt === void 0) { deleteIt = [0]; }
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findAll({
                                include: [this.app.departmentModel.model],
                                where: {
                                    deletedAt: (_a = {}, _a[sequelize_1["default"].Op.eq] = deleteIt, _a)
                                },
                                order: [
                                    ['id', 'ASC']
                                ]
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        err_1 = _b.sent();
                        console.error("ERROR_USER_SERVICE: " + err_1.message);
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * {id:0, uName: '', uLogin:'', uPassword: '', uToken:'', uSalt:'', tokenExpare: 0, email:'', active:1, permitionId:0, departId:0}
     * Сохранение владельца МАС-адресов
     * @param {*} params
     */
    UserModel.prototype.setUser = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var result, foundItem, err_2, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        if (!params.id) return [3 /*break*/, 7];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.model.findById(params.id)];
                    case 2:
                        foundItem = _a.sent();
                        if (!foundItem) return [3 /*break*/, 4];
                        foundItem.id = params.id;
                        foundItem.uName = params.userName;
                        foundItem.uLogin = params.login;
                        foundItem.departId = params.departmentId;
                        if (params.password && params.login) {
                            foundItem.uPassword = this.hashGenerator(params.password, params.login);
                        }
                        foundItem.email = params.email,
                            foundItem.permitionId = params.permitionGroupSet;
                        foundItem.active = params.deletedAt;
                        return [4 /*yield*/, foundItem.save()];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        console.log('Ошибка: ' + err_2, params.toString());
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 10];
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, this.model.create({
                                id: params.id,
                                uName: params.userName,
                                uLogin: params.login,
                                uPassword: this.hashGenerator(params.password, params.login),
                                email: params.email,
                                // uToken = params.uToken,
                                // uSalt = params.uSalt,
                                // tokenExpare: params.tokenExpare,
                                permitionId: params.permitionGroupSet,
                                departId: params.departmentId,
                                active: params.deletedAt
                            })];
                    case 8:
                        result = _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        err_3 = _a.sent();
                        console.log('Ошибка: ' + err_3, params.toString());
                        return [3 /*break*/, 10];
                    case 10: 
                    // await this.app.cacheService.delete(`users_0_1`)
                    // await this.app.cacheService.delete(`users_1`)
                    return [2 /*return*/, result ? result.dataValues : undefined];
                }
            });
        });
    };
    /**
     * token grgerator
     * @param {} psw
     * @param {*} login
     * @param {*} slt

    /**
     * {uLogin:'', uPassword: ''} params
     */
    UserModel.prototype.userLogin = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var res, hash, slt, tokenExpare, tkn;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!params.username || !params.password) {
                            return [2 /*return*/, { error: 'Не получен логин или пароль', token: undefined }];
                        }
                        return [4 /*yield*/, this.model.findOne({
                                where: {
                                    userLogin: params.username,
                                    active: 1,
                                    permitionId: (_a = {},
                                        _a[sequelize_1["default"].Op["in"]] = [1, 2],
                                        _a)
                                }
                            })];
                    case 1:
                        res = _b.sent();
                        if (!res) {
                            return [2 /*return*/, { error: 'Пользователь не найден', token: undefined }];
                        }
                        hash = this.hashGenerator(params.password, params.username);
                        if (hash && hash.localeCompare(res.uPassword) != 0) {
                            return [2 /*return*/, { error: 'Не верный пароль', token: undefined }];
                        }
                        slt = new Date().getTime();
                        tokenExpare = res.tokenExpare ? res.tokenExpare : 0;
                        tkn = res.uToken;
                        if (!(tokenExpare < slt)) return [3 /*break*/, 3];
                        // генерирую новый token + salt и сохраняем в БД
                        tkn = [params.username, params.password, slt.toString()].join('').sha512();
                        res.uSalt = slt.toString();
                        res.uToken = tkn;
                        res.tokenExpare = slt + 43200000; // 12ч
                        return [4 /*yield*/, res.save()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/, { error: undefined, token: tkn }];
                }
            });
        });
    };
    UserModel.prototype.getUsersByPermition = function (active, permitions, flag) {
        if (active === void 0) { active = [1]; }
        if (permitions === void 0) { permitions = [2]; }
        if (flag === void 0) { flag = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.model.findAll({
                            //             include: [this.app.subordinationService.subordinationModel],
                            attributes: flag ? ['id', 'uName', 'email'] : ['id', 'uName', 'uLogin', 'uPassword', 'permitionId', 'email', 'active', 'departId'],
                            where: {
                                active: (_a = {},
                                    _a[sequelize_1["default"].Op["in"]] = active,
                                    _a),
                                permitionId: (_b = {},
                                    _b[sequelize_1["default"].Op["in"]] = permitions,
                                    _b)
                            },
                            order: [
                                ['uName', 'ASC']
                            ]
                        })];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    /**
     * Пользователя по токену
     * @param {uToken:''} params
     */
    UserModel.prototype.getUserByToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var res, now, tokenExpire, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOne({
                                // include: [this.app.subordinationService.subordinationModel],
                                // attributes: ['id', 'uName', 'uLogin', 'uPassword', 'permitionId', 'tokenExpare', 'email', 'departId'],
                                where: {
                                    user_token: token,
                                    active: 1
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, { success: false, message: 'Пользователь не найден', user: undefined }];
                        }
                        now = new Date().getTime();
                        tokenExpire = res.tokenExpare ? res.tokenExpare : 0;
                        if (tokenExpire < now) {
                            return [2 /*return*/, { success: false, message: 'Время жизни токена истекло', user: undefined }];
                        }
                        return [2 /*return*/, { success: false, message: 'Всё плохо!', user: res }];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, { success: false, message: err_4, user: undefined }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.model.findOne({
                                attributes: ['id', 'uName', 'uLogin', 'uPassword', 'permitionId', 'tokenExpare', 'email', 'departId'],
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = null;
                        _b.label = 3;
                    case 3: return [2 /*return*/, _a];
                }
            });
        });
    };
    UserModel.prototype.hashGenerator = function (psw, login, slt) {
        if (login === void 0) { login = 'a'; }
        if (slt === void 0) { slt = 'bbb'; }
        try {
            return psw ? [login, psw, slt].join('').sha512() : undefined;
        }
        catch (e) {
            console.log('Ошибка.hasGenerator: ' + e);
        }
    };
    return UserModel;
}(AbstractModel_1.AbstractModel));
exports.UserModel = UserModel;
