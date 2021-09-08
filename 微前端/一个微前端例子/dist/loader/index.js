"use strict";
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
exports.loadHTML = void 0;
var import_html_entry_1 = require("import-html-entry");
var sandbox_1 = require("./sandbox");
var loadHTML = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    var container, entry, _a, template, getExternalScripts, getExternalStyleSheets, dom, jsCode;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                container = app.container, entry = app.entry;
                return [4 /*yield*/, import_html_entry_1.importEntry(entry)];
            case 1:
                _a = _b.sent(), template = _a.template, getExternalScripts = _a.getExternalScripts, getExternalStyleSheets = _a.getExternalStyleSheets;
                dom = document.querySelector(container);
                if (!dom) {
                    throw new Error('容器不存在');
                }
                dom.innerHTML = template; // 此时的 template 是一个完整的html结构, 为什么到页面上 <!DOCTYPE html> <html> 这些结构没有了...
                return [4 /*yield*/, getExternalStyleSheets()];
            case 2:
                _b.sent();
                return [4 /*yield*/, getExternalScripts()];
            case 3:
                jsCode = _b.sent();
                jsCode.forEach(function (script) {
                    var lifeCycle = runJS(script, app); // 这里通过运行js, 找出导出的 unmount 方法
                    if (lifeCycle) {
                        app.bootstrap = lifeCycle.bootstrap;
                        app.mount = lifeCycle.mount;
                        app.unmount = lifeCycle.unmount;
                    }
                });
                return [2 /*return*/, app];
        }
    });
}); };
exports.loadHTML = loadHTML;
var runJS = function (value, app) {
    if (!app.proxy) {
        app.proxy = new sandbox_1.ProxySandbox();
        // @ts-ignore
        window.__CURRENT_PROXY__ = app.proxy.proxy;
    }
    app.proxy.active();
    // window[app.name] 会是 lifeCycle 类?
    var code = "\n    return (window => {\n      " + value + "\n      return window['" + app.name + "'] \n    })(window.__CURRENT_PROXY__)\n  ";
    return new Function(code)();
};
