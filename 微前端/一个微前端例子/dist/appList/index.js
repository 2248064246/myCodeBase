"use strict";
/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:15:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 10:11:57
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppList = exports.setAppList = void 0;
var enum_1 = require("../enum");
var appList = [];
var setAppList = function (list) {
    appList = list;
    appList.map(function (app) {
        // 上面 IAppInfo 是为了限制传入
        // 这里通过 as 语法, 给app信息加上状态
        app.status = enum_1.AppStatus.NOT_LOADED;
    });
};
exports.setAppList = setAppList;
var getAppList = function () {
    return appList;
};
exports.getAppList = getAppList;
