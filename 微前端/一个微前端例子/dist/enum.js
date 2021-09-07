"use strict";
/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:05:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 15:38:22
 * @Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStatus = void 0;
var AppStatus;
(function (AppStatus) {
    AppStatus["NOT_LOADED"] = "NOT_LOADED";
    AppStatus["LOADED"] = "LOADED";
    AppStatus["LOADING"] = "LOADING";
    AppStatus["BOOTSTRAPPING"] = "BOOTSTRAPPING";
    AppStatus["NOT_MOUNTED"] = "NOT_MOUNTED";
    AppStatus["MOUNTING"] = "MOUNTING";
    AppStatus["MOUNTED"] = "MOUNTED";
    AppStatus["UNMOUNTING"] = "UNMOUNTING";
})(AppStatus = exports.AppStatus || (exports.AppStatus = {}));
