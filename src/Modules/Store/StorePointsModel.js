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
var StorePointsModel = /** @class */ (function (_super) {
    __extends(StorePointsModel, _super);
    function StorePointsModel(app) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
        _this.model = app.dbService.sequelize.define('store_points', {
            id: {
                type: sequelize_1["default"].INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            parentId: {
                type: sequelize_1["default"].INTEGER(),
                field: 'parent_id',
                allowNull: false,
                references: { model: 'store_points', key: 'id' }
            },
            pointName: {
                type: sequelize_1["default"].STRING(255),
                field: 'point_name',
                allowNull: false
            },
            departmentId: {
                type: sequelize_1["default"].INTEGER(),
                field: 'department_id',
                allowNull: false,
                references: { model: 'department', key: 'id' }
            },
            permissionGroupSet: {
                type: sequelize_1["default"].STRING(255),
                field: 'permission_group_set',
                allowNull: false
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
        }, { tableName: 'store_points', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true });
        return _this;
        // this.model.hasMany(this.app.crossStoreSelectorModel.model, { foreignKey: 'storePointId' })
    }
    /** ---------------------------------GET/SET--------------------------------------- */
    StorePointsModel.prototype.getStorePointChild = function (parentId, deleted) {
        if (deleted === void 0) { deleted = [0]; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.model.findAll({
                            where: {
                                parentId: (_a = {}, _a[sequelize_1["default"].Op.eq] = parentId, _a),
                                deletedAt: (_b = {}, _b[sequelize_1["default"].Op["in"]] = deleted, _b)
                            },
                            order: [
                                ['id', 'ASC']
                            ]
                        })];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    return StorePointsModel;
}(AbstractModel_1.AbstractModel));
exports.StorePointsModel = StorePointsModel;
