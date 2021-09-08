"use strict";
/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:21:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 11:13:55
 * @Description:
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runUnmounted = exports.runMounted = exports.runBoostrap = exports.runBeforeLoad = exports.getLifeCycle = exports.setLifeCycle = void 0;
var enum_1 = require("../enum");
var loader_1 = require("../loader");
var lifeCycle = {};
var setLifeCycle = function (list) {
    lifeCycle = list;
};
exports.setLifeCycle = setLifeCycle;
var getLifeCycle = function () {
    return lifeCycle;
};
exports.getLifeCycle = getLifeCycle;
var runBeforeLoad = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app.status = enum_1.AppStatus.LOADING;
                return [4 /*yield*/, runLifeCycle('beforeLoad', app)];
            case 1:
                _a.sent();
                return [4 /*yield*/, loader_1.loadHTML(app)];
            case 2:
                app = _a.sent();
                app.status = enum_1.AppStatus.LOADED;
                return [2 /*return*/];
        }
    });
}); };
exports.runBeforeLoad = runBeforeLoad;
var runBoostrap = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (app.status !== enum_1.AppStatus.LOADED) {
                    return [2 /*return*/, app];
                }
                app.status = enum_1.AppStatus.BOOTSTRAPPING;
                return [4 /*yield*/, ((_a = app.bootstrap) === null || _a === void 0 ? void 0 : _a.call(app, app))];
            case 1:
                _b.sent();
                app.status = enum_1.AppStatus.NOT_MOUNTED;
                return [2 /*return*/];
        }
    });
}); };
exports.runBoostrap = runBoostrap;
var runMounted = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                app.status = enum_1.AppStatus.MOUNTING;
                return [4 /*yield*/, ((_a = app.mount) === null || _a === void 0 ? void 0 : _a.call(app, app))];
            case 1:
                _b.sent();
                app.status = enum_1.AppStatus.MOUNTED;
                return [4 /*yield*/, runLifeCycle('mounted', app)];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.runMounted = runMounted;
var runUnmounted = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                app.status = enum_1.AppStatus.UNMOUNTING;
                console.log('取消挂载', app);
                app.proxy.inactive(); // 将此app沙箱设置为失活
                return [4 /*yield*/, ((_a = app.unmount) === null || _a === void 0 ? void 0 : _a.call(app, app))];
            case 1:
                _b.sent(); // 等待app自身的 unmount 方法卸载app
                app.status = enum_1.AppStatus.NOT_MOUNTED;
                return [4 /*yield*/, runLifeCycle('unmounted', app)];
            case 2:
                _b.sent(); // 运行声明周期
                return [2 /*return*/];
        }
    });
}); };
exports.runUnmounted = runUnmounted;
var runLifeCycle = function (name, app) { return __awaiter(void 0, void 0, void 0, function () {
    var fn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fn = lifeCycle[name];
                if (!(fn instanceof Array)) return [3 /*break*/, 2];
                return [4 /*yield*/, Promise.all(fn.map(function (item) { return item(app); }))];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, (fn === null || fn === void 0 ? void 0 : fn(app))];
            case 3:
                _a.sent(); // 函数也可以这么用啊...
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
