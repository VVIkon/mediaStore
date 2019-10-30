"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var Router = /** @class */ (function () {
    function Router(app) {
        this.app = app;
        this.routes(app.http, app);
    }
    Router.prototype.routes = function (http, app) {
        // app.http.get('/', (req, res) => {res.send(__dirname) })
        // app.http.get('/', (req, res) => {res.send(fs.readFileSync('../../front/dist/index.html').toString()) })
        app.http.get('/', function (req, res) { res.send(fs_1["default"].readFileSync('index.html').toString()); });
        http.post('/api/store-point', function (req, res) { return app.storeController.getStorePoint(req, res); });
        http.post('/api/store-point-files', function (req, res) { return app.storeController.getStorePointFiles(req, res); });
        http.post('/api/file', function (req, res) { return app.storeController.getFile(req, res); });
        http.post('/api/file-types', function (req, res) { return app.storeController.getFileTypes(req, res); });
        http.post('/api/users-all', function (req, res) { return app.userController.getUsers(req, res); });
        http.post('/api/users-all-attr', function (req, res) { return app.userController.getUsersAttr(req, res); });
        http.post('/api/departments', function (req, res) { return app.userController.getDepartments(req, res); });
        http.post('/api/permissions', function (req, res) { return app.userController.getPermissions(req, res); });
    };
    return Router;
}());
exports.Router = Router;
