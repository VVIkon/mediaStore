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
var FileModel = /** @class */ (function (_super) {
    __extends(FileModel, _super);
    function FileModel(app) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
        _this.model = app.dbService.sequelize.define('files', {
            id: {
                type: sequelize_1["default"].INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            fileRef: {
                type: sequelize_1["default"].STRING(255),
                field: 'file_ref',
                allowNull: false
            },
            fileName: {
                type: sequelize_1["default"].STRING(255),
                field: 'file_name',
                allowNull: false
            },
            fileExt: {
                type: sequelize_1["default"].STRING(15),
                field: 'file_ext',
                allowNull: false
            },
            refFileTypeId: {
                type: sequelize_1["default"].INTEGER(),
                field: 'file_type_id',
                allowNull: false,
                references: { model: 'ref_file_types', key: 'id' }
            },
            fileSize: {
                type: sequelize_1["default"].INTEGER(),
                field: 'file_size',
                allowNull: false
            },
            tags: {
                type: sequelize_1["default"].STRING(255),
                field: 'tags',
                allowNull: false
            },
            refSet: {
                type: sequelize_1["default"].STRING(255),
                field: 'ref_set',
                allowNull: false
            },
            keyWords: {
                type: sequelize_1["default"].STRING(255),
                field: 'key_words',
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
        }, { tableName: 'files', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true });
        _this.model.belongsTo(_this.app.refFileTypeModel.model);
        return _this;
    }
    /** ---------------------------------GET/SET--------------------------------------- */
    FileModel.prototype.getFileAttr = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                return [2 /*return*/, this.model.findOne({
                        include: [this.app.refFileTypeModel.model],
                        where: {
                            id: (_a = {}, _a[sequelize_1["default"].Op.eq] = id, _a)
                        },
                        order: [
                            ['id', 'ASC']
                        ]
                    })];
            });
        });
    };
    return FileModel;
}(AbstractModel_1.AbstractModel));
exports.FileModel = FileModel;
