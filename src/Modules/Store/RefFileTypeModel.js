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
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var AbstractModel_1 = require("../../Base/Services/AbstractModel");
var RefFileTypeModel = /** @class */ (function (_super) {
    __extends(RefFileTypeModel, _super);
    function RefFileTypeModel(app) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
        _this.model = app.dbService.sequelize.define('ref_file_types', {
            id: {
                type: sequelize_1["default"].INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            fileType: {
                type: sequelize_1["default"].STRING(100),
                field: 'file_type',
                allowNull: false
            },
            directive: {
                type: sequelize_1["default"].STRING(255),
                field: 'directive',
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
        }, { tableName: 'ref_file_types', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true });
        return _this;
        // this.model.hasMany(this.app.fileModel.model, { foreignKey: 'fileTypeId' })
    }
    return RefFileTypeModel;
}(AbstractModel_1.AbstractModel));
exports.RefFileTypeModel = RefFileTypeModel;
