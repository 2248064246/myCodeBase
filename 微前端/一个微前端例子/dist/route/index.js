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
exports.cleanCapturedListeners = exports.callCapturedListeners = exports.hijackRoute = exports.reroute = void 0;
var lifeCycle_1 = require("../lifeCycle");
var utils_1 = require("../utils");
var capturedListeners = {
    hashchange: [],
    popstate: [],
};
// 劫持和 history 和 hash 相关的事件和函数
// 然后我们在劫持的方法里做一些自己的事情
// 比如说在 URL 发生改变的时候判断当前是否切换了子应用
var originalPush = window.history.pushState;
var originalReplace = window.history.replaceState;
var historyEvent = null;
var lastUrl = null;
var reroute = function (url) {
    if (url !== lastUrl) {
        var _a = utils_1.getAppListStatus(), actives = _a.actives, unmounts = _a.unmounts;
        Promise.all(unmounts
            .map(function (app) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, lifeCycle_1.runUnmounted(app)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })
            .concat(actives.map(function (app) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, lifeCycle_1.runBeforeLoad(app)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, lifeCycle_1.runBoostrap(app)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, lifeCycle_1.runMounted(app)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }))).then(function () {
            callCapturedListeners();
        });
    }
    lastUrl = url || location.href;
};
exports.reroute = reroute;
var handleUrlChange = function () {
    exports.reroute(location.href);
};
var hijackRoute = function () {
    window.history.pushState = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        originalPush.apply(window.history, args);
        historyEvent = new PopStateEvent('popstate');
        args[2] && exports.reroute(args[2]);
    };
    window.history.replaceState = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        originalReplace.apply(window.history, args);
        historyEvent = new PopStateEvent('popstate');
        args[2] && exports.reroute(args[2]);
    };
    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener = hijackEventListener(window.addEventListener);
    window.removeEventListener = hijackEventListener(window.removeEventListener);
};
exports.hijackRoute = hijackRoute;
var hasListeners = function (name, fn) {
    return capturedListeners[name].filter(function (listener) { return listener === fn; }).length;
};
var hijackEventListener = function (func) {
    return function (name, fn) {
        if (name === 'hashchange' || name === 'popstate') {
            if (!hasListeners(name, fn)) {
                capturedListeners[name].push(fn);
                return;
            }
            else {
                capturedListeners[name] = capturedListeners[name].filter(function (listener) { return listener !== fn; });
            }
        }
        return func.apply(window, arguments);
    };
};
function callCapturedListeners() {
    var _this = this;
    if (historyEvent) {
        Object.keys(capturedListeners).forEach(function (eventName) {
            var listeners = capturedListeners[eventName];
            if (listeners.length) {
                listeners.forEach(function (listener) {
                    // @ts-ignore
                    listener.call(_this, historyEvent);
                });
            }
        });
        historyEvent = null;
    }
}
exports.callCapturedListeners = callCapturedListeners;
function cleanCapturedListeners() {
    capturedListeners['hashchange'] = [];
    capturedListeners['popstate'] = [];
}
exports.cleanCapturedListeners = cleanCapturedListeners;
