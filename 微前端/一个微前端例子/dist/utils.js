"use strict";
/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:28:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 15:44:00
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
exports.prefetch = exports.getCompletionBaseURL = exports.getCompletionURL = exports.fetchResource = exports.getAppListStatus = void 0;
var path_to_regexp_1 = require("path-to-regexp"); // 用于匹配路由的库
var appList_1 = require("./appList");
var enum_1 = require("./enum");
var import_html_entry_1 = require("import-html-entry"); // 用于抽离css, js
var cache_1 = require("./cache");
var getAppListStatus = function () {
    var actives = [];
    var unmounts = [];
    var list = appList_1.getAppList();
    list.forEach(function (app) {
        var isActive = path_to_regexp_1.match(app.activeRule, { end: false })(location.pathname);
        switch (app.status) {
            case enum_1.AppStatus.NOT_LOADED:
            case enum_1.AppStatus.LOADING:
            case enum_1.AppStatus.LOADED:
            case enum_1.AppStatus.BOOTSTRAPPING:
            case enum_1.AppStatus.NOT_MOUNTED:
                isActive && actives.push(app);
                break;
            case enum_1.AppStatus.MOUNTED:
                !isActive && unmounts.push(app);
                break;
        }
    });
    return { actives: actives, unmounts: unmounts };
};
exports.getAppListStatus = getAppListStatus;
var fetchResource = function (url, appName) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (cache_1.getCache(appName, url))
                    return [2 /*return*/, cache_1.getCache(appName, url)];
                return [4 /*yield*/, fetch(url).then(function (res) { return res.text(); })];
            case 1:
                data = _a.sent();
                cache_1.setCache(appName, url, data);
                return [2 /*return*/, data];
        }
    });
}); };
exports.fetchResource = fetchResource;
function getCompletionURL(src, baseURI) {
    if (!src)
        return src;
    if (/^(https|http)/.test(src))
        return src;
    return new URL(src, getCompletionBaseURL(baseURI)).toString();
}
exports.getCompletionURL = getCompletionURL;
function getCompletionBaseURL(url) {
    return url.startsWith('//') ? "" + location.protocol + url : url;
}
exports.getCompletionBaseURL = getCompletionBaseURL;
var prefetch = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // 使用了这个, 上面的手写的请求就不需要了
        requestIdleCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, getExternalScripts, getExternalStyleSheets;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, import_html_entry_1.importEntry(app.entry)];
                    case 1:
                        _a = _b.sent(), getExternalScripts = _a.getExternalScripts, getExternalStyleSheets = _a.getExternalStyleSheets;
                        requestIdleCallback(getExternalStyleSheets); // 请求样式表
                        requestIdleCallback(getExternalScripts); // 请求js
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.prefetch = prefetch;
