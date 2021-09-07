"use strict";
/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:32:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 15:34:50
 * @Description:
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCache = exports.setCache = void 0;
var cache = {};
var setCache = function (key, url, value) {
    var _a;
    cache[key] = __assign(__assign({}, cache[key]), (_a = {}, _a[url] = value, _a));
};
exports.setCache = setCache;
var getCache = function (key, url) {
    if (cache[key]) {
        return cache[key][url];
    }
};
exports.getCache = getCache;
