"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.registerMicroApps = void 0;
/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:44:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 15:55:14
 * @Description:
 */
var appList_1 = require("./appList");
var lifeCycle_1 = require("./lifeCycle");
var route_1 = require("./route");
var enum_1 = require("./enum");
var utils_1 = require("./utils");
var registerMicroApps = function (appList, lifeCycle) {
    appList_1.setAppList(appList);
    lifeCycle && lifeCycle_1.setLifeCycle(lifeCycle);
};
exports.registerMicroApps = registerMicroApps;
var start = function () {
    var list = appList_1.getAppList();
    if (!list.length) {
        throw new Error('请先注册应用');
    }
    route_1.hijackRoute();
    route_1.reroute(window.location.href);
    list.forEach(function (app) {
        if (app.status === enum_1.AppStatus.NOT_LOADED) {
            utils_1.prefetch(app);
        }
    });
};
exports.start = start;
