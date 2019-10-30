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
var AbstractService_1 = require("../../Base/Services/AbstractService");
var StoreService = /** @class */ (function (_super) {
    __extends(StoreService, _super);
    function StoreService(app) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
        return _this;
    }
    StoreService.prototype.getStorePoints = function (parentId) {
        return this.app.storePointsModel.getStorePointChild(parentId);
    };
    StoreService.prototype.getStorePointFiles = function (parentId) {
        return this.app.crossStoreSelectorModel.getFilesFromPoint(parentId);
    };
    StoreService.prototype.getFile = function (id) {
        return this.app.fileModel.getFileAttr(id);
        // return this.app.fileModel.getOne(id,[0])
    };
    StoreService.prototype.getFileTypes = function (deleted) {
        return this.app.refFileTypeModel.getAll(deleted);
    };
    return StoreService;
}(AbstractService_1.AbstractService));
exports.StoreService = StoreService;
