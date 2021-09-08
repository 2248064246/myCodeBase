"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.registerMicroApps = void 0;
/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:44:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 10:12:17
 * @Description:
 */
var appList_1 = require("./appList");
var lifeCycle_1 = require("./lifeCycle");
var route_1 = require("./route");
var enum_1 = require("./enum");
var utils_1 = require("./utils");
var registerMicroApps = function (// 注册微应用, 还能设置它的声明周期
// 可以设置应用的beforeLoad, mounted, unmounted 这三个声明周期方法
// 同时在appList 里面可以设置应用的 mount, unmount, bootstrap 等方法
// 好像不行, 里面规定了 appList 的类型是 IAppInfo, 无法设置那三个方法
appList, lifeCycle) {
    appList_1.setAppList(appList); // 此时app是 NOT_LOADED
    lifeCycle && lifeCycle_1.setLifeCycle(lifeCycle); // 如果存在声明周期, 则设置
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
